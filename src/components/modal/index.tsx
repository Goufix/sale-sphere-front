import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import * as S from "./styles";

export interface SfInput {
  label: string;
  value: string;
  type: "text" | "select" | "checkbox";
  options?: { label: string; value: string }[];
  required?: boolean;
  register?: UseFormRegister<any>;
}

export interface SfModelProps {
  setOpened: any;
  inputs: SfInput[];
  submit: UseFormHandleSubmit<any, any>;
  performSubmit: (data: any) => Promise<void>;
  register: UseFormRegister<any>;
  reset: any;
  title: string;
}

function TextInput(props: SfInput) {
  return (
    <S.FormItem key={props.label}>
      <label htmlFor={props.label}>{props.label}</label>
      <input type="text" {...props.register?.(props.value, { required: props.required })} />
    </S.FormItem>
  );
}

function SelectInput(props: SfInput) {
  console.log("props", props);
  return (
    <S.FormItem key={props.label}>
      <label htmlFor={props.label}>{props.label}</label>
      <select {...props.register?.(props.value)}>
        {props.options?.map((i) => (
          <option value={i.value}>{i.label}</option>
        ))}
      </select>
    </S.FormItem>
  );
}

function CheckboxInput(props: SfInput) {
  return (
    <S.FormItem key={props.label}>
      <label htmlFor={props.label}>{props.label}</label>
      <input type="checkbox" {...props.register?.(props.value, { required: props.required })}></input>
    </S.FormItem>
  );
}

const InputMap = {
  text: TextInput,
  select: SelectInput,
  checkbox: CheckboxInput,
};

export function SFModal({ setOpened, inputs, submit, register, performSubmit, title }: SfModelProps) {
  return (
    <S.Container>
      <S.ModalContainer>
        <S.Modal>
          <h1>Cadastrar {title}</h1>
          <form onSubmit={submit(performSubmit)}>
            {inputs?.map((input) => {
              const Component = InputMap[input.type];
              return <Component {...input} register={register} />;
            })}
            <S.Btn variant="#185e26" type="submit">
              Enviar
            </S.Btn>
            <S.Btn type="button" onClick={() => setOpened(false)} variant="#5e1818">
              Fechar
            </S.Btn>
          </form>
        </S.Modal>
      </S.ModalContainer>
    </S.Container>
  );
}
