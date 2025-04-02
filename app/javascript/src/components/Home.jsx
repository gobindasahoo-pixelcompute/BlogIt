import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Button, Container, PageTitle } from "./commons";
import Card from "./Posts/Card";

import { postsApi } from "../apis/posts";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    const {
      data: { posts: blogPosts },
    } = await postsApi.fetch();
    setPosts(blogPosts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Container>
      <div className="flex h-full w-full flex-col p-6">
        <div className="flex justify-between">
          <PageTitle title="Blog posts" />
          <Link to="/posts/create">
            <Button buttonText="Add new blog post" />
          </Link>
        </div>
        <div className="mt-6">
          {posts.map(post => (
            <Card key={post.id} {...post} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Home;
