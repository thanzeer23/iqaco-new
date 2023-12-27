import { list, listAll, ref } from "firebase/storage";
import { storage } from "../firebase/config";
import { fetchDatas } from "./getDatas";

export const getFiles = async () => {
  const storageRef = ref(storage, "gs://iqac-new.appspot.com");
  const result = await listAll(storageRef);

  const folders = result.prefixes.map((prefix) => prefix.fullPath);
  let filteredContainer = [];
  const promises = folders.map(async (folderPath) => {
    const testRef = ref(storage, folderPath);
    const resultin = await listAll(testRef);

    const testin = resultin.prefixes.map((prefix) => prefix.fullPath);
    const testinArray = testin.map((data) => data.split("/"));
    filteredContainer.push(...testinArray);
    return filteredContainer; // Return the updated container array
  });
  const resolvedContainers = await Promise.all(promises);

  filteredContainer = resolvedContainers.reduce(
    (acc, curr) => acc.concat(curr),
    []
  );

  // Merge all resolved containers into a single array
  filteredContainer = [...new Set(filteredContainer)];

  const pageData = await fetchDatas("pages");
  const filteredPageData = pageData.filter((data) => folders.includes(data.id));

  let totalImageCount = 0;

  const count = filteredContainer.map(async (data) => {
    const testIn = ref(storage, `${data[0]}/${data[1]}`);
    const resultin = await listAll(testIn);
    return resultin.items.length;
  });

  var testCount = await Promise.all(count);
  totalImageCount = testCount.reduce((num1, num2) => {
    return num1 + num2;
  }, 0);

  return { filteredPageData, filteredContainer, totalImageCount };
};
