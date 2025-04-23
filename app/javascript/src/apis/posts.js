import axios from "axios";

const fetch = ({ category_ids, organization_id }) =>
  axios.get("/posts", { params: { category_ids, organization_id } });

const create = payload => axios.post("/posts", { post: payload });

const show = slug => axios.get(`/posts/${slug}`);

const postsApi = { fetch, create, show };

export default postsApi;
