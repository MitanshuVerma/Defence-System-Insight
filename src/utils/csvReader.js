import Papa from "papaparse";

export async function loadCSV(path) {
  const response = await fetch(path);
  const text = await response.text();

  const result = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
  });

  return result.data;
}