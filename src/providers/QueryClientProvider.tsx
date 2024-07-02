// app/providers.jsx
"use client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ENV } from "@/constants/env";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {ENV.APP_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
