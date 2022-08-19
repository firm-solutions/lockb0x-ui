import { Route, Routes, Navigate } from "react-router-dom";
// import MainRoutes from "./common/routes/main";
import Alert from "./components/alert";
import Layout from "./components/Layout";
import Missing from "./components/Missing";
import useAuth from "./hooks/useAuth";
import Dashboard from "./modules/Dashboard";
import Login from "./modules/Login";
import CreateParty from "./modules/Party/CreateParty";
import CreateProject from "./modules/Project/CreateProject";
import Registeration from "./modules/Registeration";
import RequireAuth from "./modules/RequireAuth";

const App = () => {
  return (
    <>
      <Alert />
      {/* <MainRoutes /> */}
      <Routes>
        <Route path="signup" element={<Registeration />} />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-party" element={<CreateParty />} />
            <Route path="/create-project" element={<CreateProject />} />
          </Route>
        </Route>
        <Route path={"/*"} element={<Navigate replace to={"/login"} />} />
      </Routes>
    </>


  );
};

export default App;
