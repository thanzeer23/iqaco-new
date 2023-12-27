import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../firebase/config";

export const getImages = async (pageId, containerName) => {
  try {
    const storageRef = ref(storage, `${pageId}/${containerName}`);
    const result = await listAll(storageRef);

    const downloadURLs = await Promise.all(
      result.items.map(async (item) => {
        const imageURL = await getDownloadURL(item);

        return { imageURL, path: item.fullPath }; // Optionally include the file name
      })
    );

    // Return or handle the image files here

    return downloadURLs;
  } catch (error) {
    console.error("Error fetching images:", error);
    return []; // Return an empty array or handle the error accordingly
  }
};
