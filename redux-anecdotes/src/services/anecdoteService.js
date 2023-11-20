import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/anecdotes",
});

const getAll = async () => {
  const response = await api.get("/");
  return response.data;
};

const create = async (content) => {
  const anecdote = { content, important: false };
  const response = await api.post("/", anecdote);
  return response.data;
};

const update = async (anecdote) => {
  const response = await api.put(`/${anecdote.id}`, anecdote);
  return response.data;
};

const anecdoteService = {
  getAll,
  create,
  update,
};

export default anecdoteService;
