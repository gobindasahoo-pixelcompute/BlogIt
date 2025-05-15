import React, { useEffect, useState } from "react";

import { Container, PageTitle } from "components/commons";
import { useParams } from "react-router-dom";

import Form from "./Form";
import Header from "./Header";
import { formatPost, getCategoryIds } from "./utils";

import { categoriesApi } from "../../apis/categories";
import postsApi from "../../apis/posts";

const EditPost = ({ history }) => {
  const { slug } = useParams();

  const [post, setPost] = useState({});
  const [initialPost, setInitialPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    const updatedPost = {
      title: post.title,
      description: post.description,
      user_id: post?.user?.id,
      organization_id: post?.organization?.id,
      category_ids: getCategoryIds(post.categories),
      status: post?.status,
    };

    try {
      await postsApi.update(formatPost(updatedPost), slug);
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const fetchPostDetails = async () => {
    try {
      const { data } = await postsApi.show(slug);
      setPost(data);
      setInitialPost(data);
    } catch (error) {
      logger.error(error);
      history.push("/");
    }
  };

  const fetchCategories = async () => {
    const {
      data: { categories },
    } = await categoriesApi.fetch();
    setCategories(categories);
  };

  const isCategoriesChanged = () => {
    if (!initialPost?.categories || !post?.categories) return false;

    const sortedInitialCategoriesId = getCategoryIds(
      initialPost.categories
    ).sort();

    const sortedPostCategoriesId = getCategoryIds(post.categories).sort();

    return (
      JSON.stringify(sortedInitialCategoriesId) !==
      JSON.stringify(sortedPostCategoriesId)
    );
  };

  const isButtonDisabled =
    post?.title !== initialPost?.title ||
    post?.description !== initialPost?.description ||
    isCategoriesChanged() ||
    post?.status !== initialPost?.status;

  useEffect(() => {
    fetchPostDetails();
    fetchCategories();
  }, []);

  return (
    <Container className="p-8 lg:px-16">
      <div className="flex h-full flex-col gap-y-8">
        <div className="flex justify-between">
          <PageTitle title="Edit blog post" />
          <Header
            {...{
              loading,
              setPost,
              post,
              initialPost,
              handleSubmit,
              slug,
              isButtonDisabled,
            }}
          />
        </div>
        <Form {...{ setPost, post, categories }} />
      </div>
    </Container>
  );
};

export default EditPost;
