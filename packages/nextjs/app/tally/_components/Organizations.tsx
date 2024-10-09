import { Organization } from "../../../autogen/schema";
import { useOrganizationsQuery } from "../../../hooks/generated";

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

  const activeOrganizations: Organization[] = organizations.filter((org: Organization) => org.hasActiveProposals);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-lg font-bold">Loading...</div>
      </div>
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Mainnet ETH Organizations</h2>
      {activeOrganizations.length > 0 ? (
        <OrganizationsTable organizations={activeOrganizations} />
      ) : (
        <p className="text-center">No organizations with active proposals found.</p>
      )}
    </div>
  );
};

const OrganizationsTable = ({ organizations }: { organizations: Organization[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Website</th>
            <th>Voters</th>
            <th>Proposals</th>
            <th>Tokens</th>
            <th>Governors</th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((organization, index) => {
            const totalVoters = organization.delegatesCount;
            return (
              <tr key={`organization-row-${index}`}>
                <td>{organization.name}</td>
                <td>{totalVoters}</td>
                <td>{organization.proposalsCount}</td>
                <td>
                  {organization.tokenIds.map(tokenId => (
                    <div key={tokenId}>{tokenId}</div>
                  ))}
                </td>
                <td>
                  {organization.governorIds.map(governorId => (
                    <div key={governorId}>{governorId}</div>
                  ))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
