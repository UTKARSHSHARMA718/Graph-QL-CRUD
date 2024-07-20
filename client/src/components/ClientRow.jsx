import { FaRegTrashAlt } from "react-icons/fa";
import { DELETE_CLIENT } from "../mutations.js/client";
import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "../queries/client";

const ClientRow = ({ client }) => {
  console.log(client?.id)
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: {
      id: client.id,
    },
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  return (
    <tr>
      <td>{client?.name}</td>
      <td>{client?.email}</td>
      <td>{client?.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deleteClient}>
          <FaRegTrashAlt />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
