import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ApiContext } from "../../api/apiContext";
import { ClientsApi } from "../../api/clients";
import { ProductsApi } from "../../api/produts";
import { SalesApi } from "../../api/sale";
import { Card } from "../../components/card/card";
import { Table } from "../../components/table/table";
import * as S from "./styles";

export function Dashboard() {
  const [apiClients, setApiClients] = useState<any[]>([]);
  const [apiProducts, setApiProducts] = useState<any[]>([]);
  const [apiSales, setApiSales] = useState<any[]>([]);
  const [clientFormData] = useState<any>({});
  const [productFormData, setProductFormData] = useState<any>({});
  const [saleFormData, setSaleFormData] = useState<any>({});
  const [clientModalOpen, setClientModalOpen] = useState<boolean>(false);
  const [productModalOpen, setProductModalOpen] = useState<boolean>(false);
  const [saleModalOpen, setSaleModalOpen] = useState<boolean>(false);
  const [clientInputs, setClientInputs] = useState<any[]>([]);
  const [productInputs, setProductInputs] = useState<any[]>([]);
  const [saleInputs, setSaleInputs] = useState<any[]>([]);
  const [isEditing, setEditing] = useState<boolean>(false);

  const { setError, setLoading } = useContext(ApiContext);
  const clientsApi = useMemo(() => new ClientsApi(setError, setLoading), [setError, setLoading]);
  const productsApi = useMemo(() => new ProductsApi(setError, setLoading), [setError, setLoading]);
  const salesApi = useMemo(() => new SalesApi(setError, setLoading), [setError, setLoading]);

  const fetchApi = useCallback(async () => {
    setEditing(false);
    const clients = await clientsApi.get();
    setApiClients(
      clients?.map(({ code, name, phoneNumber, id }) => ({
        id,
        código: code,
        nome: name,
        telefone: phoneNumber,
      })) ?? []
    );
    setClientInputs([
      { label: "Código", value: "código", type: "text" },
      { label: "Nome", value: "nome", type: "text" },
      { label: "Telefone", value: "telefone", type: "text" },
    ]);

    const products = await productsApi.get();
    setApiProducts(
      products?.map(({ name, stock, value, id }) => ({
        id,
        nome: name,
        estoque: stock,
        preço: value,
      })) ?? []
    );
    setProductInputs([
      {
        label: "Nome",
        value: "nome",
        type: "text",
      },
      {
        label: "Estoque",
        value: "estoque",
        type: "text",
      },
      {
        label: "Preço",
        value: "preço",
        type: "text",
      },
    ]);

    const sales = await salesApi.get();
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
    setSaleInputs([
      {
        label: "Cliente",
        value: "cliente",
        type: "select",
        options: clients?.map((c) => {
          return {
            label: c.name,
            value: c.id,
          };
        }),
      },
      {
        label: "produto",
        value: "produto",
        type: "select",
        options: products?.map((p) => ({
          label: p.name,
          value: p.id,
        })),
      },
      {
        label: "Quantidade",
        value: "quantidade",
        type: "text",
      },
      {
        label: "Pago",
        value: "pago",
        type: "checkbox",
      },
    ]);
  }, []);

  useEffect(() => {
    fetchApi();
  }, []);

  useEffect(() => {
    if (!(clientModalOpen || productModalOpen || saleModalOpen)) {
      setEditing(false);
    }
  }, [clientModalOpen, productModalOpen, saleModalOpen]);

  const handleClientDelete = async (data: any) => {
    await clientsApi.delete(data.id);
    fetchApi();
  };

  const handleProductEdit = async (data: any) => {
    setProductFormData(data);
    setProductInputs((curr) => curr.filter((p) => p.value === "estoque"));
    setProductModalOpen(true);
    setEditing(true);
  };
  const handleProductDelete = async (data: any) => {
    await productsApi.delete(data.id);
    fetchApi();
  };

  const handleSaleEdit = async (data: any) => {
    setSaleFormData(data);
    const toRemove = ["produto", "cliente", "quantidade"];
    setSaleInputs((curr) => curr.filter((p) => !toRemove.includes(p.value)));
    setSaleModalOpen(true);
    setEditing(true);
  };
  const handleSaleDelete = async (data: any) => {
    await salesApi.delete(data.id);
    fetchApi();
  };

  const handleClientsSubmit = async (data: any) => {
    if (isEditing) {
      setError("Você não pode editar clientes");
    } else {
      await clientsApi.create(data);
    }
    fetchApi();
  };

  const handleProductsSubmit = async (data: any) => {
    if (isEditing) {
      await productsApi.update(data.id, data.estoque);
    } else {
      await productsApi.create(data);
    }
    fetchApi();
  };

  const handleSaleSubmit = async (data: any) => {
    if (isEditing) {
      await salesApi.markAsPaid(data.id);
    } else {
      await salesApi.create(data);
    }
    fetchApi();
  };

  return (
    <S.Container>
      <S.CardContainer>
        <Card
          key="client"
          buttonText="Adicionar"
          content={<Table data={apiClients} handleDelete={handleClientDelete} />}
          title="Clientes"
          inputs={clientInputs}
          onSubmit={handleClientsSubmit}
          formData={clientFormData}
          open={clientModalOpen}
          setOpen={setClientModalOpen}
          fetchApi={fetchApi}
        />
        <Card
          key="products"
          inputs={productInputs}
          onSubmit={handleProductsSubmit}
          buttonText="Adicionar"
          content={<Table data={apiProducts} handleDelete={handleProductDelete} handleEdit={handleProductEdit} />}
          title="Produtos"
          formData={productFormData}
          open={productModalOpen}
          setOpen={setProductModalOpen}
          fetchApi={fetchApi}
        />
        <Card
          key="sales"
          inputs={saleInputs}
          onSubmit={handleSaleSubmit}
          buttonText="Adicionar"
          content={<Table data={apiSales} handleDelete={handleSaleDelete} handleEdit={handleSaleEdit} />}
          title="Vendas"
          formData={saleFormData}
          open={saleModalOpen}
          setOpen={setSaleModalOpen}
          fetchApi={fetchApi}
        />
      </S.CardContainer>
    </S.Container>
  );
}
