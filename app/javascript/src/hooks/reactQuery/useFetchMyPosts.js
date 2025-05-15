import { QUERY_KEYS } from "constants/query";

import { userPostsApi } from "apis/userPosts";
import { useQuery } from "react-query";

export const useFetchMyPosts = params =>
  useQuery({
    queryKey: [QUERY_KEYS.USER_POSTS, params],
    queryFn: () => userPostsApi.fetch(params),
  });
