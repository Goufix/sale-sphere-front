import axios, { isAxiosError } from "axios";
import { API_BASE_URL } from "..";
import { Sales } from "../entities/sale.entity";

export class SalesApi {
  private axiosInstance;
  constructor(private onError: (...params: any) => void, private onLoading: (...params: any) => void) {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
    });
  }

  async get() {
    try {
      this.onLoading(true);
      const response = await this.axiosInstance.get<Sales[]>("/sales");
      return response.data;
    } catch (e) {
      if (isAxiosError(e)) {
        this.onError(e.response?.data.message);
      }
    } finally {
      this.onLoading(false);
    }
  }

  async create(sale: Partial<any>) {
    try {
      this.onLoading(true);
      const response = await this.axiosInstance.post<Sales>("/sales", {
        amount: sale.quantidade,
        id: sale.id,
        paid: sale.pago === "Sim",
        productId: sale.produto,
        clientId: sale.cliente,
      });
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
      await this.axiosInstance.delete(`/sales/${id}`);
    } catch (e) {
      if (isAxiosError(e)) {
        this.onError(e.response?.data.message);
      }
    } finally {
      this.onLoading(false);
    }
  }

  async markAsPaid(id: string) {
    try {
      this.onLoading(true);
      await this.axiosInstance.post(`/sales/paid/${id}`);
    } catch (e) {
      if (isAxiosError(e)) {
        this.onError(e.response?.data.message);
      }
    } finally {
      this.onLoading(false);
    }
  }
}
