import axios from "axios";

const fetch = ({ category_ids, organization_id }) =>
  axios.get("/posts", { params: { category_ids, organization_id } });

const create = payload => axios.post("/posts", { post: payload });

const show = slug => axios.get(`/posts/${slug}`);

const update = (payload, slug) =>
  axios.patch(`/posts/${slug}`, { post: payload });

const destroy = slug => axios.delete(`/posts/${slug}`, slug);

const postsApi = { fetch, create, show, update, destroy };

export default postsApi;
