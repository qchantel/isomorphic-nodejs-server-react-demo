import axios from "axios";

export const fetchUrl = async (url) => await axios.get(url);
