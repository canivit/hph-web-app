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

export function App() {
  return (
    <BrowserRouter basename="/">
      <Provider store={store}>
        <CurrentUser>
          <NavBar />
          <div className="container mt-4 d-flex justify-content-center">
            <Routes>
              <Route path="/" element={<CreateWorkout />} />
              <Route path="/Signin" element={<Signin />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/Signout" element={<Signout />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/EditProfile" element={<EditProfile />} />
            </Routes>
          </div>
        </CurrentUser>
      </Provider>
    </BrowserRouter>
  );
}
