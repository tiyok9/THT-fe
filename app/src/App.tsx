import "./App.css";
import { useState } from "react";
import { AuthProvider } from "./context/Auth";
import Route from "./route/RouteContainer";
import QueryProvider from "./reactquery/QueryProvider";

function App() {
  const [loading, isLoading] = useState<boolean>(true);
  const [isSignedIn, setisSignedIn] = useState<boolean>(true);
  const [user, setUser] = useState();

  return (
    <AuthProvider
      children={<QueryProvider chidlren={<Route />} />}
      isLoading={isLoading}
      loading={loading}
      setUser={setUser}
      isSignedIn={isSignedIn}
      user={user}
      setisSignedIn={setisSignedIn}
    />
  );
}

export default App;
