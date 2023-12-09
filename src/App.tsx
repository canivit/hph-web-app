import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Signup } from "./User/Signup";
import { Provider } from "react-redux";
import { store } from "./Store/store";
import { Signout } from "./User/Signout";
import { CurrentUser } from "./User/CurrentUser";
import { Signin } from "./User/Signin";
import { CreateWorkout } from "./Workout/CreateWorkout";
import { Profile } from "./User/Profile";
import { EditProfile } from "./User/EditProfile";
import { EditWorkout } from "./Workout/EditWorkout";
import { Home } from "./Home";
import { Workouts } from "./Workout/Workouts";
import { DetailedWorkout } from "./Workout/DetailedWorkout";
import { DetailedProfile } from "./User/DetailedProfile";

export function App() {
  return (
    <BrowserRouter basename="/">
      <Provider store={store}>
        <CurrentUser>
          <NavBar />
          <div className="container mt-4 d-flex justify-content-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Signin" element={<Signin />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/Signout" element={<Signout />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Profile/:userId" element={<DetailedProfile />} />
              <Route path="/EditProfile" element={<EditProfile />} />
              <Route path="/CreateWorkout" element={<CreateWorkout />} />
              <Route path="/EditWorkout/:workoutId" element={<EditWorkout />} />
              <Route path="/Workouts" element={<Workouts />} />
              <Route
                path="/Workouts/:workoutId"
                element={<DetailedWorkout />}
              />
            </Routes>
          </div>
        </CurrentUser>
      </Provider>
    </BrowserRouter>
  );
}
