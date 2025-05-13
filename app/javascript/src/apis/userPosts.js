import axios from "axios";

const fetch = () => axios.get("/user_posts");

export const userPostsApi = { fetch };
