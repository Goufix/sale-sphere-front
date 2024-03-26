import React from "react";
import * as S from "./styles";

interface Props {
  title: string;
  buttonText: string;
  content: React.JSX.Element;
}

export function Card({ buttonText, content, title }: Props) {
  return (
    <S.Card>
      <S.CardHeader>
        <S.CardHeaderTitle>{title}</S.CardHeaderTitle>
      </S.CardHeader>
      <S.CardContent>{content}</S.CardContent>
      <S.CardFooter>
        <S.AddItemCardButton>
          <S.AddItemCardButtonText> {buttonText}</S.AddItemCardButtonText>
        </S.AddItemCardButton>
      </S.CardFooter>
    </S.Card>
  );
}
