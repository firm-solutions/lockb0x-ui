/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import useAlert from "../common/hooks/useAlert";

const AlertTypesIcons = {
  success: {
    color: "bg-emerald-500",
    icon: "fa-circle-check",
  },
  error: {
    color: "bg-rose-500",
    icon: "fa-times-circle",
  },
  warning: {
    color: "bg-yellow-400",
    icon: "fa-exclamation-triangle",
  },
};

const Alert = () => {
  const { alert, resetAlert } = useAlert();

  const handleClose = () => {
    resetAlert();
  };

  React.useEffect(() => {
    if (alert?.duration) {
      setTimeout(handleClose, alert?.duration);
    }
  }, [alert?.duration]);

  if (!alert?.message) return <></>;

  return (
    <div className="flex w-100 justify-center">
      <div
        className={`fixed flex  justify-center items-center translate-y-2/4 p-2.5 rounded top-0 ${
          AlertTypesIcons[alert?.type].color
        }`}
        style={{ zIndex: 1401, height: "40px" }}
      >
        <p className="text-white text-center my-auto">
          <i
            className={`fas ${
              AlertTypesIcons[alert?.type].icon
            }  text-white mr-3`}
          />
          {alert?.message}
        </p>
        <span className="text-white ml-5 cursor-pointer" onClick={handleClose}>
          <i className="fas fa-times" />
        </span>
      </div>
    </div>
  );
};

export default Alert;
