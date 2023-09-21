import { parse } from "papaparse";

export const parseDataFile = async (file: File) => {
  if (!File) return undefined;
  return new Promise((resolve, reject) =>
    parse(file, {
      header: true,
      dynamicTyping: true,
      complete: function (results) {
        console.log(results);
        resolve(results);
      },
      error: function (err) {
        console.log(err);
        reject(err);
      },
    })
  );
};
