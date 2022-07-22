import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import Classes from "./pages/Classes";
import NavBar from "./components/NavBar";
import ClassRosters from "./pages/ClassRosters";

function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/students" element={<Students />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/class-rosters" element={<ClassRosters />} />
      </Routes>
    </div>
  );
}

export default App;
