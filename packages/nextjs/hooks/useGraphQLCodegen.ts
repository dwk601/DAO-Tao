export const useGraphQLCodegen = <Data, Variables extends Record<string, unknown>>(
  query: string,
): ((variables?: Variables) => Promise<Data>) => {
  return (variables?: Variables) =>
    // @ts-expect-error
    fetch(process.env.NEXT_PUBLIC_TALLY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": process.env.NEXT_PUBLIC_TALLY_API_KEY,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json?.errors) {
          console.error("error when fetching");

          return null;
        }

        return json.data;
      })
      .catch(error => {
        console.log("Error when fetching =>", error);

        return null;
      });
};
