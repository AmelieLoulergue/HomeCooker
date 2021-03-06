import "./App.css";
import { useState } from "react";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import AuthContext from "./store/auth";
import Config from "./store/config";
import Things from "./components/thing/Things";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/user/Profile";
import Thing from "./components/thing/Thing";
import Navbar from "./components/layout/Navbar";
import WelcomePage from "./components/WelcomePage";
import CreateThingForm from "./components/thing/forms/CreateThingForm";
import PasswordResetForm from "./components/user/PasswordResetForm";
import ConfirmEmail from "./components/user/ConfirmEmail";
import WorkInProgress from "./components/WorkInProgress";
function App() {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("auth")) || {
      userId: null,
      token: null,
      email: null,
    }
  );
  const signOut = () => {
    localStorage.clear();
    setAuth({ userId: null, token: null, email: null });
  };
  return (
    <Config.Provider
      value={{ urlAPI: "https://home-cooker-back.herokuapp.com" }}
    >
      <AuthContext.Provider value={{ auth: auth, setAuth: setAuth }}>
        <Router>
          <div className="app">
            <Navbar signOut={signOut} auth={auth} />
            <Routes>
              <Route exact path="/" element={<WelcomePage />} />
              <Route
                exact
                path="/work-in-progress"
                element={<WorkInProgress />}
              />
              <Route
                exact
                path="/signin"
                element={<Login setAuth={setAuth} auth={auth} />}
              />
              <Route
                exact
                path="/signin/forgotPassword"
                element={<Login setAuth={setAuth} updateInfo={true} />}
              />
              <Route
                exact
                path="/signup"
                element={<SignUp setAuth={setAuth} auth={auth} />}
              />
              <Route
                exact
                path="/profile"
                element={
                  <Profile auth={auth} signOut={signOut} setAuth={setAuth} />
                }
              />
              <Route exact path="/things" element={<Things />} />
              <Route path="/things/:thingId" element={<Thing />} />
              <Route path="/things/createThing" element={<CreateThingForm />} />
              <Route
                path="/password-reset/:userId/:resetToken"
                element={<PasswordResetForm />}
              />
              <Route
                path="/confirm-email/:userId/:resetToken"
                element={<ConfirmEmail auth={auth} />}
              />
            </Routes>
          </div>
        </Router>
      </AuthContext.Provider>
    </Config.Provider>
  );
}

export default App;
