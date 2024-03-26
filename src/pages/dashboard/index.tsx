import { fakerPT_BR } from "@faker-js/faker";
import { Card } from "../../components/card/card";
import { Table } from "../../components/table/table";
import * as S from "./styles";

fakerPT_BR;

interface Client {
  name: string;
  phoneNumber: string;
  code: string;
}

interface Product {
  name: string;
  stock: number;
  value: number;
}

interface Sell {
  client: Client;
  product: Product;
  amount: number;
  totalValue: number;
  paid: boolean;
}

const apiClients = new Array(100).fill(null).map<Client>(() => ({
  name: fakerPT_BR.person.fullName(),
  phoneNumber: fakerPT_BR.phone.number().replace("+55 ", ""),
  code: fakerPT_BR.number.int({ max: 9999, min: 1000 }).toString(),
}));

const apiProducts = new Array(10).fill(null).map<Product>(() => ({
  name: fakerPT_BR.commerce.product(),
  value: fakerPT_BR.number.int({ max: 100, min: 5 }),
  stock: fakerPT_BR.number.int({ max: 10000, min: 1000 }),
}));

const apiSells = new Array(10).fill(null).map<Sell>((_, i) => {
  const amount = fakerPT_BR.number.int({ max: 100, min: 10 });
  const product = apiProducts[i];
  const client = apiClients[i];

  return {
    amount,
    client: client,
    product: product,
    paid: Math.random() > 0.5 ? true : false,
    totalValue: product.value * amount,
  };
});

const clients = apiClients.map(({ code, name, phoneNumber }) => ({
  código: code,
  nome: name,
  telefone: phoneNumber,
}));

const products = apiProducts.map(({ name, stock }) => ({
  nome: name,
  estoque: stock,
}));

const sells = apiSells.map(({ amount, client, paid, product, totalValue }) => ({
  cliente: client.name,
  produto: product.name,
  quantidade: amount,
  "valor total": totalValue,
  pago: paid ? "Sim" : "Não",
}));

export function Dashboard() {
  return (
    <S.Container>
      <S.CardContainer>
        <Card buttonText="Adicionar" content={<Table data={clients} />} title="Clientes" />
        <Card buttonText="Adicionar" content={<Table data={products} />} title="Produtos" />
        <Card buttonText="Adicionar" content={<Table data={sells} />} title="Vendas" />
      </S.CardContainer>
    </S.Container>
  );
}
