// import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { CartProvider } from "../context/CartProvider";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider>
          <CartProvider>
            <Component {...pageProps} />
          </CartProvider>
        </ChakraProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}