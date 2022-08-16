import { AuthenticatedApp } from "authenticated-app";
import { useAuth } from "context/auth-context";
import React, { FC } from "react";
import { UnauthenticatedApp } from "unauthenticated-app";
import "./App.css";

const App: FC = () => {
  const { user } = useAuth();
  return (
    <div className="App">
      {/* <ProjectListScreen /> */}
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
};

export default App;
