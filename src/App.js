import React, { createContext, useContext, useState } from "react";
import "./App.css";
import { Alert } from "./components/Alert";
import Container from "./components/Container";

const ButtonContext = createContext();
ButtonContext.displayName = "ButtonContext";

const Button = ({ children }) => {
  const [on, setOn] = useState(false);

  const toggle = () => setOn(!on);

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

function ButtonToggle() {
  const { on, toggle } = useButton();
  return on ? (
    <button style={{ background: "yellow", padding: "20px" }} onClick={toggle}>
      X
    </button>
  ) : (
    <button style={{ background: "blue", padding: "20px" }} onClick={toggle}>
      X
    </button>
  );
}

function ButtonDescription() {
  const { on } = useButton();
  return on ? (
    <p>The Button is turned on</p>
  ) : (
    <p>The Button is turned off` </p>
  );
}

function App() {
  return (
    <div className="app">
      <Button>
        <ButtonToggle />
        <ButtonDescription />
      </Button>
    </div>
  );
}

export default App;

// COMPOUND COMPONENT EXAMPLE

// function App() {
//   return (
//     <div className="app">
//       <Container>
//         <Alert status="info" onClick={() => console.log("hey")}>
//           <Alert.Title>Heyyy</Alert.Title>
//           <Alert.Body>Ohhh No!</Alert.Body>
//           <Alert.Controls>
//             <Alert.Button>Continue</Alert.Button>
//             <Alert.Button>Cancel</Alert.Button>
//           </Alert.Controls>
//         </Alert>
//       </Container>
//       <Container>
//         <Alert status="success" onClick={() => console.log("hey")}>
//           <Alert.Title>Heyyy</Alert.Title>
//           <Alert.Body>Ohhh No!</Alert.Body>
//           <Alert.Controls>
//             <Alert.Button>Continue</Alert.Button>
//             <Alert.Button>Cancel</Alert.Button>
//           </Alert.Controls>
//         </Alert>
//       </Container>
//       <UsersName />
//     </div>
//   );
// }

// export default App;
