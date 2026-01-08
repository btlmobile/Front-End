import axios from 'axios';

const API_URL = 'https://unsatiating-clustered-phoenix.ngrok-free.dev';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface AuthRegisterRequest {
  username: string;
  password: string;
}

export interface AuthLoginRequest {
  username: string;
  password: string;
}

export interface AuthLoginResponse {
  token: string;
}

export interface BottleCreateSchema {
  content: string; // Changed from message to content
  type: string; // Added type
}

export interface BottleResponseSchema {
  id: string; // Changed from number to string
  type: string; // Added type
  content: string; // Changed from message to content
  creator: string; // Added creator
}

export interface StoredBottleCreateSchema {
  bottle_id: string; // Changed from number to string
}

export interface StoredBottleResponseSchema {
  id: string; // Changed from number to string
  bottle_id: string; // Added bottle_id
  bottle: BottleResponseSchema; // Added nested bottle object
}

export interface UserResponseSchema {
  username: string;
  // Add other user properties as needed based on API documentation
}

export const register = (data: AuthRegisterRequest) => {
  return api.post('/auth/register', data);
};

export const login = (data: AuthLoginRequest) => {
  return api.post<AuthLoginResponse>('/auth/login', data);
};

export const createBottle = (data: BottleCreateSchema) => {
  return api.post('/sea/bottle', data);
};

export const createAnonymousBottle = (data: BottleCreateSchema) => {
  return axios.post(`${API_URL}/sea/bottle`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getRandomBottle = () => {
  return api.get<BottleResponseSchema>('/sea/bottle');
};

export const storeBottle = (data: StoredBottleCreateSchema) => {
  return api.post('/api/store-bottle', data);
};

export const getStoredBottles = () => {
  return api.get<StoredBottleResponseSchema[]>('/api/store-bottle');
};

export const getStoredBottle = (id: string) => {
  return api.get<StoredBottleResponseSchema>(`/api/store-bottle/${id}`);
};

export const deleteStoredBottle = (id: string) => {
  return api.delete(`/api/store-bottle/${id}`);
};

export const getUserInfo = () => {
  return api.get<UserResponseSchema>('/api/me');
};

export default api;

