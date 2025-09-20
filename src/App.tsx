import { Route, HashRouter, Routes, Navigate } from "react-router-dom";
import Week from "./pages/week";
import { AppPath } from "./lib/app.config";
import SignInSignUp from "./pages/auth";

import { UserProvider } from "./contexts/UserProvider";
import FindDishes from "./pages/findDishes";
import DishById from "./pages/dishById";
import AddDish from "./pages/addDish";

function App() {
  return (
    <UserProvider>
      <HashRouter>
        <Routes>
          <Route path={AppPath.AUTH} element={<SignInSignUp />} />
          <Route path={AppPath.ADD_DISH} element={<AddDish />} />
          <Route path={`${AppPath.DISH_BY_ID}/:id`} element={<DishById />} />
          <Route path={AppPath.DISHES} element={<FindDishes />} />

          <Route path={AppPath.WEEK} element={<Week />} />
          <Route path="/" element={<Navigate to={AppPath.WEEK} />} />
        </Routes>
      </HashRouter>
    </UserProvider>
  );
}

export default App;
