import { logoutUser } from "../../infrastructure/storage/userStorage";

export const logoutUseCase = () => {
  logoutUser();
};