import { Request, Response } from 'express';
import { wrapAsyncError } from '../helper/error';
import { generateToken } from '../helper/jwt';
import AuthService from '../service/auth.service';
import ChannelSubscriptionService from '../service/channel-subscription.service';
import ChannelService from '../service/channel.service';
import UserService from '../service/user.service';
import { UserDTO } from '../types/user';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  user: UserDTO;
  token: string;
}

const login = wrapAsyncError(
  async (req: Request<null, LoginResponse, LoginRequest>, res: Response<LoginResponse>) => {
    const { email, password } = req.body;
    const user = await AuthService.login(email, password);
    const subscriptions = await ChannelSubscriptionService.getAllChannelByUser({ userId: user.id });
    user.subscriptions = subscriptions;
    const token = generateToken(user);

    res.cookie('authentication_token', token, { httpOnly: true });
    res.status(200).json({
      message: 'Login successfull',
      user,
      token,
    });
  },
);

interface RegisterRequest {
  data: UserDTO;
}

interface RegisterResponse {
  message: string;
}

const register = wrapAsyncError(
  async (
    req: Request<null, RegisterResponse, RegisterRequest>,
    res: Response<RegisterResponse>,
  ) => {
    const { data } = req.body;
    const user = await AuthService.register(data);

    const channel = await ChannelService.createChannel({
      name: user.name,
      ownerId: user.id,
      createdBy: user.id,
      updatedBy: user.id,
    });

    if (!channel) {
      await UserService.removeUserFromDB(user.id);
    }

    res.status(200).json({
      message: 'Registration Successfull',
    });
  },
);

interface LogoutResponse {
  message: string;
}

const logout = wrapAsyncError(async (req: Request, res: Response<LogoutResponse>) => {
  res.clearCookie('authentication_token');
  res.status(200).json({
    message: 'Logout successfully',
  });
});

const AuthController = {
  login,
  register,
  logout,
};

export default AuthController;
