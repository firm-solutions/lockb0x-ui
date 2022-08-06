import { Route, Routes } from "react-router-dom";
import Registeration from "../../modules/Registeration";
import Login from "../../modules/Login";
import Dashboard from "../../modules/Dashboard";
import RequireAuth from "../../modules/RequireAuth";
const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Registeration />} />
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
