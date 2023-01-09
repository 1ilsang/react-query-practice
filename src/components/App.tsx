import { FunctionComponent, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Body from "./Body";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // useErrorBoundary: true,
      /**
       * suspense 옵션을 넣게 되면 react suspense 클래스로 loading,fetching을 위임하게 된다.
       */
      suspense: true,
      retry: false,
    },
  },
});

const App: FunctionComponent = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<h1>LOADING... SUSPENSE</h1>}>
        <Body />
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
