import axios, { isAxiosError } from "axios";
import { API_BASE_URL } from "..";
import { Clients } from "../entities/client.entity";

export class ClientsApi {
  private axiosInstance;
  constructor(private onError: (...params: any) => void, private onLoading: (...params: any) => void) {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
    });
  }

  async get() {
    try {
      this.onLoading(true);
      const response = await this.axiosInstance.get<Clients[]>("/clients");
      return response.data;
    } catch (e) {
      if (isAxiosError(e)) {
        this.onError(e.response?.data.message);
      }
    } finally {
      this.onLoading(false);
    }
  }

  async create(client: Partial<Clients>) {
    try {
      this.onLoading(true);
      const response = await this.axiosInstance.post<Clients>("/clients", client);
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
      await this.axiosInstance.delete(`/clients/${id}`);
    } catch (e) {
      if (isAxiosError(e)) {
        this.onError(e.response?.data.message);
      }
    } finally {
      this.onLoading(false);
    }
  }
}
