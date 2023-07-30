import TelaDespesas from "./TelaDespesas";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/despesas/:anoMes" element={<TelaDespesas />} />
        <Route path="/" element={<Navigate to="/despesas/2021-06" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
