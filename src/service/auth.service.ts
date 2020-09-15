import { comparePasswordHash, genPasswordHash } from '../helper/auth';
import UserModel from '../models/user.model';
import { AccessDeniedError, BadRequestError } from '../helper/error';
import { UserDTO } from '../types/user';
import UserDTOUtil from '../util/user.util';
import { parseGender } from '../util/gender.util';

const login = async (email: string, password: string): Promise<UserDTO> => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new AccessDeniedError('Invalid email or password');
  }

  const isPasswordValid = await comparePasswordHash(password, user.password);

  if (!isPasswordValid) {
    throw new AccessDeniedError('Invalid email or password');
  }

  return UserDTOUtil.fromIUser(user);
};

const register = async (userDTO: UserDTO): Promise<boolean> => {
  if (!userDTO.password) {
    throw new BadRequestError('Please enter the password');
  }
  const passwordHash = await genPasswordHash(userDTO.password);

  const userInDB = await UserModel.findOne({ email: userDTO.email });

  if (userInDB) {
    throw new BadRequestError('Email already registered');
  }

  const user = await UserModel.create({
    ...userDTO,
    password: passwordHash,
    authProvider: 'local',
    gender: parseGender(userDTO.gender),
  });
  if (!user) {
    throw new BadRequestError('Unable to register. Please try again');
  }
  return true;
};

const AuthService = {
  login,
  register,
};

export default AuthService;
