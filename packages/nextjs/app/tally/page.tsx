"use client";

import { Governors } from "./_components/Governors";
import { Organizations } from "./_components/Organizations";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function Tally() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider contextSharing={true} client={queryClient}>
      <Organizations />
      <Governors />
    </QueryClientProvider>
  );
}

export default Tally;
