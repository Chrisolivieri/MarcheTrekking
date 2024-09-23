import React from "react";
import Navbar from "./components/navbar/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/home/welcome/Welcome";
import MyProfile from "./components/user/MyProfile";
import AllTrekkingRoutes from "./components/trekkingRoutes/allTrekkingRoutes/AllTrekkingRoutes";
import UserContextProvider from "./context/UserContextProvider";
import RegisterLogin from "./components/authentication/RegisterLogin";
import RouteDetails from "./components/trekkingRoutes/allTrekkingRoutes/routeDetails/routeDetails";
import Footer from "./components/footer/Footer";
import "./App.css"

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/me" element={<MyProfile />} />
          <Route path="/trekkingRoutes" element={<AllTrekkingRoutes />} />
          <Route path ="/registerLogin" element= {<RegisterLogin />} />
          <Route path ="/trekkingRoutes/:id" element= {<RouteDetails />} />
        </Routes>
        <Footer />
      </Router>
    </UserContextProvider>
  );
}

export default App;
