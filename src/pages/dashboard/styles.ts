import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #22272e;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  justify-content: space-between;
  height: 100%;
  gap: 20px;
  flex: 1;
  width: 100%;

  @media (max-width: 1367px) {
    flex-direction: column;
  }
`;
