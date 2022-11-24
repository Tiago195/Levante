import axios, {CreateAxiosDefaults} from "axios";
import { IUpdatedBook } from "../interfaces/IBook";
import { IQueryGetAllBooks } from "../interfaces/IQueryGetAllBooks";
import { ILogin, IUser } from "../interfaces/IUser";

const options: CreateAxiosDefaults = {
  baseURL: process.env.REACT_API_URL ?? "http://localhost:3001",
  headers: {Authorization: (JSON.parse(localStorage.getItem("user") as string) as IUser).token}
};

const api = axios.create(options);

// const login = async (data: ILogin) => api.post("/user/login", data);

export const userApi = {
  login: async (user:ILogin) => {
    const {data} = await api.post("/user/login", user);
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  }
};

export const booksApi = {
  getAll:async (queryObj: IQueryGetAllBooks) => {
    const entrys = Object.entries(queryObj);
    const query = entrys.filter(e => e[1]).map((e) => `${e[0]}=${e[1]}`).join("&");
    return api.get(`/book?${query}`);
  },
  update: async (book: IUpdatedBook, id: number) => api.put(`/book/${id}`, book),
  delete: async (id: number) => api.delete(`/book/${id}`),
};

export const categoryApi = {
  getAll:async () => api.get("/category")
};

export { api };