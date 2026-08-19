import { Route, Routes } from "react-router-dom";
import ExibirReservas from "../pages/listar-reservas/ExibirReservas";
import CriarReservas from "../pages/criar-reservas/CriarReservas";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ExibirReservas />}></Route>
        <Route path="/nova-reserva" element={<CriarReservas />}></Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
