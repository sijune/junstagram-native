import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

const TOKEN = "token";

export const logUserIn = async (token) => {
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async (token) => {
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar(null);
};

const httpLink = createHttpLink({
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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default client;
