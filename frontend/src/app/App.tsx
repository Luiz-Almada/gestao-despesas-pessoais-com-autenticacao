import { useEffect, useState } from "react";
import TelaDespesas from "./TelaDespesas";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { IUser, getDespesasEndpoint, getUserEndpoint } from "./backend";
import { TelaLogin } from "./TelaLogin";
import { authContext } from "./authContext";

function App() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getDespesasEndpoint().then(
      () => setUser,
      () => setUser(null)
    );
  }, []);

  useEffect(() => {
    getUserEndpoint().then(setUser, onSignOut);
  }, []);

  function onSignOut() {
    setUser(null);
  }

  if (user) {
    return (
      <authContext.Provider value={{ user, onSignOut }}>
      <BrowserRouter>
        <Routes>
          <Route path="/despesas/:anoMes" element={<TelaDespesas />} />
          <Route path="/" element={<Navigate to="/despesas/2021-06" />} />
        </Routes>
      </BrowserRouter>
      </authContext.Provider>

    );
  } else {
    return <TelaLogin onSignIn={setUser} />;
  }
}

export default App;

