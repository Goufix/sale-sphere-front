import { Clients } from "./client.entity";
import { Products } from "./product.entity";

export interface Sales {
  id: string;
  amount: number;
  totalValue: number;
  paid: boolean;
  client: Clients;
  product: Products;
}
