import ClientRow from "./ClientRow";
import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/client";

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) {
    return <p>Loading....</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-10">
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {data?.clients?.map((user) => {
              return (
                <ClientRow
                  client={user}
                  key={user?.id}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
}
