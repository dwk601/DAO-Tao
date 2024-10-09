"use client";

import { Governors } from "./_components/Governors";
import { Organizations } from "./_components/Organizations";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useClient } from "wagmi";

function Tally() {
  const queryClient = new QueryClient();
  const client = useClient();
  return (
    <QueryClientProvider contextSharing={true} client={queryClient}>
      {client?.chain?.id && <Organizations chainId={client.chain.id} />}
      <Governors />
    </QueryClientProvider>
  );
}

export default Tally;
