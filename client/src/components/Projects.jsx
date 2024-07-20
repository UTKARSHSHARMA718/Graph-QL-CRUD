import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/client";
import ProjectRow from "./ProjectRow";

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  console.log({ loading, error, data });

  if (loading) {
    return <p>Loading....</p>;
  }

  if (error) {
    return <p>{error?.message}</p>;
  }

  return (
    <table className="table table-hover mt-3">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Status</th>
          <th>Client-ID</th>
        </tr>
      </thead>
      <tbody>
        {data?.projects?.map((project) => {
          return <ProjectRow {...{ project }} key={project?.name} />;
        })}
      </tbody>
    </table>
  );
}
