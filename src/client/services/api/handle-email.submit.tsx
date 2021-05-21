import { AxiosResponse } from "axios";
import { axios } from "src/config/client-axios";

export const handlePreLaunchEmailSubmit = async (email: string): Promise<AxiosResponse> => {
  return axios.post("/api/notify-email", { email });
};
