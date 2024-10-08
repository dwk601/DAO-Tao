import type { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname + "/.env.local" });

const config: CodegenConfig = {
  schema: [
    {
      "https://api.tally.xyz/query": {
        headers: {
          "Api-Key": `${process.env.NEXT_PUBLIC_TALLY_API_KEY}`,
        },
      },
    },
  ],
  documents: ["./codegenQuery/*.graphql"],
  generates: {
    "./autogen/schema.ts": {
      config: {
        skipTypename: true,
        errorType: "Error",
        scalars: {
          Long: "number",
          Bytes: "string",
          BigInt: "string",
          Address: "string",
          ChainID: "string",
          Bytes32: "string",
          Timestamp: "string",
          AssetID: "string",
          AccountID: "string",
        },
        fetcher: {
          func: "./useGraphQLCodegen#useGraphQLCodegen",
          isReactHook: true,
        },
      },
      plugins: ["typescript", "typescript-operations", "typescript-react-query"],
    },
  },
};

export default config;
