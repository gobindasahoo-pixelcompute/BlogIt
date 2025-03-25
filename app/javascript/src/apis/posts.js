import axios from "axios";

const fetch = axios.get("/posts");

export const postsApi = { fetch };
