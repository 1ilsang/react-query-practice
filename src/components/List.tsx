import { FunctionComponent } from "react";
import useList from "../hooks/useList";

const List: FunctionComponent = () => {
  const { queryResult, mutation } = useList();
  const { data, isLoading, isFetching } = queryResult;

  return (
    <>
      <h1>LIST</h1>
      <button onClick={() => mutation.mutate()}>Add list(mutation)</button>
      <div>isLoading: {isLoading ? "o" : "x"}</div>
      {/* Mutation loading은 suspense에 걸리지 않는다. */}
      <div>isMutationLoading: {mutation.isLoading ? "o" : "x"}</div>
      <div>isFetching: {isFetching ? "o" : "x"}</div>
      <ul>
        {data?.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default List;
