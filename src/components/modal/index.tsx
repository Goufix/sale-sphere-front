import * as S from "./styles";

export function SFModal({ setOpened }: any) {
  return (
    <S.Container>
      <S.ModalContainer>
        <S.Modal onClick={() => setOpened(false)}>
          <form>
            <label htmlFor="name">Nome</label>
            <input type="text" onChange={(e) => console.log(e.target.value)} />
          </form>
        </S.Modal>
      </S.ModalContainer>
    </S.Container>
  );
}
