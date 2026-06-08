import { axiosClient } from "./axiosClient";
import type { JobApplication } from "../types/jobApplication";

export async function getJobApplications(): Promise<JobApplication[]> {
  const response = await axiosClient.get<JobApplication[]>("/job-applications");
  return response.data;
}
