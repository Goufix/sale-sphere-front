import React from "react";
import * as S from "./styles";

interface Props {
  title: string;
  buttonText: string;
  content: React.JSX.Element;
  open?: boolean;
  setOpen?: (...args: any[]) => void;
}

export function Card({ buttonText, content, title, setOpen }: Props) {
  return (
    <>
      <S.Card>
        <S.CardHeader>
          <S.CardHeaderTitle>{title}</S.CardHeaderTitle>
        </S.CardHeader>
        <S.CardContent>{content}</S.CardContent>
        <S.CardFooter>
          <S.AddItemCardButton onClick={() => setOpen?.(true)}>
            <S.AddItemCardButtonText> {buttonText}</S.AddItemCardButtonText>
          </S.AddItemCardButton>
        </S.CardFooter>
      </S.Card>
    </>
  );
}
