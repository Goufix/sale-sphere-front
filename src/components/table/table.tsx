import { Btn } from "../modal/styles";
import * as S from "./styles";

interface Props {
  data: Record<string, any>[];
}

function extractColumnsAndData(data: Record<string, any>[]): { columns: string[]; data: any[][] } {
  const columnsSet = new Set<string>();
  const _data: any[][] = [];

  data.forEach((item) => {
    const row: any[] = [];

    Object.keys(item).forEach((key) => {
      if (key === "id") return;

      columnsSet.add(key);

      row.push(item[key]);
    });
    columnsSet.add("Editar");
    columnsSet.add("Apagar");

    row.push("Editar", "Apagar");

    _data.push(row);
  });

  const columnsArray = Array.from(columnsSet);

  return { columns: columnsArray, data: _data };
}

export function Table({ data }: Props) {
  const { columns, data: _data } = extractColumnsAndData(data);

  return (
    <S.TableWrapper>
      <S.Table>
        <S.TableHead>
          <S.TableRow>
            {columns.map((column, index) => (
              <S.TableHeaderCell key={index}>{column}</S.TableHeaderCell>
            ))}
          </S.TableRow>
        </S.TableHead>
        <tbody>
          {_data.map((row, rowIndex) => (
            <S.TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => {
                if (cell === "Editar" || cell === "Apagar")
                  return (
                    <S.TableCell value={cell} key={cellIndex}>
                      <Btn
                        variant={cell === "Editar" ? "#5e5518" : "#5e1818"}
                        onClick={() => (cell === "Editar" ? cell.handleEdit(cell.id) : cell.handleEdit(cell.id))}
                      >
                        {cell}
                      </Btn>
                    </S.TableCell>
                  );

                return (
                  <S.TableCell value={cell} key={cellIndex}>
                    {cell}
                  </S.TableCell>
                );
              })}
            </S.TableRow>
          ))}
        </tbody>
      </S.Table>
    </S.TableWrapper>
  );
}
