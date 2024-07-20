import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PROJECT } from "../mutations.js/client";
import { GET_PROJECTS } from "../queries/client";

function UpdateProjectModal({
  selectedProjectToUpdate,
  setSelectedProjectToUpdate,
}) {
  const handleClose = () => setSelectedProjectToUpdate(null);
  console.log({ selectedProjectToUpdate, setSelectedProjectToUpdate });

  const [name, setName] = useState(selectedProjectToUpdate?.name || "");
  const [description, setDescription] = useState(
    selectedProjectToUpdate?.description || ""
  );
  const [status, setStatus] = useState(selectedProjectToUpdate?.status || "");

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { name, description, status, id: selectedProjectToUpdate?.id },
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const onUpdateClientHandler = (event) => {
    event?.preventDefault();
    console.log({ name, description, status, id: selectedProjectToUpdate?.id });
    updateProject();
  };

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
  ];

  return (
    <>
      {!!selectedProjectToUpdate && (
        <div
          className="modal"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content p-4">
              <form onSubmit={onUpdateClientHandler}>
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
              <div className="modal-footer mt-4">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateProjectModal;
