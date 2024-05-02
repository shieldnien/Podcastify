import axios from "axios";

export const BASE_URL = `https://api.allorigins.win`;

const options = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const fetchFromApi = async (url) => {
  const { data } = await axios
    .get(`${BASE_URL}/${url}`, options)

  return data;
};
