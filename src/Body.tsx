import { FunctionComponent } from "react";
import { useQuery } from "react-query";

interface ServerResponse {
  result: string;
}

interface CustomError {
  message: string;
}

type InitResult = string;

const Body: FunctionComponent = () => {
  const { isLoading, error, data } = useQuery<
    ServerResponse,
    CustomError,
    InitResult
  >(["init"], () => fetch("http://localhost:3030").then((res) => res.json()), {
    select: (res) => {
      return res.result;
    },
    onSuccess: () => {
      console.log("Good!");
    },
  });
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>An error has occurred: {error.message}</h1>;

  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
};

export default Body;
