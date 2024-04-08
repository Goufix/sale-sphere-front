import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { SFModal, SfInput } from "../modal";
import * as S from "./styles";

interface Props {
  title: string;
  buttonText: string;
  content: React.JSX.Element;
  inputs: SfInput[];
  onSubmit: (data: any) => Promise<void>;
}

export function Card<T extends FieldValues>({ buttonText, content, title, inputs, onSubmit }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<T>();

  const submitWrapper = async (data: any) => {
    await onSubmit(data);
    setOpen(false);
    reset();
  };

  return (
    <>
      <S.Card>
        {open && (
          <SFModal
            title={title}
            setOpened={setOpen}
            inputs={inputs}
            register={register}
            submit={handleSubmit}
            performSubmit={submitWrapper}
            reset={reset}
          />
        )}
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
