import api from "./axios";

export const addEvent = async (data: any) => {
  const response = await api.post("/event/add", data);
  return response.data;
};

export const fetchEvents = async (page: number) => {
  const response = await api.get("/event/fetch", {
    params: { page },
  });
  return response.data?.data;
};
