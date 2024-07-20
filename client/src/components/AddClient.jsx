import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations.js/client";
import { useState } from "react";
import { GET_CLIENTS } from "../queries/client";

const AddClient = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  const DATA_FIELDS = [
    {
      label: "Name",
      type: "text",
      onChange: (e) => setName(e?.target?.value),
      value: name,
    },
    {
      label: "Email",
      type: "text",
      onChange: (e) => setEmail(e?.target?.value),
      value: email,
    },
    {
      label: "Phone",
      type: "text",
      onChange: (e) => setPhone(e?.target?.value),
      value: phone,
    },
  ];

  const onAddClientHandler = (event) => {
    event?.preventDefault();
    addClient();
  };

  return (
    <div className="container mt-4">
    <h2 className="mb-4">Add Client</h2>
    <form onSubmit={onAddClientHandler}>
      {DATA_FIELDS?.map((item) => {
        return (
          <div className="mb-3" key={item?.label}>
            <label htmlFor={item?.label} className="form-label">{item?.label}</label>
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
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
  );
};

export default AddClient;
