import { useQuery } from "react-query";
import { QUERY_KEYS } from "../querys";
import { CustomError, InitResult, ServerResponse } from "../types";

const useInitData = (flash = false, id?: number) => {
  // NOTE: 인자로 받기 싫다면 jotai와 같은 스토어 state를 가져와 KEY 값으로 넣으면 됨.

  const queryResult = useQuery<ServerResponse, CustomError, InitResult>(
    [QUERY_KEYS.init, flash, id],
    () => fetch("http://localhost:3030").then((res) => res.json()),
    {
      select: (res) => {
        return res.text;
      },
      onSuccess: () => {
        console.log("Good!");
      },
      staleTime: flash ? 100 : 100000,
    }
  );

  return queryResult;
};

export default useInitData;
