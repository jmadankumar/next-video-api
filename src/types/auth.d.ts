import { UserDTO } from './user';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: UserDTO;
  token: string;
}

export interface RegisterRequest {
  data: UserDTO;
}

export interface RegisterResponse {
  message: string;
}
