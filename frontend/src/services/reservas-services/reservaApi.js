import axios from "axios";

const API_URL = import.meta.env.API_URL;

export const GetReservas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const CriarReserva = async (reserva) => {
  const response = await axios.post(API_URL, reserva);
  return response.data;
};

export const CancelarReserva = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
