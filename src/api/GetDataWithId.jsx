import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const getDataWithId = async (dbName, id) => {
  const dataRef = doc(db, dbName, id);
  const dataSnap = await getDoc(dataRef);
  const datas = [];
  if (dataSnap.exists()) {
    datas.push({ id: dataSnap.id, ...dataSnap.data() });
    return { datas, success: true };
  } else {
    return { success: false };
  }
};
