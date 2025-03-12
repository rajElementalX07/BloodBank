import React from "react";
import {
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Nav,
  Navbar,
} from "react-bootstrap";
import { FaUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { logout } from "../features/logoutSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  console.log("User : ", user?.role);
  console.log(userToken);

  const userIcon = (
    <span>
      <FaUser />
    </span>
  );

  const handleLogout = () => {
    console.log("dffffffffff");
    dispatch(logout());
    navigate("/auth/farmer-login");
  };
  return (
    <Navbar
      className="bg-body-transparent "
      style={{
        height: "60px",
        backdropFilter: "blur(20px)",
        background: "rgba( 255, 255, 255, 0.1 )",
        boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
      }}
    >
      <Container>
        <Navbar.Brand
          className="fw-bold fs-3"
          style={{ cursor: "pointer", color: "#FFD700" }}
          onClick={() => navigate("/")}
        >
          LifeLine
        </Navbar.Brand>
        <Nav>
          <Nav.Link onClick={() => navigate("/")} className="fw-bold fs-5">
            Home
          </Nav.Link>
          {/* <Nav.Link
            onClick={() => navigate("/pricing")}
            className="fw-bold fs-5"
          >
            Pricing
          </Nav.Link> */}
          {user?.role == "donor" ? (
            <Nav.Link
              onClick={() => navigate("/receivers")}
              className="fw-bold fs-5"
            >
              ReceiversList
            </Nav.Link>
          ) : (
            <></>
          )}
          {user?.role == "receiver" ? (
            <Nav.Link
              onClick={() => navigate("/receivers")}
              className="fw-bold fs-5"
            >
              DonorsList
            </Nav.Link>
          ) : (
            <></>
          )}
        </Nav>

        {userToken ? (
          <div>
            <DropdownButton
              variant="transparent"
              id="dashboard-dropdown"
              title={userIcon}
            >
              <Dropdown.ItemText className="fw-bold text-muted">
                {user?.firstname + " " + user?.lastname}
              </Dropdown.ItemText>
              <Dropdown.Item
                className="fw-bold "
                as="button"
                onClick={handleLogout}
              >
                Log Out
              </Dropdown.Item>
            </DropdownButton>
          </div>
        ) : (
          <Button
            variant="dark"
            onClick={() => navigate("/auth/farmer-login")}
            className="rounded-pill px-4 fw-bold"
            style={{ backgroundColor: "#FFD700", color: "black" }}
          >
            Login
          </Button>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;
