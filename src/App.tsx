import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { ApiContext } from "./api/apiContext";
import { Dashboard } from "./pages/dashboard";

const Container = styled.div`
  z-index: 10000;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #000;
  background-color: rgba(0, 0, 0, 0.3);

  p {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;

    height: 30%;
    width: 100%;
    color: #fff;
    font-size: 100px;
    text-align: center;
  }
`;

const slideUpAnimation = keyframes`
  from {
    transform: translateY(40%);
  }
  to {
    transform: translateY(0);
  }
`;

const ToastAlert = styled.div`
  position: absolute;
  bottom: 30px;
  right: 30px;
  padding: 10px;
  background-color: #5e2323;
  color: #fff;
  border: 1px solid #5e2323;
  width: fit-content;
  border-radius: 4px;
  min-width: 300px;
  max-width: 400px;
  text-align: center;
  animation: ${slideUpAnimation} 0.5s ease-in-out, ${slideUpAnimation} 0.1s ease-in-out 4.9s reverse;
`;

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const setErrorWrapper = (error: any) => {
    setError(error instanceof Array ? error.join(", ") : error);
    setTimeout(() => setError(""), 5000);
  };

  return (
    <ApiContext.Provider value={{ loading, error, setError: setErrorWrapper, setLoading }}>
      {loading && (
        <Container>
          <p>...</p>
        </Container>
      )}
      {error && <ToastAlert onClick={() => setError("")}>{error}</ToastAlert>}
      <Dashboard />
    </ApiContext.Provider>
  );
}

export default App;
