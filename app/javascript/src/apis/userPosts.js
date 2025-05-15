import axios from "axios";

import routes from "../routes";

const fetch = params => axios.get(routes.userPosts, { params });

export const userPostsApi = { fetch };
