import { FunctionComponent } from "react";
import useInitData from "../hooks/useInitData";

const Component1: FunctionComponent = () => {
  const { data, isLoading, error } = useInitData();

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>An error has occurred: {error.message}</h1>;

  return (
    <div>
      <h1>Component1: {data}</h1>
    </div>
  );
};

export default Component1;
