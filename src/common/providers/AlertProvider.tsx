import { createContext, useCallback, useState } from "react";

type AlertTypeProps = "success" | "error" | "warning";

type AlertProps = {
  type: AlertTypeProps;
  message: string;
  duration?: number;
};

type AlertContextProps = {
  alert: AlertProps | null;
  showAlert: (alert: AlertProps) => void;
  resetAlert: () => void;
};

export const AlertContext = createContext<AlertContextProps>({
  alert: null,
  showAlert: () => {},
  resetAlert: () => {},
});

const AlertProvider = ({ children }: any) => {
  const [alert, setAlert] = useState<AlertProps | null>(null);

  const showAlert = (alert: AlertProps) => setAlert(alert);
  const resetAlert = () => setAlert(null);

  const contextValue = {
    alert,
    showAlert: useCallback((alert: AlertProps) => showAlert(alert), []),
    resetAlert: useCallback(() => resetAlert(), []),
  };

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
