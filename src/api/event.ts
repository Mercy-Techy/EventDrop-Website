import { api } from "./axios";

export const addEvent = async (data: any) => {
  const response = await api.post("/event/add", data);
  return response.data;
};

export const uploadImage = async ({
  form,
  eventId,
}: {
  form: any;
  eventId: string;
}) => {
  const response = await api.post(`/event/upload-image/${eventId}`, form);
  return response.data;
};

export const fetchEvents = async (page: number) => {
  const response = await api.get("/event/fetch", {
    params: { page },
  });
  return response.data?.data;
};

export const fetchEventById = async (id: string) => {
  const response = await api.get(`/event/fetch-event-by-id/${id}`);
  return response.data?.data;
};

export const fetchEventImages = async (page: number, eventId: string) => {
  const response = await api.get(`/event/fetch-images/${eventId}`, {
    params: { page },
  });
  return response.data?.data;
};
