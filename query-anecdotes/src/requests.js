import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3001" });

export const getAnecdotes = () => {
  return api.get("/anecdotes").then((res) => res.data);
};

export const createAnecdote = (anecdote) => {
  return api.post("/anecdotes", anecdote).then((res) => res.data);
};

export const updateAnecdote = (anecdote) => {
  return api.put(`/anecdotes/${anecdote.id}`, anecdote).then((res) => res.data);
};
