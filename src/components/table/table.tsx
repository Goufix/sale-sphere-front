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
      columnsSet.add(key);

      row.push(item[key]);
    });
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
              {row.map((cell, cellIndex) => (
                <S.TableCell value={cell} key={cellIndex}>
                  {cell}
                </S.TableCell>
              ))}
            </S.TableRow>
          ))}
        </tbody>
      </S.Table>
    </S.TableWrapper>
  );
}
