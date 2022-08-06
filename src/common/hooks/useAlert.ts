import { useContext } from "react";
import { AlertContext } from "../providers/AlertProvider";

const useAlert = () => {
  const { alert, resetAlert, showAlert } = useContext(AlertContext);

  return { alert, showAlert, resetAlert };
}

export default useAlert;
