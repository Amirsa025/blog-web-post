import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from "../app/component/Header/Header";
import 'remixicon/fonts/remixicon.css'

import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

export default function App({ Component, pageProps }: AppProps) {

    const queryClient = new QueryClient()
  return (
      <>
          <QueryClientProvider client={queryClient}>
              {/* The rest of your application */}
                  <Header />
                  <Component {...pageProps} />
              <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
      </>
  );
}
