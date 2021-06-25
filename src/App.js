import React, { createContext, useContext, useState } from "react";
import "./App.css";

const ButtonContext = createContext();
ButtonContext.displayName = "ButtonContext";

const Button = ({ children }) => {
  const [on, toggle] = useState(false);

  const value = { on, toggle };

  return (
    <ButtonContext.Provider value={value}>{children}</ButtonContext.Provider>
  );
};

function useButton() {
  const context = useContext(ButtonContext);

  if (!context) {
    throw new Error("Button must be wrapped with Button Provider");
  }

  return context;
}

function ButtonColor() {
  const { on, toggle } = useButton();
  return (<button
    onClick={() => toggle(!on)}
    className="btn" // button padding is already set in App.css
    style={on ? { background: "yellow" } : { background: "blue" }}
  >X</button>);
}

function ButtonDescription() {
  const { on } = useButton();
  return on ? <p>The Button is turned on</p> : <p>The Button is turned off</p>;
}

function App() {
  return (
    <Button>
      <ButtonColor />
      <ButtonDescription />
    </Button>
  );
}

export default App;
