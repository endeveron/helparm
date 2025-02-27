import axios from 'axios';

const ipApi1BaseUrl = process.env.IP_API_1_BASE_URL;
const ipApi2BaseUrl = process.env.IP_API_2_BASE_URL;
export const ipApi1Key = process.env.IP_API_1_KEY;

const axiosIpApi1 = axios.create({
  baseURL: ipApi1BaseUrl,
});

const axiosIpApi2 = axios.create({
  baseURL: ipApi2BaseUrl,
});

export { axiosIpApi1, axiosIpApi2 };
