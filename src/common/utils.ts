import { hash, genSalt } from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await genSalt(10);
    return await hash(password, salt);
  } catch (error) {
    throw new Error('Password hashing failed: ', error);
  }
};

export const getFilterParams = (filterParams) => {
  const filters = {};

  if (filterParams) {
    for (const [key, value] of Object.entries(filterParams)) {
      if (value !== undefined) filters[key] = value;
    }
  }

  return filters;
};
