import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const addOrUpdateDocument = async (dbName, id, data) => {
  try {
    if (id) {
      const docRef = doc(db, dbName, id.toString());
      if (!data) {
        console.log("No data provided for update.");
        return null;
      }

      if (!id) {
        const collectionRef = collection(db, dbName);
        const newDocRef = await addDoc(collectionRef, data);
        console.log("Document added with ID:", newDocRef.id);
        return newDocRef;
      } else {
        await updateDoc(docRef, data);
        console.log("Document updated with ID:", id);
        return docRef;
      }
    } else {
      console.log("Invalid ID provided.");
      return null;
    }
  } catch (error) {
    console.error("Error adding/updating document:", error);
    return null;
  }
};
