import styled from "styled-components";

export const TableWrapper = styled.div`
  width: 100%;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #1c2128;
`;

export const TableHeaderCell = styled.th`
  padding: 8px;
  border-bottom: 1px solid #fff;
  text-transform: capitalize;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #1c2128;
  }
  &:nth-child(odd) {
    background-color: #1c2128;
  }
`;

export const TableCell = styled.td<{ value: string }>`
  ${(props) =>
    props.value === "Sim" ? "color: #3b8640;" : props.value === "Não" ? "color: #5e1818;" : "color: inherit;"}
  font-weight: bold;
  text-align: center;
  padding: 8px;
`;
