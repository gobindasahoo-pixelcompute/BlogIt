import React, { useEffect, useState } from "react";

import { Container, PageTitle } from "components/commons";

import Form from "./Form";
import Header from "./Header";
import { formatPost } from "./utils";

import { categoriesApi } from "../../apis/categories";
import postsApi from "../../apis/posts";
import { getFromLocalStorage } from "../../utils/storage";

const CreatePost = ({ history }) => {
  const userId = getFromLocalStorage("authUserId");
  const organizationId = getFromLocalStorage("authUserOrganizationId");

  const [post, setPost] = useState({
    title: "",
    description: "",
    user_id: userId,
    organization_id: organizationId,
    category_ids: [],
    status: "draft",
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

  const isPostEmpty =
    !post.title.trim() || !post.description.trim() || !post.category_ids.length;

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Container className="p-8 lg:px-16">
      <div className="flex h-full flex-col gap-y-8">
        <div className="flex justify-between">
          <PageTitle title="New blog post" />
          <Header {...{ loading, setPost, post, handleSubmit, isPostEmpty }} />
        </div>
        <Form
          buttonText="Submit"
          {...{ loading, setPost, post, history, categories }}
        />
      </div>
    </Container>
  );
};

export default CreatePost;
