import { Route, Routes } from "react-router-dom";
// import MainRoutes from "./common/routes/main";
import Alert from "./components/alert";
import Layout from "./components/Layout";
import Missing from "./components/Missing";
import Dashboard from "./modules/Dashboard";
import Login from "./modules/Login";
import Registeration from "./modules/Registeration";
import RequireAuth from "./modules/RequireAuth";

const App = () => {
  return (
    <>
      <Alert />
      {/* <MainRoutes /> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="signup" element={<Registeration />} />
          <Route path="login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Route>
        {/* <Route path="*" element={<Login />} /> */}
      </Routes>
    </>


  );
};

export default App;
