import axios from "axios";

import routes from "../routes";

const fetch = () => axios.get(routes.categories);

const create = payload => axios.post(routes.categories, { category: payload });

export const categoriesApi = { fetch, create };
