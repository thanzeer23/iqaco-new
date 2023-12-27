import { ref, deleteObject } from "firebase/storage";
import { storage } from "../firebase/config";

export const deleteImage = async (imagepath) => {
  try {
    const imageRef = ref(storage, imagepath);
    await deleteObject(imageRef);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
