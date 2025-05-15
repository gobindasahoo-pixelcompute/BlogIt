import axios from "axios";

const create = (slug, type) => axios.post(`/posts/${slug}/vote`, { type });

export const votesApi = { create };
