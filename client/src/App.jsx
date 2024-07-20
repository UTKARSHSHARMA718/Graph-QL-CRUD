import { useState } from "react";
import AddClient from "./components/AddClient";
import AddProjects from "./components/AddProjects";
import Clients from "./components/Clients";
import Header from "./components/Header";
import Projects from "./components/Projects";
import UpdateProjectModal from "./components/UpdateClientModal";

function App() {
  const [selectedProjectToUpdate, setSelectedProjectToUpdate] = useState(null);

  return (
    <>
      <Header />
      <Clients />
      <Projects setSelectedProjectToUpdate={setSelectedProjectToUpdate} />
      <AddClient />
      <AddProjects />
      {!!selectedProjectToUpdate && (
        <UpdateProjectModal
          {...{ selectedProjectToUpdate, setSelectedProjectToUpdate }}
        />
      )}
    </>
  );
}

export default App;
