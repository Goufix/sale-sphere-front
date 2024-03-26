import styled from "styled-components";

export const Card = styled.div`
  width: 100%;
  background-color: #1c2128;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 0 20px 20px 20px;
  margin-bottom: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.3);

  @media (max-width: 1367px) {
    max-width: 80%;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;

export const CardHeaderTitle = styled.h2`
  font-size: 18px;
`;

export const AddItemCardButton = styled.button`
  background-color: #238636;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: #3b8640;
  }
  width: 100%;
`;

export const AddItemCardButtonText = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

export const CardContent = styled.div`
  display: flex;
  gap: 20px;
  flex: 1;
  overflow-y: auto;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
`;
