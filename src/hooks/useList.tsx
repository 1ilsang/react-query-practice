import { useMutation, useQuery } from "react-query";
import { queryClient } from "../components/App";
import { QUERY_KEYS } from "../querys";
import { CustomError, ListResult, ServerListResponse } from "../types";

const useList = () => {
  const queryResult = useQuery<ServerListResponse, CustomError, ListResult>(
    [QUERY_KEYS.list],
    () =>
      fetch("http://localhost:3030/list").then((res) =>
        (res as Response).json()
      ),
    {
      select: (res) => res.list,
      /**
       * initialData는 기본 값으로 설정후 fetch 하지 않는 반면
       * placeholderData는 기본 값으로 노출후 fetch 후 값으로 "업데이트"한다.
       */
      // initialData: () => {
      //   return { text: "success", list: ["123"] };
      // },
      placeholderData: () => {
        return { text: "success", list: ["321"] };
      },
    }
  );

  const mutation = useMutation(
    [QUERY_KEYS.list],
    () => fetch("http://localhost:3030/add").then((res) => res.json()),
    {
      onSuccess: (data) => {
        // 1. invalid 이후 자연스럽게 useQuery를 다시 호출하도록 유도
        return queryClient.invalidateQueries([QUERY_KEYS.list]);
        // 2. setQueryData로 직접 캐싱 업데이트. *비추. 다시 호출하도록 하자.
        // return queryClient.setQueryData([QUERY_KEYS.list], data);
      },
    }
  );

  return { queryResult, mutation };
};

export default useList;
