import React from "react";

import { Container } from "components/commons";
import { useLocation } from "react-router-dom";
import { getFromLocalStorage } from "utils/storage";

import Category from "./Category";
import { formatDate } from "./utils";

import { avatar } from "../../assets";
import PageTitle from "../commons/PageTitle";

const PreviewPost = () => {
  const location = useLocation();

  const post = location.state?.post;
  const userName = getFromLocalStorage("authUserName");

  return (
    <Container goback className="p-16">
      <Category categories={post?.categories} />
      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
          <PageTitle title={post?.title} />
          {post?.status === "draft" && (
            <div className="my-auto flex h-5 items-center justify-center  rounded-full border border-red-400 px-6 text-xs font-semibold capitalize text-red-400 shadow-xl">
              {post?.status}
            </div>
          )}
        </div>
      </div>
      <div className="flex w-fit items-center justify-center gap-2">
        <img alt="Avatar" className="h-8 w-8" src={avatar} />
        <div className="mb-2 text-start">
          <p className="mt-2 text-xs font-bold">{userName}</p>
          <p className=" text-[10px]">{formatDate(Date.now())}</p>
        </div>
      </div>
      <p className="mt-8">{post.description}</p>
    </Container>
  );
};

export default PreviewPost;
