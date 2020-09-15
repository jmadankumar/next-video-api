import { Request, Response } from 'express';
import { wrapAsyncError } from '../helper/error';
import { generateToken } from '../helper/jwt';
import AuthService from '../service/auth.service';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../types/api/auth-api';

const login = wrapAsyncError(
  async (req: Request<null, LoginResponse, LoginRequest>, res: Response<LoginResponse>) => {
    const { email, password } = req.body;
    const user = await AuthService.login(email, password);
    const token = generateToken(user);

    res.cookie('authentication_token',token);
    res.status(200).json({
      message: 'Login successfull',
      user,
      token
    });
  },
);

const register = wrapAsyncError(
  async (
    req: Request<null, RegisterResponse, RegisterRequest>,
    res: Response<RegisterResponse>,
  ) => {
    const { data } = req.body;
    await AuthService.register(data);

    res.status(200).json({
      message: 'Registration Successfull',
    });
  },
);

const AuthController = {
  login,
  register,
};

export default AuthController;
