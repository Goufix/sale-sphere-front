import axios, { isAxiosError } from "axios";
import { API_BASE_URL } from "..";
import { Products } from "../entities/product.entity";

export class ProductsApi {
  private axiosInstance;
  constructor(private onError: (...params: any) => void, private onLoading: (...params: any) => void) {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
    });
  }

  async get() {
    try {
      this.onLoading(true);
      const response = await this.axiosInstance.get<Products[]>("/products");
      return response.data;
    } catch (e) {
      if (isAxiosError(e)) {
        this.onError(e.response?.data.message);
      }
    } finally {
      this.onLoading(false);
    }
  }

  async create(product: Partial<any>) {
    try {
      this.onLoading(true);
      const response = await this.axiosInstance.post<Products>("/products", {
        id: product.id,
        name: product.nome,
        stock: product.estoque,
        value: product.preço,
      } as Products);
      return response.data;
    } catch (e) {
      if (isAxiosError(e)) {
        this.onError(e.response?.data.message);
      }
    } finally {
      this.onLoading(false);
    }
  }

  async delete(id: string) {
    try {
      this.onLoading(true);
      await this.axiosInstance.delete(`/products/${id}`);
    } catch (e) {
      if (isAxiosError(e)) {
        this.onError(e.response?.data.message);
      }
    } finally {
      this.onLoading(false);
    }
  }

  async update(id: string, stock: number) {
    try {
      this.onLoading(true);
      await this.axiosInstance.patch(`/products/${id}`, { stock });
    } catch (e) {
      if (isAxiosError(e)) {
        this.onError(e.response?.data.message);
      }
    } finally {
      this.onLoading(false);
    }
  }
}
