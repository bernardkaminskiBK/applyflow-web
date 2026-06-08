import { axiosClient } from "./axiosClient";
import type { ApplicationEvent } from "../types/applicationEvent";

export async function getApplicationEvents(): Promise<ApplicationEvent[]> {
  const response = await axiosClient.get<ApplicationEvent[]>(
    "/application-events",
  );
  return response.data;
}
