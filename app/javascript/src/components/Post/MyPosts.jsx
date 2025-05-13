import React, { useEffect, useState } from "react";

import { MenuHorizontal } from "@bigbinary/neeto-icons";
import { Table, Checkbox, Button, Dropdown } from "@bigbinary/neetoui";
import { PageTitle } from "components/commons";
import { Link } from "react-router-dom";

import { formatPublishTime } from "./utils";

import postsApi from "../../apis/posts";
import { userPostsApi } from "../../apis/userPosts";
import { Container } from "../commons";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    const { data } = await userPostsApi.fetch({ page: currentPage });
    setPosts(data);
  };

  const handleSelectRow = id => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === posts.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(posts.map(post => post.id));
    }
  };

  const handleAction = async (action, slug) => {
    try {
      if (action === "delete") {
        await postsApi.destroy(slug);
      } else {
        await postsApi.update({ status: action }, slug);
      }
      fetchPosts();
    } catch (error) {
      logger.log(error);
    }
  };

  const columnData = [
    {
      title: (
        <Checkbox
          checked={selectedRows.length === posts.length && posts.length > 0}
          indeterminate={
            selectedRows.length > 0 && selectedRows.length < posts.length
          }
          onChange={handleSelectAll}
        />
      ),
      dataIndex: "checkBox",
    },
    { title: "Title", dataIndex: "title" },
    { title: "Category", dataIndex: "category" },
    { title: "Last Published At", dataIndex: "published_at" },
    { title: "Status", dataIndex: "status" },
    { title: "", dataIndex: "action" },
  ];

  const rowData = posts.map(post => ({
    key: post.id,
    checkBox: (
      <Checkbox
        checked={selectedRows.includes(post.id)}
        onChange={() => handleSelectRow(post.id)}
      />
    ),
    title: (
      <Link to={`/posts/${post.slug}/edit`}>
        <Button
          className="text-green-600"
          label={post.title}
          style="tertiary"
          tooltipProps={{ content: post.title, position: "top" }}
        />
      </Link>
    ),
    category: post.categories.map(category => category.name).join(", "),
    published_at: post.updated_at
      ? formatPublishTime(post.updated_at)
      : "Not published",
    status: post.status === "draft" ? "Draft" : "Published",
    action: (
      <Dropdown buttonStyle="tertiary" icon={MenuHorizontal} position="right">
        <div className="p-2">
          <Button
            label={post?.status === "draft" ? "Publish" : "Unpublish"}
            style="tertiary"
            onClick={() =>
              handleAction(
                post.status === "draft" ? "publish" : "draft",
                post?.slug
              )
            }
          />
          <hr />
          <Button
            className="text-red-500"
            label="Delete"
            style="tertiary"
            onClick={() => handleAction("delete", post.slug)}
          />
        </div>
      </Dropdown>
    ),
  }));

  return (
    <Container className="p-8 lg:px-16">
      <PageTitle title="My blog posts" />
      <p className="my-4 text-xl font-semibold">{posts.length} articles</p>
      <div className="w-[90%]">
        <Table
          columnData={columnData}
          currentPageNumber={currentPage}
          defaultPageSize={pageSize}
          handlePageChange={page => setCurrentPage(page)}
          rowData={rowData}
        />
      </div>
    </Container>
  );
};

export default MyPosts;
