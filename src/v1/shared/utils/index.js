import { v4 as uuid } from "uuid";

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const generateTempId = () => {
  const tempId = uuid();
  return `${tempId}`;
};
