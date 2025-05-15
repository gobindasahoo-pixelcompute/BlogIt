import axios from "axios";

import routes from "../routes";

const fetch = () => axios.get(routes.organization);

const organizationsApi = { fetch };

export default organizationsApi;
