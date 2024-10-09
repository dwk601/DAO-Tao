import { Organization } from "../../../autogen/schema";
import { useOrganizationsQuery } from "../../../hooks/generated";

export const Organizations = () => {
  const { data, isLoading } = useOrganizationsQuery({
    input: {
      filters: {
        chainId: `eip155:1`,
      },
    },
    pagination: { limit: 8, offset: 0 },
    sort: { field: "TOTAL_PROPOSALS", order: "DESC" },
  });

  const organizations = data?.organizations?.nodes ?? [];

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
