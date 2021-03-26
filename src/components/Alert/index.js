import { createContext, useContext, useState } from "react";

const AlertContext = createContext();
AlertContext.displayName = "AlertContext";

function useAlert() {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("Component must be wrapped within <Alert /> Component");
  }

  return context;
}

const Alert = ({ children, status = "info", ...rest }) => {
  const [color] = useState(() => {
    return getColor(status);
  });

  console.log(rest);

  const value = { color };

  return (
    <AlertContext.Provider value={value}>
      <div className={` alert alert--${status}`} {...rest}>
        {children}
      </div>
    </AlertContext.Provider>
  );
};

function Title({ children }) {
  const { color } = useAlert();
  return <h2 style={{ color: color }}>{children}</h2>;
}

function Body({ children }) {
  const { color } = useAlert();

  return <p style={{ color: color }}>{children}</p>;
}

function Button({ children }) {
  const { color } = useAlert();
  return (
    <button style={{ background: color }} className="btn">
      {children}
    </button>
  );
}

function Controls({ children }) {
  return <div>{children}</div>;
}

Alert.Title = Title;
Alert.Body = Body;
Alert.Button = Button;
Alert.Controls = Controls;

const getColor = (status) => {
  switch (status) {
    case "success":
      return "green";
    case "error":
      return "crimson";
    case "info":
    default:
      return "steelblue";
  }
};

export { Alert };
