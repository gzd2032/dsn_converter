//Component for the top navigation bar using React Router

import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MainApp from "./Main/MainApp";
import Settings from "./Settings/Settings";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Settings/LoginBtn";
import LogoutButton from "./Settings/LogoutBtn";

export default function NavBar() {
  const { isAuthenticated } = useAuth0();
  return (
    <Router>
      <div>
        <nav className="navBar">
          <div>
            <Link to="/">Home</Link>
          </div>
          {isAuthenticated ? (
            <>
              <div>
                <Link to="/settings">Settings</Link>
              </div>
              <div>
                <LogoutButton />
              </div>{" "}
            </>
          ) : (
            <div>
              <LoginButton />
            </div>
          )}
        </nav>
        <Switch>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/">
            <MainApp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
