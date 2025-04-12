import React, { useEffect, useState } from "react";

import { Container, PageTitle } from "components/commons";

import Form from "./Form";
import { formatPost } from "./utils";

import { categoriesApi } from "../../apis/categories";
import postsApi from "../../apis/posts";

const Create = ({ history }) => {
  const [post, setPost] = useState({
    title: "",
    description: "",
    user_id: 1,
    organization_id: 1,
    category_ids: [],
  });
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await postsApi.create(formatPost(post));
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    const {
      data: { categories },
    } = await categoriesApi.fetch();
    setCategories(categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Container className="p-8 lg:px-16">
      <div className="flex h-full flex-col gap-y-8">
        <PageTitle title="New blog post" />
        <Form
          {...{ handleSubmit, loading, setPost, post, history, categories }}
        />
      </div>
    </Container>
  );
};

export default Create;
