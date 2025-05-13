import React, { useEffect, useState } from "react";

import { Edit } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";
import { Container, PageLoader } from "components/commons";
import { useHistory, useParams, Link } from "react-router-dom";

import Category from "./Category";
import { formatDate } from "./utils";

import postsApi from "../../apis/posts";
import { avatar } from "../../assets";
import { getFromLocalStorage } from "../../utils/storage";
import PageTitle from "../commons/PageTitle";

const ShowPost = () => {
  const [post, setPost] = useState({});
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();
  const history = useHistory();
  const userId = getFromLocalStorage("authUserId");

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
  const isOwner = Number(userId) === post?.user?.id;

  useEffect(() => {
    fetchPostDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container className="p-16">
      <Category categories={post.categories} />
      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
          <PageTitle title={post?.title} />
          {post?.status === "draft" && (
            <div className="my-auto flex h-5 items-center justify-center  rounded-full border border-red-400 px-6 text-xs font-semibold capitalize text-red-400 shadow-xl">
              {post?.status}
            </div>
          )}
        </div>
        {isOwner && (
          <Link className="my-auto" to={`/posts/${slug}/edit`}>
            <Button
              icon={Edit}
              style="tertiary"
              tooltipProps={{ content: "Edit", position: "right" }}
            />
          </Link>
        )}
      </div>
      <div className="flex w-fit items-center justify-center gap-2">
        <img alt="Avatar" className="h-8 w-8" src={avatar} />
        <div className="mb-2 text-start">
          <p className="mt-2 text-xs font-bold">{post.user.name}</p>
          <p className=" text-[10px]">{formatDate(post.updated_at)}</p>
        </div>
      </div>
      <p className="mt-8">{post.description}</p>
    </Container>
  );
};

export default ShowPost;
