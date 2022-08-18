import {AuthenticatedApp} from "authenticated-app";
import {ErrorBoundary} from "components/error-boundary";
import {FullPageErrorFallback} from "components/lib";
import {useAuth} from "context/auth-context";
import React from "react";
import {UnauthenticatedApp} from "unauthenticated-app";
import {BrowserRouter as Router} from 'react-router-dom';
import "./App.css";

function App() {
  const {user} = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {/* <ProjectListScreen /> */}
        <Router>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </Router>
      </ErrorBoundary>
    </div>
  );
}

export default App;
