import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    makeVar,
    split,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import {
    getMainDefinition,
    offsetLimitPagination,
} from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "@apollo/client/link/ws";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

const TOKEN = "token";

export const logUserIn = async(token) => {
    await AsyncStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
    tokenVar(token);
};

export const logUserOut = async(token) => {
    await AsyncStorage.removeItem(TOKEN);
    isLoggedInVar(false);
    tokenVar(null);
};

const httpLink = createHttpLink({
    uri: "https://weak-vampirebat-52.loca.lt/graphql",
});

//createUploadLink를 사용해야 백엔드에서 받을 수 있는 파일로 전송 가능
const uploadHttpLink = createUploadLink({
    uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            token: tokenVar(),
        },
    };
});

//link를 이용해 에러를 잡아낼 수 있다.
const onErrorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        console.log(`GraphQL Error`, graphQLErrors);
    }
    if (networkError) {
        console.log(`Network Error`, networkError);
    }
});

//link를 이용해 에러를 잡아낼 수 있다.
const onErrorAllLink = onError((err) => {
    console.log(err);
});

//오프라인에서도 Feed조회를 위해 cache분리
export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                // seeFeed: {
                //     keyArgs: false,
                //        argument에 따라 cache에 독립적으로 저장
                //        state변화가 없다. component가 업데이트 안되므로 rerendering 불가
                //        cache에 argument에 따라 독립적으로 저장하는 것을 막는다.
                //        apollo가 query를 arg에 따라 구별하는 것을 막는다.
                //
                //     merge(existing = [], incoming = []) {
                //         //데이터 처리 방식 정의
                //         return [...existing, ...incoming];
                //     },
                // },

                seeFeed: offsetLimitPagination(), //더 빠르게 작성 가능
            },
        },
    },
});

// webSocket서버 설정
const wsLink = new WebSocketLink({
    uri: "ws://localhost:4000/graphql",
    options: {
        reconnect: true,
        // token을 한번이 아닌 계속 호출한다.
        connectionParams: () => ({
            //백엔드 onConnect()와 함께 인증에 사용
            token: tokenVar(),
        }),
    },
});

const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink);

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    httpLinks
);

const client = new ApolloClient({
    link: splitLink,
    cache,
});

export default client;