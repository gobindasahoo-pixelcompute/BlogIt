import React, { useEffect, useState } from "react";

import { PageTitle } from "./commons";
import NavBar from "./NavBar";
import Card from "./Posts/Card";

import { postsApi } from "../apis/posts";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    const {
      data: { posts: blogPosts },
    } = await postsApi.fetch;
    setPosts(blogPosts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex">
      <NavBar />
      <div className="w-full pl-4">
        <PageTitle title="Blog posts" />
        <div className="mt-6">
          {posts.map(post => (
            <Card key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
