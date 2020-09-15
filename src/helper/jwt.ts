import jwt, { Algorithm } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_ALGORITHM = process.env.JWT_ALGORITHM as Algorithm;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;
const JWT_ISSUER = process.env.JWT_ISSUER;

export const generateToken = (data: any): string => {
  return jwt.sign(data, JWT_SECRET, {
    algorithm: JWT_ALGORITHM,
    expiresIn: JWT_EXPIRATION,
    issuer: JWT_ISSUER,
  });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET, {
    algorithms: [JWT_ALGORITHM],
    issuer: JWT_ISSUER,
  });
};
