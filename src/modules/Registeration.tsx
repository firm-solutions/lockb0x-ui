import React from "react";
import axios from "axios";
import useAlert from "../common/hooks/useAlert";
import useFreighterAPI from "../common/hooks/useFreighterAPI";
import Button from "../components/button";
import FormField from "../components/formField";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const checkFormValidation = (form: any): string => {
  const { email, password, confirmPassword, walletAddress } = form;
  if (!email) return "Email Address is required";
  if (!password) return "Password is required";
  if (!confirmPassword) return "Confirm password is required";
  if (password !== confirmPassword) return "Passwords do not match";
  if (!walletAddress) return "Wallet Address is required";
  return "";
};

const Registeration = () => {
  let navigate = useNavigate();
  const [spinner , setSpinner] = React.useState(false);
  const [walletSpinner, setWalletSpinner] = React.useState(false);
  const [state, setState] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    walletAddress: "",
    walletNetwork: "",
  });

  const { showAlert } = useAlert();

  const { isConnected, getPublicKey, getNetwork } = useFreighterAPI();

  // Send Object to API
  const submitForm = (payload: any) => {

    // posting data to api provided in swagger
    setSpinner(true);
    fetch('https://lockb0x-api-dev.azurewebsites.net/api/User/Register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(payload)
    })
      .then((response) => response.json())
      //Then with the data from the response in JSON...
      .then((data) => {
        setSpinner(false)
        navigate(`/dashboard`)
        console.log('Success:', data)
      })
  };

  const captchaVerify = () => {
    setSpinner(true)
    const validationError = checkFormValidation(state);
    if (validationError) {
      showAlert({ type: "error", message: validationError, duration: 2000 });
      setSpinner(false)
      return;
    }

    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(process.env.REACT_APP_RECAPTCHA_SITE_KEY, { action: "submit" })
        .then((token: any) => {
          // Step: 1 Need to send the token to your server and then verify it.
          // Step: 2 If the token is valid, you can send the user to the next page.
          // Step: 3 If the token is invalid, you can show an error message to the user.

          submitForm({ 'reCaptchaToken': token, ...state });
        });
    });
  };

  const generateAddress = async () => {
    try {
      setWalletSpinner(true);
      if (isConnected()) {
        const publicKey = await getPublicKey();
        const network = await getNetwork();
        console.log({ publicKey, network });
        setState({
          ...state,
          walletAddress: publicKey,
          walletNetwork: network,
        });
      } else {
        showAlert({
          type: "warning",
          message: "Please Install Freighter Extension",
          duration: 2000,
        });
      }
      setWalletSpinner(false);
    } catch (e: any) {
      setWalletSpinner(false);
      console.log(e);
      showAlert({ type: "error", message: e.message, duration: 2000 });
    }
  };

  return (
    <div className="items-center w-96 mx-auto justify-center mt-20">
      <div className="h-24 mb-10">
        <img src='logotitle.png' alt="Logo" />
      </div>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6  sign-main-div">
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
              <div className="col-span-6 sm:col-span-3">
                <FormField
                  isMandatory
                  label={"Confirm Password"}
                  value={state.confirmPassword}
                  onChangeText={(confirmPassword) =>
                    setState({ ...state, confirmPassword })
                  }
                  inputType={"password"}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <FormField
                  isMandatory
                  label="Wallet Address [?]"
                  value={state.walletAddress}
                  rightSlot={
                    <Button
                      key="generate-address"
                      label={"Generate New Address"}
                      loading={walletSpinner}
                      onPress={generateAddress}
                      size="sm"
                    />
                  }
                  onChangeText={(walletAddress) =>
                    setState({ ...state, walletAddress })
                  }
                  inputType={"text"}
                  inputStyles={{ textOverflow: "ellipsis" }}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                key="sign-up"
                label={"Sign Up"}
                loading={spinner}
                onPress={captchaVerify}
                size="lg"
                disabled={spinner}
              />
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-200 flex flex-col justify-center items-center ">
            <p>Already Account ? <Link style={{ textDecoration: 'underline' }} to='/login'>Please Login</Link></p>
            <p>The Firm LLC Copyright 2022</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Registeration;
