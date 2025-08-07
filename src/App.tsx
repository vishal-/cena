import { Route, HashRouter, Routes, Navigate } from "react-router-dom";
import Week from "./pages/week";
import { AppPath } from "./lib/app.config";
import SignInSignUp from "./pages/auth";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={AppPath.AUTH} element={<SignInSignUp />} />
        <Route path={AppPath.WEEK} element={<Week />} />
        <Route path="/" element={<Navigate to={AppPath.WEEK} />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
