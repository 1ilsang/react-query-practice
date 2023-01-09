import { FunctionComponent, Suspense, useEffect, useState } from "react";
import Component1 from "./Component1";
import Component2 from "./Component2";
import FlashComponent from "./FlashComponent";
import useInitData from "../hooks/useInitData";
import { queryClient } from "./App";
import { QUERY_KEYS } from "../querys";
import List from "./List";

const Body: FunctionComponent = () => {
  const { data, isLoading, isFetching, error, refetch } = useInitData();

  const [flash, setFlash] = useState(false);
  const [flash2, setFlash2] = useState(false);
  const [flashId, setFlashId] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      /**
       * 기존에 [init, false]가 호출 되었으므로 isLoading은 호출되지 않는다.
       * invalid 이후 isFetching만 일어나는 것을 확인.
       */
      // queryClient.invalidateQueries([QUERY_KEYS.init, false]);
      /**
       * removeQueries를 사용하게 되면 기존 캐싱자체를 날리게 되므로 loading부터 시작된다.
       */
      // queryClient.removeQueries([QUERY_KEYS.init, false]);
      setFlash(true);
    }, 1000);
    setTimeout(() => {
      /**
       * Flash 일 경우 staleTime이 0이므로 flash2의 flash 컴포넌트가 렌더링 되면
       * 모든 flash 컴포넌트가 isFetching 상태가 됨을 알수 있다.
       * 미묘한 간격은 돔 렌더링 시간.
       */
      console.log("open flash2");
      setFlash2(true);
    }, 3000);
  }, []);

  if (error) return <h1>An error has occurred: {error.message}</h1>;

  return (
    <div>
      {/* refetch를 눌러도 loading이 되지 않음을 유의 */}
      <button onClick={() => refetch()}>Default InitData Refetch</button>
      <button onClick={() => setFlashId(2023)}>Flash2 Change flashId</button>
      <h1>{data}</h1>
      <Component1 />
      <Component1 />
      <Component2 />
      <Component2 />
      {isLoading && <h1>Loading...</h1>}
      {isFetching && <h1>Fetching...</h1>}

      {/* id가 같을 경우 동일한 쿼리를 사용함을 확인 */}
      {flash && (
        <Suspense fallback={<h1>Flash LOADING... SUSPENSE</h1>}>
          <FlashComponent id={1} />
        </Suspense>
      )}
      {/* id가 변경될 때 fetching이 아닌 loading을 사용함을 유의 */}
      {flash2 && (
        <Suspense fallback={<h1>Flash LOADING... SUSPENSE</h1>}>
          <FlashComponent id={flashId} />
        </Suspense>
      )}

      <Suspense fallback={<h1>LIST LOADING SUSPENSE</h1>}>
        <List />
      </Suspense>
    </div>
  );
};

export default Body;
