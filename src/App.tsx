import { Route, HashRouter, Routes, Navigate } from "react-router-dom";
import Week from "./pages/week";
import { AppPath } from "./lib/app.config";
import SignInSignUp from "./pages/auth";
import MealTypes from "./pages/mealTypes";
import { UserProvider } from "./contexts/UserProvider";

function App() {
  return (
    <UserProvider>
      <HashRouter>
        <Routes>
          <Route path={AppPath.AUTH} element={<SignInSignUp />} />
          <Route path={AppPath.MEAL_TYPES} element={<MealTypes />} />
          <Route path={AppPath.WEEK} element={<Week />} />
          <Route path="/" element={<Navigate to={AppPath.WEEK} />} />
        </Routes>
      </HashRouter>
    </UserProvider>
  );
}

export default App;
