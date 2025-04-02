import React, { useState } from "react";

import { postsApi } from "apis/posts";
import { Container, PageTitle } from "components/commons";

import Form from "./Form";

const CreatePost = ({ history }) => {
  const [post, setPost] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await postsApi.create(post);
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="flex h-full flex-col gap-y-8">
        <PageTitle title="New blog post" />
        <Form {...{ handleSubmit, loading, post, setPost }} />
      </div>
    </Container>
  );
};

export default CreatePost;
