import axios, {CreateAxiosDefaults} from 'axios';
import { ICreatedBook, IUpdatedBook } from '../interfaces/IBook';
import { IQueryGetAllBooks } from '../interfaces/IQueryGetAllBooks';
import { IQueryGetAllReservation } from '../interfaces/IQueryGetAllReservation';
import { ICreatedReservation } from '../interfaces/IReservation';
import { ICreatedUser, ILogin, IUser } from '../interfaces/IUser';

const user = (JSON.parse(localStorage.getItem('user') as string) as IUser);

const options: CreateAxiosDefaults = {
  baseURL: process.env.REACT_API_URL ?? 'http://localhost:3001',
  headers: {Authorization: user ? user.token : ''}
};

const api = axios.create(options);

// const login = async (data: ILogin) => api.post("/user/login", data);

export const userApi = {
  login: async (user:ILogin) => {
    const {data} = await api.post('/user/login', user);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  },
  create: async (user: ICreatedUser) => api.post('/user', user),
  getAll: async (email: string) => api.get(`/user?email=${email}`)
};

export const booksApi = {
  getAll:async (queryObj: IQueryGetAllBooks) => {
    const entrys = Object.entries(queryObj);
    const query = entrys.filter(e => e[1]).map((e) => `${e[0]}=${e[1]}`).join('&');
    return api.get(`/book?${query}`);
  },
  update: async (book: IUpdatedBook, id: number) => api.put(`/book/${id}`, book),
  delete: async (id: number) => api.delete(`/book/${id}`),
  create:async (book: ICreatedBook) => api.post('/book', book)
};

export const categoryApi = {
  getAll:async () => api.get('/category')
};

export const reservationApi = {
  create: async (reservation: ICreatedReservation) => api.post('/reservation', reservation),
  getAll: async (queryObj?: IQueryGetAllReservation) => {
    const entrys = Object.entries(queryObj ?? {});
    const query = entrys.filter(e => e[1]).map((e) => `${e[0]}=${e[1]}`).join('&');
    return api.get(`/reservation?${query}`);
  },
  getAllPendencies: async () => api.get('/reservation/pendencies'),
  patch: async (bookId: number, status: string) => api.patch(`/reservation/${bookId}`, {status})
};

export { api };
