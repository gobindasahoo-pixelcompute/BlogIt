import React, { useEffect, useState } from "react";

import { Container, PageLoader } from "components/commons";
import { useHistory, useParams } from "react-router-dom";

import Category from "./Category";
import { formatDate } from "./utils";

import postsApi from "../../apis/posts";
import PageTitle from "../commons/PageTitle";

const ShowPost = () => {
  const [post, setPost] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();
  const history = useHistory();

  const fetchPostDetails = async () => {
    try {
      const { data } = await postsApi.show(slug);
      setPost(data);
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      history.push("/");
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container className="p-16">
      <Category categories={post.categories} />
      <PageTitle title={post?.title} />
      <p className="mt-2 text-xs font-bold">{post.user.name}</p>
      <p className=" text-[10px]">{formatDate(post.created_at)}</p>
      <p className="mt-8">{post.description}</p>
    </Container>
  );
};

export default ShowPost;
