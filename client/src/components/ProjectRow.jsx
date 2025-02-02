import { FaRegTrashAlt } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECTS } from "../mutations.js/client";
import { GET_PROJECTS } from "../queries/client";

const ProjectRow = ({ project, onUpdate }) => {
  const [deleteProjects] = useMutation(DELETE_PROJECTS, {
    variables: {
      id: project?.id,
    },
    refetchQueries: [{ query: GET_PROJECTS }],
  });
  
  return (
    <tr>
      <td>{project?.name}</td>
      <td>{project?.description}</td>
      <td>{project?.status}</td>
      <td>{project?.client?.id || "--"}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deleteProjects}>
          <FaRegTrashAlt />
        </button>
      </td>
      <td>
        <button onClick={onUpdate}>Update</button>
      </td>
    </tr>
  );
};

export default ProjectRow;
