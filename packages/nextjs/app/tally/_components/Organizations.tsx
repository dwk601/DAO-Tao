import { Organization } from "../../../autogen/schema";
import { useOrganizationsQuery } from "../../../hooks/generated";

// import { useReadContracts } from 'wagmi';

export const Organizations = ({ chainId }: { chainId: number }) => {
  // const chainIds = ["eip155:1"];

  // The generated hook below encapsulates react-query to return the query response data,
  // along with errors and important states like isLoading and isSuccess.
  // You can learn more about this here: https://react-query-v3.tanstack.com/guides/queries

  const { data, isLoading } = useOrganizationsQuery({
    input: {
      filters: {
        chainId: `eip155:${chainId}`,
      },
    },
    pagination: { limit: 8, offset: 0 },
    sort: { field: "TOTAL_PROPOSALS", order: "DESC" },
  });

  const organizations = data?.organizations?.nodes ?? [];

  // const { readContracts } = useReadContracts();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-lg font-bold">Loading...</div>
      </div>
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Mainnet ETH Organizations</h2>
      {organizations.length > 0 ? (
        <OrganizationsTable organizations={organizations} />
      ) : (
        <p className="text-center">No organizations found.</p>
      )}
    </div>
  );
};

const OrganizationsTable = ({ organizations }: { organizations: Organization[] }) => {
  return (
    <table className="styledTable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Voters</th>
          <th>Proposals</th>
        </tr>
      </thead>
      <tbody>
        {organizations.map((organization, index) => {
          return (
            <tr key={`organization-row-${index}`}>
              <td>{organization.name}</td>
              <td>
                {organization.tokenIds.map((tokenId, index) => {
                  return <span key={`token-id-${index}`}>{tokenId}</span>;
                })}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
