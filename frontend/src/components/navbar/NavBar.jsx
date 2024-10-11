import React, { useContext, useState } from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { GiMountainRoad } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { CiSquarePlus } from "react-icons/ci";
import { MdOutlineAccountCircle } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { IoLogIn } from "react-icons/io5";
const NavBar = () => {
  const { token, setToken } = useContext(UserContext);
  const [logOut, setLogOut] = useState(false);
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };

  const loginClick = () => {
    navigate("/login");
  };

  const createRouteClick = () => {
    navigate("/newTrekkingRoute");
  };

  const handleRoutesClick = () => {
    navigate("/trekkingRoutes");
  };

  const handleMyProfileClick = () => {
    navigate("/me");
  };
  const { userInfo } = useContext(UserContext);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setLogOut(true);
    navigate("/");
  };
  return (
    <>
      <Navbar className="containerNav" collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand onClick={handleHomeClick} style={{ cursor: "pointer" }}>
            <img className="logoNav" src="../assets/logo.png" alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link to="/" onClick={handleHomeClick}>
                <IoHome className="navIcons" />
                Home
              </Nav.Link>
              <Nav.Link onClick={handleRoutesClick}>
                <GiMountainRoad className="navIcons" />
                Sentieri
              </Nav.Link>
              {userInfo?.role === "admin" && token && (
                <Nav.Link onClick={createRouteClick}>
                  <CiSquarePlus className="navIcons" />
                  Crea un sentiero
                </Nav.Link>
              )}
              {token && userInfo && (
                <Nav.Link onClick={handleMyProfileClick}>
                  <MdOutlineAccountCircle className="navIcons" />
                  Profilo
                </Nav.Link>
              )}
            </Nav>
            <Nav>
              {token && userInfo && (
                <NavDropdown
                  title={
                    <img className="avatarNav" src={userInfo.avatar} alt="" />
                  }
                  id="collapsible-nav-dropdown"
                >
                  <NavDropdown.Item onClick={handleMyProfileClick}>
                    <MdOutlineAccountCircle className="navIcons" />
                    Il mio profilo
                  </NavDropdown.Item>
                  {userInfo?.role === "admin" && (
                    <NavDropdown.Item onClick={createRouteClick}>
                      <CiSquarePlus className="navIcons" />
                      Crea un nuovo sentiero
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <AiOutlineLogout className="navIcons" />
                    Esci
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {!token && <Nav.Link onClick={loginClick}><IoLogIn className="navIcons" /> Accedi</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
