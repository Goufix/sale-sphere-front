import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { SFModal, SfInput } from "../modal";
import * as S from "./styles";

interface Props {
  title: string;
  buttonText: string;
  content: React.JSX.Element;
  inputs: SfInput[];
  onSubmit: (data: any) => Promise<void>;
  formData?: Record<string, any>;
  fetchApi: () => Promise<void>;
  open?: boolean;
  setOpen?: any;
}

export function Card<T extends FieldValues>({
  buttonText,
  content,
  title,
  inputs,
  onSubmit,
  formData,
  open,
  setOpen,
  fetchApi,
}: Props) {
  const { register, handleSubmit, reset } = useForm<T>();

  useEffect(() => {
    if (formData) {
      reset(formData as any);
    }
  }, [formData]);

  const submitWrapper = async (data: any) => {
    await onSubmit(data);
    setOpen(false);
    reset(formData as any);
  };

  const resetWrapper = () => {
    reset(
      Object.fromEntries(
        inputs.map(({ label }) => {
          return [label, undefined];
        })
      ) as any
    );
    fetchApi();
    setOpen?.(true);
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
          <S.AddItemCardButton onClick={() => resetWrapper()}>
            <S.AddItemCardButtonText>{buttonText}</S.AddItemCardButtonText>
          </S.AddItemCardButton>
        </S.CardFooter>
      </S.Card>
    </>
  );
}
