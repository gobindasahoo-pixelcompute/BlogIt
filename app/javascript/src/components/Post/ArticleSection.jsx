import React, { useState } from "react";

import { Delete } from "@bigbinary/neeto-icons";
import { Dropdown, Button, Alert } from "@bigbinary/neetoui";
import { isEmpty, isNil } from "ramda";

import { getCategoryIds } from "./utils";

const ArticleSection = ({
  filterState,
  setFilterState,
  posts,
  selectedPosts,
  allPostsCount,
  onBulkStatusChange,
  onBulkDelete,
  updateQueryParams,
}) => {
  const isFiltering =
    !isEmpty(filterState.title) ||
    !isEmpty(filterState.categories) ||
    !isEmpty(filterState.status);

  const statusOptions = [
    {
      label: "Draft",
      value: "draft",
    },
    {
      label: "Publish",
      value: "publish",
    },
  ];
  const [selectedStatus, setSelectedStatus] = useState("Change status");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const isBulkActionActive = !isEmpty(selectedPosts);

  const onClose = () => setIsAlertOpen(false);

  const handleCategoryRemove = id => {
    const updatedCategories = filterState.categories.filter(
      category => category.id !== id
    );

    setFilterState(prev => ({
      ...prev,
      categories: updatedCategories,
    }));

    updateQueryParams({
      title: filterState.title,
      status: filterState.status,
      categories: getCategoryIds(updatedCategories),
    });
  };

  const handleStatusRemove = () => {
    setFilterState(prev => ({
      ...prev,
      status: null,
    }));

    updateQueryParams({
      title: filterState.title,
      categories: getCategoryIds(filterState.categories),
      status: null,
    });
  };

  if (isBulkActionActive) {
    return (
      <div className="flex gap-4">
        <p className="text-xl">
          <span className="font-semibold">
            {" "}
            {`${selectedPosts.length} posts selected `}
          </span>{" "}
          {`from ${allPostsCount} posts`}
        </p>
        <div className="flex gap-4">
          <div className="flex overflow-hidden rounded-md bg-gray-200">
            <Button
              className="rounded-none bg-gray-200 capitalize text-black"
              label={selectedStatus}
              onClick={() => onBulkStatusChange(selectedStatus)}
            />
            <Dropdown
              className="p-2"
              buttonProps={{
                className: "rounded-none bg-gray-200 text-black",
              }}
            >
              <Dropdown.Menu>
                {statusOptions.map(status => (
                  <Dropdown.MenuItem
                    className="p-2 text-sm"
                    key={status.value}
                    value={status.value}
                    onClick={() => setSelectedStatus(status.value)}
                  >
                    {status.label}
                  </Dropdown.MenuItem>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Button
            className="rounded bg-red-100 px-3 py-1 text-sm text-red-400"
            icon={Delete}
            label="Delete"
            onClick={() => setIsAlertOpen(true)}
          />
          <Alert
            isOpen={isAlertOpen}
            message={`All the ${selectedPosts.length} posts will be deleted. This action can't be undone.`}
            size="medium"
            submitButtonLabel="Delete all"
            title="You are deleting all selected posts"
            onClose={onClose}
            onSubmit={onBulkDelete}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between gap-4 lg:flex-row lg:items-center">
      {isFiltering ? (
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <p className="text-xl font-semibold">
            {`${posts.length} results ${
              isNil(filterState.title) ? "" : ` for "${filterState.title}"`
            }`}
          </p>
          <div className="flex flex-wrap gap-2">
            {filterState.categories.map(category => (
              <div
                className="my-auto flex h-5 items-center justify-center rounded-full border px-4 text-xs font-semibold capitalize shadow-xl"
                key={category.id}
              >
                {category.name}
                <button
                  className="ml-2"
                  onClick={() => handleCategoryRemove(category.id)}
                >
                  <i className="ri-close-line" />
                </button>
              </div>
            ))}
            {filterState.status && (
              <div className="my-auto flex h-5 items-center justify-center rounded-full border border-red-400 px-4 text-xs font-semibold capitalize text-red-400 shadow-xl">
                {filterState.status}
                <button className="ml-2" onClick={handleStatusRemove}>
                  <i className="ri-close-line" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-xl font-semibold">{allPostsCount} articles</p>
      )}
    </div>
  );
};

export default ArticleSection;
