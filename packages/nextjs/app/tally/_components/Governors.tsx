import { Governor } from "../../../autogen/schema";
import { useGovernorsQuery } from "../../../hooks/generated";

export const Governors = () => {
  // The generated hook below encapsulates react-query to return the query response data,
  // along with errors and important states like isLoading and isSuccess.
  // You can learn more about this here: https://react-query-v3.tanstack.com/guides/queries

  const { data, isLoading } = useGovernorsQuery({
    input: {
      filters: {
        organizationId: 2207450143689540900,
      },
    },
    pagination: { limit: 8, offset: 0 },
    sort: { field: "TOTAL_PROPOSALS", order: "DESC" },
  });

  const governors = data?.governors?.nodes ?? [];

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-lg font-bold">Loading...</div>
      </div>
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Mainnet ETH Governors</h2>
      {governors.length > 0 ? (
        <GovernorsTable governors={governors} />
      ) : (
        <p className="text-center">No governors found.</p>
      )}
    </div>
  );
};

const GovernorsTable = ({ governors }: { governors: Governor[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Voters</th>
            <th>Proposals</th>
            <th>Token Owners</th>
            <th>Organization</th>
          </tr>
        </thead>
        <tbody>
          {governors.map((governor, index) => {
            const totalVoters = governor.delegatesCount;
            return (
              <tr key={`governor-row-${index}`}>
                <td>{governor.name}</td>
                <td>{totalVoters}</td>
                <td>{governor.proposalStats.total}</td>
                <td>{governor.tokenOwnersCount}</td>
                <td>{governor.organization.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
