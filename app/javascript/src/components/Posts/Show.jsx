import React, { useEffect, useState } from "react";

import { Container } from "components/commons";
import { useParams } from "react-router-dom";

import { postsApi } from "../../apis/posts";

const ShowPost = () => {
  const [post, setPost] = useState({});
  const { slug } = useParams();

  const fetchPost = async () => {
    try {
      const {
        data: { post },
      } = await postsApi.show(slug);
      setPost(post);
    } catch (error) {
      logger.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <Container>
      <div>
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="mt-8">{post.description}</p>
      </div>
    </Container>
  );
};

export default ShowPost;
