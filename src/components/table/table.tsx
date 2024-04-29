import { Btn } from "../modal/styles";
import * as S from "./styles";

interface Props {
  data: Record<string, any>[];
  handleEdit?: (data: any) => Promise<void>;
  handleDelete: (data: any) => Promise<void>;
}

function extractColumnsAndData(data: Record<string, any>[], edit?: boolean): { columns: string[]; data: any[][] } {
  const columnsSet = new Set<string>();
  const _data: any[][] = [];

  data.forEach((item) => {
    const row: any[] = [];

    Object.keys(item).forEach((key) => {
      columnsSet.add(key);

      row.push(item[key]);
    });

    if (edit) {
      columnsSet.add("Editar");
    }
    columnsSet.add("Apagar");

    if (edit) {
      row.push("Editar");
    }
    row.push("Apagar");

    _data.push(row);
  });

  const columnsArray = Array.from(columnsSet);

  return { columns: columnsArray, data: _data };
}

function toObject(columns: any[], values: any[]) {
  const newObj: any = {};
  columns.forEach((column, index) => {
    const value = values[index];
    newObj[column] = value;
  });

  return newObj;
}

export function Table({ data, handleEdit, handleDelete }: Props) {
  const { columns, data: _data } = extractColumnsAndData(data, handleEdit !== undefined);
  const actionColumns = ["Editar", "Apagar"];
  const _columns = columns.filter((column) => !actionColumns.includes(column));

  return (
    <S.TableWrapper>
      <S.Table>
        <S.TableHead>
          <S.TableRow>
            {columns.map((column, index) => {
              if (column === "id") return <></>;
              return <S.TableHeaderCell key={index}>{column}</S.TableHeaderCell>;
            })}
          </S.TableRow>
        </S.TableHead>
        <tbody>
          {_data.map((row, rowIndex) => (
            <S.TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => {
                if (columns.findIndex((value) => value === "id") === cellIndex) return <></>;

                if (cell === "Editar" || cell === "Apagar")
                  return (
                    <S.TableCell value={cell} key={cellIndex}>
                      <Btn
                        variant={cell === "Editar" ? "#5e5518" : "#5e1818"}
                        onClick={() =>
                          cell === "Editar"
                            ? handleEdit?.(toObject(_columns, row))
                            : handleDelete(toObject(_columns, row))
                        }
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
