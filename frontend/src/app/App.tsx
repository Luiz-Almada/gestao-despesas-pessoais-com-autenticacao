import { useEffect, useState } from "react";
import TelaDespesas from "./TelaDespesas";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { IUser, getDespesasEndpoint } from "./backend";
import { TelaLogin } from "./TelaLogin";

function App() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getDespesasEndpoint().then(
      () => setUser,
      () => setUser(null)
    );
  }, []);

  if (user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/despesas/:anoMes" element={<TelaDespesas />} />
          <Route path="/" element={<Navigate to="/despesas/2021-06" />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return <TelaLogin onSignIn={setUser} />;
  }
}

export default App;
