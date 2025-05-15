import React from "react";

import { MenuHorizontal } from "@bigbinary/neeto-icons";
import { Button, Checkbox, Dropdown } from "@bigbinary/neetoui";
import { isEmpty } from "ramda";
import { Link } from "react-router-dom";

import { formatPublishTime } from "../Post/utils";

const truncate = (str, max = 35) =>
  str.length > max ? `${str.slice(0, 35)}...` : str;

const getColumnData = ({ handleSelectAll, selectedRows, posts }) => [
  {
    title: (
      <Checkbox
        checked={selectedRows.length === posts.length && !isEmpty(posts)}
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

const getRowData = ({ posts, selectedRows, handleSelectRow, handleAction }) =>
  posts.map(post => ({
    id: post.id,
    checkBox: (
      <Checkbox
        checked={selectedRows.includes(post.slug)}
        onChange={() => handleSelectRow(post.slug)}
      />
    ),
    title: (
      <Link to={`/posts/${post.slug}/edit`}>
        <Button
          className="text-green-600"
          label={truncate(post.title)}
          style="tertiary"
          tooltipProps={{ content: post.title, position: "top" }}
        />
      </Link>
    ),
    category: post.categories.map(category => category.name).join(", "),
    published_at: post.published_at
      ? formatPublishTime(post.published_at)
      : "Not published",
    status: post.status === "draft" ? "Draft" : "Published",
    action: (
      <Dropdown buttonStyle="tertiary" icon={MenuHorizontal} position="right">
        <div className="p-2">
          <Button
            label={post.status === "draft" ? "Publish" : "Unpublish"}
            style="tertiary"
            onClick={() =>
              handleAction(
                post.status === "draft" ? "publish" : "draft",
                post.slug
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

export { getColumnData, getRowData };
