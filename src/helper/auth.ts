import bcrypt from 'bcrypt';

export const genPasswordHash = async (password: string): Promise<string> => {
  const SALT_ROUNDS = 10;
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePasswordHash = async (
  password: string,
  passwordHash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, passwordHash);
};
