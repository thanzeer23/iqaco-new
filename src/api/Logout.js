import { auth } from "../firebase/Config";

export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.log(error);
  }
};
