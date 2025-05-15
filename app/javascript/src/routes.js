const routes = {
  root: "/",
  login: "/login",
  signup: "/signup",
  userPosts: "/user_posts",
  post: {
    Edit: "/posts/:slug/edit",
    Create: "/posts/create",
    Show: "/posts/:slug/show",
    Preview: "/posts/preview",
  },
  posts: "/posts",
  session: "/session",
  users: "/users",
  categories: "/categories",
  organization: "/organizations",
};
export default routes;
