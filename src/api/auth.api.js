import api from "./axios";

export const loginApi = async (data) => {
    return await api.post("/login", data);
}
  