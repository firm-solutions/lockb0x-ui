import React, { useContext, useState  } from "react";
import useAlert from "../common/hooks/useAlert";
import Button from "../components/button";
import FormField from "../components/formField";
import { Link, useNavigate , useLocation } from "react-router-dom";
import axios from '../api/axios';
import useAuth from "../hooks/useAuth";
import ClipLoader from "react-spinners/ClipLoader";

const LOGIN_URL = '/User/Token';

const checkFormValidation = (form) => {
    const { email, password } = form;
    if (!email) return "Email Address is required";
    if (!password) return "Password is required";
    return "";
};

const Login = () => {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "green",
  };
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const { setAuth } = useAuth()

    const [spinner, setSpinner] = React.useState(false);
    let [color, setColor] = useState("#ffffff");
    const [state, setState] = React.useState({
        email: "",
        password: ""
    });

    const { showAlert } = useAlert();

    // Send Object to API
    const login = async (e) => {
      e.preventDefault();
        const validationError = checkFormValidation(state);
        if (validationError) {
            showAlert({ type: "error", message: validationError, duration: 2000 });
            return;
        }
        try {
            setSpinner(true);
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ ...state }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log(JSON.stringify(response?.data));
            if (response.data.status === 'NOK') {
                setSpinner(false);
                showAlert({ type: "error", message: response.data.errorMessage, duration: 2000 });
            }

            if (response.data.status === 'OK') {
                setSpinner(false);
                console.log(response.data)
                const accessToken = response.data.value.token
                const type = response?.data?.value.type
                const expires = response?.data?.value.expires
                setAuth({ ...state , accessToken ,  type , expires });
                localStorage.setItem('tokenData', JSON.stringify(accessToken));
                navigate(from, { replace: true });
            }

        } catch (e) {
            setSpinner(false);
            showAlert({ type: "error", message: e.message, duration: 2000 });
        }
    };


    return (
        <section className="auth-sec">
        <div className="container">
          <div className="row custom-row">
            <div className="col-lg-4 col-md-8 mx-auto text-center">
                

                {
                  spinner == true ?
                  
                  <ClipLoader color={color} loading={spinner} cssOverride={override} size={50} />
                  :
                  <>
                    <img src='logotitle.png' alt="Logo" />
                    <div className="auth-content-box">
                    <h5 className="mb-4">Login</h5>
                    <form action="" className="mt-2">
                      <div className="row">
                        <div className="col-12">
                          <label style={{float:'left'}}>Email</label>
                        <FormField
                          value={state.email}
                          onChangeText={(email) => setState({ ...state, email })}
                          inputType={"email"}
                          placeholder={"JaneDoe@protonmail.com"}
                      />
                        </div>
                        <div className="col-12">
                          <label style={{float:'left'}}>Password</label>
                        <FormField
                          value={state.password}
                          onChangeText={(password) => setState({ ...state, password })}
                          inputType={"password"}
                      />
                        </div>
                        {/* <div className="col-12">
                          <input type="text" className="form-control" placeholder="Frieghter Wallet Address"/>
                        </div> */}
                        <div className="col-12 mt-4 text-center d-flex flex-column">
                        <button type="submit" onClick={login} class="btn mb-3">Login</button> <br/>
      
                          <a href="/signup" className="btn-link d-block text-center mb-4 text-decoration-none text-light">Create Account</a>
      
                          <p className="text-center text-muted mb-0">The Firm llc Copyright 2022</p>
                        </div>
                      </div>
                    </form>
                </div>
                  </>
                

                }
              
            </div>
            
          </div>
        </div>
      </section>
    );
};

export default Login;
