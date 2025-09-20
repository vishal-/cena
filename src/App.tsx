import { Route, HashRouter, Routes, Navigate } from "react-router-dom";
import Week from "./pages/week";
import { AppPath } from "./lib/app.config";
import SignInSignUp from "./pages/auth";

import UserProvider from "./contexts/UserProvider";
import FindDishes from "./pages/findDishes";
import DishById from "./pages/dishById";
import AddDish from "./pages/addDish";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <UserProvider>
      <HashRouter>
        <Routes>
          <Route path={AppPath.AUTH} element={<SignInSignUp />} />
          <Route
            path={AppPath.ADD_DISH}
            element={
              <ProtectedRoute>
                <AddDish />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${AppPath.DISH_BY_ID}/:id`}
            element={
              <ProtectedRoute>
                <DishById />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppPath.DISHES}
            element={
              <ProtectedRoute>
                <FindDishes />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppPath.WEEK}
            element={
              <ProtectedRoute>
                <Week />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to={AppPath.WEEK} />} />
        </Routes>
      </HashRouter>
    </UserProvider>
  );
}

export default App;
