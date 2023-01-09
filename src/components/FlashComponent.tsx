import { FunctionComponent } from "react";
import useInitData from "../hooks/useInitData";

type FlashComponentProps = { id: number };

const FlashComponent: FunctionComponent<FlashComponentProps> = ({ id }) => {
  const { data, isLoading, isFetching, error, refetch } = useInitData(true, id);

  /**
   * isFetching은 비동기 함수가 호출되면 true가 된다.
   * isLoading은 캐싱된 데이터도 없는, 처음 실행된 쿼리일 때 true가 된다.
   */
  if (isLoading) return <h1>Flash Loading...</h1>;
  if (isFetching) return <h1>Flash Fetching...</h1>;
  if (error) return <h1>An error has occurred: {error.message}</h1>;

  return (
    <>
      <h1>
        OPEN FLASH {id}! {data}
      </h1>
      <button onClick={() => refetch()}>refetch</button>
    </>
  );
};

export default FlashComponent;
