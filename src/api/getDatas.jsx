import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";

export const fetchDatas = async (dbName) => {
  try {
    const dataCollections = collection(db, dbName);
    const dataQuery = query(dataCollections, orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(dataQuery);
    const fetchedData = [];
    querySnapshot.forEach((doc) => {
      fetchedData.push({ id: doc.id, ...doc.data() });
    });
    return fetchedData;
  } catch (error) {
    console.log(error);
  }
};
