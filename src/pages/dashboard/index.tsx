import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../api/apiContext";
import { ClientsApi } from "../../api/clients";
import { Clients } from "../../api/entities/client.entity";
import { ProductsApi } from "../../api/produts";
import { SalesApi } from "../../api/sale";
import { Card } from "../../components/card/card";
import { Table } from "../../components/table/table";
import * as S from "./styles";

export function Dashboard() {
  const [apiClients, setApiClients] = useState<any[]>([]);
  const [apiProducts, setApiProducts] = useState<any[]>([]);
  const [apiSales, setApiSales] = useState<any[]>([]);

  const { error, loading, setError, setLoading } = useContext(ApiContext);
  const clientsApi = new ClientsApi(setError, setLoading);
  const productsApi = new ProductsApi(setError, setLoading);
  const salesApi = new SalesApi(setError, setLoading);

  const fetchApi = async () => {
    const clients = await clientsApi.get();
    setApiClients(
      clients?.map(({ code, name, phoneNumber, id }) => ({
        id,
        código: code,
        nome: name,
        telefone: phoneNumber,
      })) ?? []
    );

    const products = await productsApi.get();
    setApiProducts(
      products?.map(({ name, stock, value, id }) => ({
        id,
        nome: name,
        estoque: stock,
        Preço: value,
      })) ?? []
    );

    const sales = await salesApi.get();
    console.log("sales", sales);
    setApiSales(
      sales?.map(({ amount, client, paid, product, totalValue, id }) => ({
        id,
        cliente: client?.name,
        produto: product?.name,
        quantidade: amount,
        "valor total": totalValue,
        pago: paid ? "Sim" : "Não",
      })) ?? []
    );
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleClientsSubmit = async (data: Clients) => {
    await clientsApi.create(data);
    fetchApi();
  };

  const handleProductsSubmit = async (data: Clients) => {
    await productsApi.create(data);
    fetchApi();
  };

  const handleSaleSubmit = async (data: Clients) => {
    await salesApi.create(data);
    fetchApi();
  };

  return (
    <S.Container>
      <S.CardContainer>
        <Card
          buttonText="Adicionar"
          content={<Table data={apiClients} />}
          title="Clientes"
          inputs={[
            { label: "Código", value: "code", type: "text" },
            { label: "Nome", value: "name", type: "text" },
            { label: "Telefone", value: "phoneNumber", type: "text" },
          ]}
          onSubmit={handleClientsSubmit}
        />
        <Card
          inputs={[
            {
              label: "Nome",
              value: "name",
              type: "text",
            },
            {
              label: "Estoque",
              value: "stock",
              type: "text",
            },
            {
              label: "Preço",
              value: "value",
              type: "text",
            },
          ]}
          onSubmit={handleProductsSubmit}
          buttonText="Adicionar"
          content={<Table data={apiProducts} />}
          title="Produtos"
        />
        <Card
          inputs={[
            {
              label: "Cliente",
              value: "clientId",
              type: "select",
              options: apiClients.map((c) => {
                return {
                  label: c.nome,
                  value: c.id,
                };
              }),
            },
            {
              label: "produto",
              value: "productId",
              type: "select",
              options: apiProducts.map((p) => ({
                label: p.nome,
                value: p.id,
              })),
            },
            {
              label: "Quantidade",
              value: "amount",
              type: "text",
            },
            {
              label: "Pago",
              value: "paid",
              type: "checkbox",
            },
          ]}
          onSubmit={handleSaleSubmit}
          buttonText="Adicionar"
          content={<Table data={apiSales} />}
          title="Vendas"
        />
      </S.CardContainer>
    </S.Container>
  );
}
