import axios from 'axios';
const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
});
const useAxiosPublic = () => {
  return axiosSecure;
};

export default useAxiosPublic;
