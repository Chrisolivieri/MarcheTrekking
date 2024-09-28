import React, { useContext } from "react";
import NavBar from "./components/navbar/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/home/welcome/Welcome";
import MyProfile from "./components/user/MyProfile";
import AllTrekkingRoutes from "./components/trekkingRoutes/allTrekkingRoutes/AllTrekkingRoutes";
import RegisterLogin from "./components/authentication/RegisterLogin";
import RouteDetails from "./components/trekkingRoutes/allTrekkingRoutes/routeDetails/routeDetails";
import Footer from "./components/footer/Footer";
import NewTrekkingRoute from "./components/trekkingRoutes/newTrekkingRoute/NewTrekkingRoute";
import "./App.css";
import { UserContext } from "./context/UserContextProvider";

function App() {
  const { userInfo } = useContext(UserContext);
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/me" element={<MyProfile />} />
        <Route path="/trekkingRoutes" element={<AllTrekkingRoutes />} />
        <Route path="/registerLogin" element={<RegisterLogin />} />
        <Route path="/trekkingRoutes/:id" element={<RouteDetails />} />
        {userInfo?.role === "admin" && (
          <Route path="/newTrekkingRoute" element={<NewTrekkingRoute />} />
        )}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
