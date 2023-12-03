import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./NavBar";
import { CreateWorkout } from "./Workout/CreateWorkout";

export function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<CreateWorkout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
