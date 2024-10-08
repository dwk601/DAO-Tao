import { Organization } from "../../../autogen/schema";
import { useOrganizationsQuery } from "../../../hooks/generated";

export const Organizations = () => {
  // const chainIds = ["eip155:1"];

  // The generated hook below encapsulates react-query to return the query response data,
  // along with errors and important states like isLoading and isSuccess.
  // You can learn more about this here: https://react-query-v3.tanstack.com/guides/queries

  const { data, isLoading } = useOrganizationsQuery({
    input: {
      filters: {
        chainId: "eip155:1",
      },
    },
    pagination: { limit: 8, offset: 0 },
    sort: { field: "TOTAL_PROPOSALS", order: "DESC" },
  });

  const { organizations } = (data as { organizations: { nodes: Organization[] } }) ?? [];

  if (isLoading)
    return (
      <div className="tableLoading">
        <b>loading...</b>
      </div>
    );

  return (
    <div className="governorList">
      <h2>Mainnet ETH Organizations</h2>
      {organizations?.nodes.length && <OrganizationsTable organizations={organizations.nodes}></OrganizationsTable>}
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
          const totalVoters = organization.delegatesCount;
          return (
            <tr key={`organization-row-${index}`}>
              <td>{organization.name}</td>
              <td>{totalVoters}</td>
              <td>{organization.metadata?.description}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
