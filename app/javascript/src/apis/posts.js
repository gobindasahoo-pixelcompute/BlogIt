import axios from "axios";

import routes from "../routes";

const fetch = ({ category_ids, organization_id }) =>
  axios.get(routes.posts, { params: { category_ids, organization_id } });

const create = payload => axios.post(routes.posts, { post: payload });

const show = slug => axios.get(`${routes.posts}/${slug}`);

const update = (payload, slug) =>
  axios.patch(`${routes.posts}/${slug}`, { post: payload });

const destroy = slug => axios.delete(`${routes.posts}/${slug}`);

const postsApi = { fetch, create, show, update, destroy };

export default postsApi;
