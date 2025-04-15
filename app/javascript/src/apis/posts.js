import axios from "axios";

const fetch = ({ category_ids }) =>
  axios.get("/posts", { params: { category_ids } });

const create = payload => axios.post("/posts", { post: payload });

const show = slug => axios.get(`/posts/${slug}`);

const postsApi = { fetch, create, show };

export default postsApi;
