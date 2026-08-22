"use client";



import * as React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { LocaleProvider } from "@/lib/i18n/locale-provider";



export function Providers({ children }: { children: React.ReactNode }) {

  const [client] = React.useState(

    () =>

      new QueryClient({

        defaultOptions: {

          queries: {

            staleTime: 5_000,

            refetchOnWindowFocus: false,

          },

        },

      }),

  );



  return (

    <QueryClientProvider client={client}>

      <LocaleProvider>{children}</LocaleProvider>

    </QueryClientProvider>

  );

}


