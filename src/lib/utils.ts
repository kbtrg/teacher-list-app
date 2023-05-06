import axios from "axios";

export const _axios = axios.create({
  baseURL: 'https://us-central1-compass-hr.cloudfunctions.net/mock/facilitators',
})

export const range = (start: number, end: number): number[] => {
  if (start > end) return [];
  return [...Array(end - start + 1)].map((_, key) => key + start);
};
