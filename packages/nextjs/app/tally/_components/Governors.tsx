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
      <div className="tableLoading">
        <b>loading...</b>
      </div>
    );

  return (
    <div className="governorList">
      <h2>Mainnet ETH Governors</h2>
      {governors.length > 0 && <GovernorsTable governors={governors} />}
    </div>
  );
};

const GovernorsTable = ({ governors }: { governors: Governor[] }) => {
  return (
    <table className="styledTable">
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
  );
};
