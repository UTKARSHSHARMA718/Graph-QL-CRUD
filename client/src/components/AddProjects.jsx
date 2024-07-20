import { useMutation } from "@apollo/client";
import { ADD_PROJECT } from "../mutations.js/client";
import { GET_PROJECTS } from "../queries/client";
import { useState } from "react";

const AddProjects = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [clientId, setCLientId] = useState("");

  const [addClient] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, client: clientId },
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const DATA_FIELDS = [
    {
      label: "Name",
      type: "text",
      onChange: (e) => setName(e?.target?.value),
      value: name,
    },
    {
      label: "Description",
      type: "text",
      onChange: (e) => setDescription(e?.target?.value),
      value: description,
    },
    {
      label: "Status",
      type: "text",
      onChange: (e) => setStatus(e?.target?.value),
      value: status,
    },
    {
      label: "Client-ID",
      type: "text",
      onChange: (e) => setCLientId(e?.target?.value),
      value: clientId,
    },
  ];

  const onAddClientHandler = (event) => {
    event?.preventDefault();
    addClient();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add Projects</h2>
      <form onSubmit={onAddClientHandler}>
        {DATA_FIELDS?.map((item) => {
          return (
            <div className="mb-3" key={item?.label}>
              <label htmlFor={item?.label} className="form-label">
                {item?.label}
              </label>
              <input
                type={item?.type}
                className="form-control"
                id={item?.label}
                value={item?.value}
                onChange={item?.onChange}
              />
            </div>
          );
        })}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProjects;
