import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
    }
  }
`;

function useMe() {
  const hasToken = useReactiveVar(isLoggedInVar); //localStorage에 토큰이 있는지 여부만 체크
  const { data, error } = useQuery(ME_QUERY, {
    //실제 토큰을 던져서 유저 확인, localStorage에 없다면 스킵!
    skip: !hasToken,
  });

  // hook을 이용하여 컴포넌트가 마운트, 언마운트, 데이터가 업데이트 되었을 때 특정작업을 처리
  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);
  return { data };
}

export default useMe;
