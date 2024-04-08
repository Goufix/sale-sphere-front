import { Button } from "react-bootstrap";
import styled from "styled-components";

export const Container = styled.div`
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #000;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const FormItem = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  gap: 20px;

  select {
    height: 30px;
    width: 100%;
    border: 1px solid #fff;
    margin-bottom: 10px;
    background-color: rgb(20, 23, 28);
    color: #fff;
  }

  option {
    background-color: rgb(20, 23, 28);
    color: #fff;
  }

  input[type="checkbox"] {
    height: 30px;
    width: 30px;
  }

  input {
    height: 30px;
    border: 1px solid #fff;
    margin-bottom: 10px;
    background-color: rgb(20, 23, 28);
  }
`;

export const Modal = styled.div`
  form > label {
    color: #fff;
    width: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  border-radius: 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  color: #fff;
  gap: 10px;
  width: 50%;
  height: fit-content;
  background-color: rgb(24, 27, 32);
  border: 1px solid #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const Btn: typeof Button = styled(Button)`
  background-color: ${(props) => props.variant};
`;
