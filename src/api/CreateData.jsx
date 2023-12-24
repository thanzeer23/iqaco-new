import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
export const createData = async (dbName, data) => {
  const timestamp = Timestamp.fromDate(new Date());

  if (data) {
    try {
      const docRef = await addDoc(collection(db, dbName), {
        data,
        createdAt: timestamp,
      });
      return docRef;
    } catch (error) {
      console.log(error);
    }
  }
};
