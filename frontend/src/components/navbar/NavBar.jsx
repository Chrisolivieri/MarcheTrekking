import React from "react";
import "./NavBar.css";
import { Container, Image } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import MyProfile from "../user/MyProfile";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <Container fluid className="navBar">
        <DropdownButton title={<Image src="https://picsum.photos/200/300" />}>
          <Dropdown.Item className="menu">
            <Link
              to="/me"
              className="menu-item"
              
            >
              <div className="menu-item">
                <i className="bi bi-person"></i>
                <p>Il mio profilo</p>
              </div>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item href="#/action-2">
            <div className="menu-item">
              <i className="bi bi-gear"></i>
              <p>Account</p>
            </div>
          </Dropdown.Item>
          <Dropdown.Item href="#/action-3">
            <hr />
            <div className="menu-item">
              <i className="bi bi-box"></i>
              <p>Products</p>
            </div>
          </Dropdown.Item>
          <Dropdown.Item href="#/action-4">
            <div className="menu-item">
              <i className="bi bi-box-arrow-right"></i>
              <p>Logout</p>
            </div>
          </Dropdown.Item>
        </DropdownButton>
      </Container>

      {/* <div className="menu-dialog" id="menu">
        <div className="menu">
          <div className="menu-item">
            <i className="bi bi-person"></i>
            <p>Il mio profilo</p>
          </div>
          <div className="menu-item">
            <i className="bi bi-gear"></i>
            <p>Account</p>
          </div>
          <hr />
          <div className="menu-item">
            <i className="bi bi-box"></i>
            <p>Products</p>
          </div>
          <div className="menu-item">
            <i className="bi bi-box-arrow-right"></i>
            <p>Logout</p>
          </div>
          <hr />
        </div>
      </div> */}
    </>
  );
};

export default Navbar;
