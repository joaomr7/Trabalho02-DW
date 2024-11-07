import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import logo from "./assets/logo.svg";

import { Route, Routes, NavLink, BrowserRouter } from "react-router-dom";

import Payments from "./components/payments";
import Players from "./components/players";

function App() {
  return (
    <div className="gradient-background">
      <BrowserRouter>
        <div className="mx-4">
          <nav className="navbar navbar-expand-lg bg-transparent">
            <div className="container-fluid mx-auto">
              <NavLink to={"/"} className="navbar-brand text-white">
                <img
                  src={logo}
                  alt="FootPay Logo"
                  width="32"
                  height="32"
                  className="d-inline-block align-bottom"
                />
                <span className="brand-name ms-2">FootPay</span>
              </NavLink>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item me-2">
                  <NavLink
                    to={"/"}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    pagamentos
                  </NavLink>
                </li>
                <li className="nav-item me-2">
                  <span className="nav-link active">|</span>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={"/jogadores"}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    jogadores
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
          <div className="container-fluid mx-auto mt-4">
            <Routes>
              <Route element={<Payments />} path="/" />
              <Route element={<Players />} path="/jogadores" />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
