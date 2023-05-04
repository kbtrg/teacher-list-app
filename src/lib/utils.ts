import axios from "axios";

export const _axios = axios.create({
  baseURL: 'https://us-central1-compass-hr.cloudfunctions.net/mock/facilitators',
})