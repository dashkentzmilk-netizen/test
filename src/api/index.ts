import axios from "axios";
import { Dealer, Product } from "../types";

export const BASE_URL = "https://test-frontend.dev.int.perx.ru";

const getGoodsRequest = async (dealers?: string[]): Promise<Product[]> => {
  try {
    const params = new URLSearchParams();
    if (dealers) params.set("dealers", dealers.join(","));
    const response = await axios.get(`${BASE_URL}/api/goods`, { params });
    return response.data;
  } catch (e) {
    console.log("Ошибка: ", e);
    return [];
  }
};

const getDealersRequest = async (): Promise<Dealer[]> => {
  try {
    const response = await axios(`${BASE_URL}/api/dealers`);
    return response.data;
  } catch (e) {
    console.log("Ошибка: ", e);
    return [];
  }
};

export { getDealersRequest, getGoodsRequest };
