import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from "../app/component/Header/Header";
import 'remixicon/fonts/remixicon.css'

import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import {ReactElement, ReactNode} from "react";
import { NextPage } from 'next';
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page)
    const queryClient = new QueryClient()
  return (
      <>
          <QueryClientProvider client={queryClient}>
              {/* The rest of your application */}
                  <Header />
              {getLayout(<Component {...pageProps} />)}
              <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
      </>
  );
}
