import { axiosClient } from "./axiosClient";
import type { ContactPerson } from "../types/contactPerson";

export async function getContactPersons(): Promise<ContactPerson[]> {
  const response = await axiosClient.get<ContactPerson[]>("/contact-persons");
  return response.data;
}
