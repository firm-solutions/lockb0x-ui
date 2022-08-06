import React, { useContext  } from "react";
import useAlert from "../common/hooks/useAlert";
import Button from "../components/button";
import FormField from "../components/formField";
import { Link, useNavigate , useLocation } from "react-router-dom";
import axios from '../api/axios';
import useAuth from "../hooks/useAuth";

const LOGIN_URL = '/User/Token';

const checkFormValidation = (form) => {
    const { email, password } = form;
    if (!email) return "Email Address is required";
    if (!password) return "Password is required";
    return "";
};

const Login = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const { setAuth } = useAuth()

    const [spinner, setSpinner] = React.useState(false);
    const [state, setState] = React.useState({
        email: "",
        password: ""
    });

    const { showAlert } = useAlert();

    // Send Object to API
    const login = async () => {
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
                navigate(from, { replace: true });
            }

        } catch (e) {
            setSpinner(false);
            showAlert({ type: "error", message: e.message, duration: 2000 });
        }
    };


    return (
        <div className="items-center w-96 mx-auto justify-center mt-20">
            <div className="h-24 mb-10">
                <img src='logotitle.png' alt="Logo" />
            </div>
            <form >
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <FormField
                                    isMandatory
                                    label={"Email Address"}
                                    value={state.email}
                                    onChangeText={(email) => setState({ ...state, email })}
                                    inputType={"email"}
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <FormField
                                    isMandatory
                                    label={"Password"}
                                    value={state.password}
                                    onChangeText={(password) => setState({ ...state, password })}
                                    inputType={"password"}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center ">
                            <Button
                                label={"Login"}
                                loading={spinner}
                                onPress={login}
                                size="lg"
                                disabled={spinner}
                            />
                        </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-200 flex flex-col justify-center items-center sm:px-6">
                        <Link style={{ textDecoration: 'underline' }} to='/signup'>Create Account</Link>
                        <p>The Firm LLC Copyright 2022</p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
