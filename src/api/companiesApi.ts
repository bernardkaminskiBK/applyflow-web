import { axiosClient } from "./axiosClient";
import type { Company } from "../types/company";

export async function getCompanies(): Promise<Company[]> {
  const response = await axiosClient.get<Company[]>("/companies");
  return response.data;
}
