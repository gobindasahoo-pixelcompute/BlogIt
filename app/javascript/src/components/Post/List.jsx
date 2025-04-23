import React, { useEffect, useState } from "react";

import { NoData } from "@bigbinary/neetoui";
import Logger from "js-logger";
import { Link } from "react-router-dom";
import { getFromLocalStorage } from "utils/storage";

import Card from "./Card";

import postsApi from "../../apis/posts";
import usePostsStore from "../../stores/usePostsStore";
import { Button, PageLoader, PageTitle } from "../commons";

const List = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { clickedCategories } = usePostsStore();
  const organization_id = getFromLocalStorage("authUserOrganizationId");

  const fetchPosts = async () => {
    try {
      const { data } = await postsApi.fetch({
        category_ids: clickedCategories,
        organization_id,
      });
      setPosts(data);
    } catch (error) {
      Logger.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [clickedCategories]);

  if (isLoading) return <PageLoader />;

  return (
    <div className="my-4 h-screen w-full p-6 lg:p-12">
      <div className="mb-4 flex justify-between">
        <PageTitle title="Blog posts" />
        <Link className="my-auto mr-4" to="/posts/create">
          <Button buttonText="Add new blog post" />
        </Link>
      </div>
      <div className="h-[90%] overflow-y-scroll">
        {posts.length > 0 ? (
          posts.map(post => <Card key={post.id} {...post} />)
        ) : (
          <div className="flex h-full items-center justify-center">
            <NoData description="No post available" />
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
