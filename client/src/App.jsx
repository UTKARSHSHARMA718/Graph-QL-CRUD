import AddClient from "./components/AddClient";
import AddProjects from "./components/AddProjects";
import Clients from "./components/Clients";
import Header from "./components/Header";
import Projects from "./components/Projects";

function App() {
  return (
    <>
      <Header />
      <Clients />
      <Projects />
      <AddClient />
      <AddProjects />
    </>
  );
}

export default App;
