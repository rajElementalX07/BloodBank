import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import FromField from "./FormField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../features/loadingSlice";
import { getError } from "../utils/getError";
import api from "../utils/axios";
import { setUser } from "../features/userSlice";
import toast from "react-hot-toast";

function AuthCard() {
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // New state for Blood Bank specific fields
  const [userRole, setUserRole] = useState("donor"); // "donor" or "receiver"

  // Donor-specific fields
  const [bloodGroup, setBloodGroup] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [lastDonation, setLastDonation] = useState("");
  const [availability, setAvailability] = useState(false);
  const [medicalHistory, setMedicalHistory] = useState("");

  // Receiver-specific fields
  const [requiredBloodGroup, setRequiredBloodGroup] = useState("");
  const [urgency, setUrgency] = useState("");
  const [units, setUnits] = useState("");
  const [locationField, setLocationField] = useState("");
  const [requestDetails, setRequestDetails] = useState("");
  

  const location = useLocation();
  const isFarmerLogin = location.pathname.includes("farmer-login");
  const isFarmerReg = location.pathname.includes("farmer-reg");
  const { isLoading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bgStyle = {
    // background: "rgba( 255, 255, 255, 0.1 )",
    background: "#f8e579",
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    backdropFilter: "blur( 20px )",
    WebkitBackdropFilter: "blur( 20px )",
    borderRadius: "10px",
    minHeight: "500px",
    color:"#000"
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      dispatch(showLoading());
      const response = await api.post("/api/farmer-login", {
        email: email,
        password: password,
      });

      if (response?.status === 200) {
        const { user, token } = response?.data;
        const { firstname, lastname,role } = response?.data?.user;
        console.log(role)
        console.log(token);
        dispatch(setUser({ user, token }));
        toast.success(`Welcome Back ${firstname} ${lastname}`);
        if(role==='donor'){
          navigate("/receivers");
        }
        else{
          navigate("/donors");
        }
      }
      dispatch(hideLoading());

      console.log(response);
    } catch (error) {
      dispatch(hideLoading());
      getError(error);
    }
  };


  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      dispatch(showLoading());
      const response = await api.post("/api/farmer-register", {

        firstname: firstName,
        lastname: LastName,
        mobile:mobile,
        email: email,
        password: password,

        // Include the new fields for Blood Bank users
        role:userRole, // either "donor" or "receiver"
        // Donor fields (sent only if donor is selected)
        bloodGroup: userRole === "donor" ? bloodGroup : undefined,
        age: userRole === "donor" ? age : undefined,
        gender: userRole === "donor" ? gender : undefined,
        lastDonation: userRole === "donor" ? lastDonation : undefined,
        availability: userRole === "donor" ? availability : undefined,
        medicalHistory: userRole === "donor" ? medicalHistory : undefined,
        // Receiver fields (sent only if receiver is selected)
        requiredBloodGroup:
          userRole === "receiver" ? requiredBloodGroup : undefined,
        urgency: userRole === "receiver" ? urgency : undefined,
        units: userRole === "receiver" ? units : undefined,
        location: userRole === "receiver" ? locationField : undefined,
        requestDetails: userRole === "receiver" ? requestDetails : undefined,
      });

      if (response?.status === 200) {
        const { user, token } = response?.data;
        const { firstname, lastname,role } = response?.data?.user;
        console.log(token);
        dispatch(setUser({ user, token }));
        toast.success(`Welcome ${firstname} ${lastname}. User account created successfully`);
        if(role==='donor'){
          navigate("/receivers");
        }
        else{
          navigate("/donors");
        }
      }
      dispatch(hideLoading());

      console.log(response);
    } catch (error) {
      dispatch(hideLoading());
      getError(error);
    }
  };



  return (
    <Form className="" onSubmit={isFarmerLogin ? handleLogin : isFarmerReg? handleRegistration: null}>
      <Card className="rounded-5 p-3 mt-3" style={bgStyle} data-aos='zoom-in' data-aos-duration='500' data-aos-delay="300">
        <Card.Body>
          <h1>
            {isFarmerLogin
              ? "User Login"
              : isFarmerReg
              ? "User Registration"
              : null}
          </h1>

          {isFarmerLogin ? (
            <p className="text-end">
              New Member? <Link to="/auth/farmer-reg">Register</Link>
            </p>
          ) : isFarmerReg ? (
            <p className="text-end">
              Already a Member? <Link to="/auth/farmer-login">Login</Link>
            </p>
          ) : null}

          {isFarmerReg ? (
            <>
              <Row>
                <Col md={6}>
                  <FromField
                    label="First Name"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col>
                  <FromField
                    label="Last Name"
                    type="text"
                    placeholder="Last Name"
                    value={LastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
              </Row>
             
            
                  <FromField
                    label="Mobile No."
                    type="number"
                    placeholder="Mobile No."
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />

                  {/* New Section: User Type Selection */}
              <Form.Group className="mb-3">
                <Form.Label>User Type</Form.Label>
                <div>
                  <Form.Check
                    inline
                    type="radio"
                    label="Donor"
                    name="userRole"
                    id="donor"
                    checked={userRole === "donor"}
                    onChange={() => setUserRole("donor")}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Receiver"
                    name="userRole"
                    id="receiver"
                    checked={userRole === "receiver"}
                    onChange={() => setUserRole("receiver")}
                  />
                </div>
              </Form.Group>

              {/* Conditionally render Donor fields */}
              {userRole === "donor" && (
                <>
                  <FromField
                    label="Blood Group"
                    type="text"
                    placeholder="Blood Group (e.g., A+)"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                  />
                  <FromField
                    label="Age"
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <FromField
                    label="Gender"
                    type="text"
                    placeholder="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <FromField
                    label="Last Donation Date"
                    type="date"
                    placeholder="Last Donation Date"
                    value={lastDonation}
                    onChange={(e) => setLastDonation(e.target.value)}
                  />
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Currently Available"
                      checked={availability}
                      onChange={(e) => setAvailability(e.target.checked)}
                    />
                  </Form.Group>
                  <FromField
                    label="Medical History"
                    type="text"
                    placeholder="Medical History"
                    value={medicalHistory}
                    onChange={(e) => setMedicalHistory(e.target.value)}
                  />
                </>
              )}

              {/* Conditionally render Receiver fields */}
              {userRole === "receiver" && (
                <>
                  <FromField
                    label="Required Blood Group"
                    type="text"
                    placeholder="Required Blood Group (e.g., O-)"
                    value={requiredBloodGroup}
                    onChange={(e) => setRequiredBloodGroup(e.target.value)}
                  />
                  <FromField
                    label="Urgency"
                    type="text"
                    placeholder="Urgency (e.g., Emergency)"
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                  />
                  <FromField
                    label="Units Required"
                    type="number"
                    placeholder="Units Required"
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                  />
                  <FromField
                    label="Location"
                    type="text"
                    placeholder="Location (Hospital/City)"
                    value={locationField}
                    onChange={(e) => setLocationField(e.target.value)}
                  />
                  <FromField
                    label="Request Details"
                    type="text"
                    placeholder="Request Details"
                    value={requestDetails}
                    onChange={(e) => setRequestDetails(e.target.value)}
                  />
                </>
              )}
            </>
          ) : null}
          <FromField
            label="Email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FromField
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Card.Body>
        <Card.Footer className="border-0">
          <Button type="submit" className="w-100 rounded-pill">
            {isLoading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : isFarmerLogin ? (
              "Login"
            ) : isFarmerReg ? (
              "Register"
            ) : null}
          </Button>
        </Card.Footer>
      </Card>
    </Form>
  );
}

export default AuthCard;
