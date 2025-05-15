import React, { useEffect, useState } from "react";

import { filterNonNull } from "@bigbinary/neeto-cist";
import { Filter } from "@bigbinary/neeto-icons";
import { Checkbox, Button, Dropdown, Toastr } from "@bigbinary/neetoui";
import { categoriesApi } from "apis/categories";
import postsApi from "apis/posts";
import { PageTitle } from "components/commons";
import { useFetchMyPosts } from "hooks/reactQuery/useFetchMyPosts";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { isEmpty } from "ramda";
import { useHistory } from "react-router-dom";
import { buildUrl } from "utils/url";

import ArticleSection from "./ArticleSection";
import Filters from "./Filters";

import routes from "../../routes";
import { Container } from "../commons";
import PostTable from "../Table";
import { getColumnData, getRowData } from "../Table/getTableData";

const MyPosts = () => {
  const queryParams = useQueryParams();
  const filterParams = {
    title: queryParams?.title || null,
    category_ids: queryParams?.categories?.map(id => Number(id)) || [],
    status: queryParams?.status || null,
  };

  const [selectedRows, setSelectedRows] = useState([]);
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filterState, setFilterState] = useState({
    title: null,
    categories: [],
    status: null,
  });

  const history = useHistory();

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategories(categories);
    } catch (error) {
      logger.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!isEmpty(categories)) {
      setFilterState({
        title: filterParams.title || null,
        categories:
          categories.filter(category =>
            filterParams.category_ids.includes(category.id)
          ) || [],
        status: filterParams.status || null,
      });
    }
  }, [categories]);

  const updateQueryParams = useFuncDebounce(newParams => {
    setFilterState({
      title: newParams.title || null,
      categories: categories.filter(category =>
        newParams.categories.includes(category.id)
      ),
      status: newParams.status || null,
    });
    history.replace(buildUrl(routes.userPosts, filterNonNull(newParams)));
  });

  const { data, isLoading, refetch } = useFetchMyPosts(filterParams);
  const posts = data?.data || [];

  const handleSelectAll = () => {
    if (selectedRows.length === posts.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(posts.map(post => post.slug));
    }
  };

  const baseColumns = getColumnData({
    ...{ handleSelectAll, selectedRows, posts },
  });

  const [visibleColumns, setVisibleColumns] = useState(
    baseColumns.map(col => col.dataIndex)
  );

  const toggleColumn = column => {
    setVisibleColumns(prev =>
      prev.includes(column) ? prev.filter(c => c !== column) : [...prev, column]
    );
  };

  const handleSelectRow = slug => {
    setSelectedRows(prev =>
      prev.includes(slug)
        ? prev.filter(rowSlug => rowSlug !== slug)
        : [...prev, slug]
    );
  };

  const handleAction = async (action, slug) => {
    try {
      if (action === "delete") {
        await postsApi.destroy(slug);
      } else {
        await postsApi.update({ status: action.toLowerCase() }, slug);
      }
      refetch();
    } catch (error) {
      Toastr.error(error);
    }
  };

  const rowData = getRowData({
    ...{ posts, selectedRows, handleSelectRow, handleAction },
  });

  const filteredColumns = baseColumns.filter(col =>
    visibleColumns.includes(col.dataIndex)
  );

  const onBulkDelete = async () => {
    if (selectedRows.length === 0) return;

    try {
      await Promise.all(selectedRows.map(slug => postsApi.destroy(slug)));
      setSelectedRows([]);
      Toastr.success("Posts deleted successfully");
      refetch();
    } catch (error) {
      Toastr.error(error);
    }
  };

  const onBulkStatusChange = async newStatus => {
    const postsToUpdate = posts.filter(
      post => selectedRows.includes(post.slug) && post.status !== newStatus
    );

    if (postsToUpdate.length === 0) {
      Toastr.info("All selected posts already have this status.");

      return;
    }

    try {
      for (const post of postsToUpdate) {
        await postsApi.update({ status: newStatus }, post.slug);
      }

      setSelectedRows([]);
      Toastr.success("Status updated successfully");
      refetch();
    } catch (error) {
      Toastr.error(error);
    }
  };

  return (
    <Container className="p-8 lg:px-16">
      <PageTitle title="My blog posts" />
      <div className="my-4 flex w-[90%] justify-between lg:w-full">
        <ArticleSection
          allPostsCount={posts.length}
          selectedPosts={selectedRows}
          {...{
            filterState,
            setFilterState,
            posts,
            onBulkStatusChange,
            onBulkDelete,
            updateQueryParams,
          }}
        />
        {isEmpty(selectedRows) && (
          <div className="flex items-center space-x-2">
            <Dropdown
              buttonStyle="secondary"
              className="border shadow-xl"
              label="Columns"
            >
              <div className="space-y-2 p-2">
                {baseColumns
                  .filter(col =>
                    ["title", "category", "published_at", "status"].includes(
                      col.dataIndex
                    )
                  )
                  .map(column => {
                    const isTitleColumn = column.dataIndex === "title";
                    const isChecked = visibleColumns.includes(column.dataIndex);

                    return (
                      <Checkbox
                        checked={isChecked}
                        disabled={isTitleColumn}
                        key={column.dataIndex}
                        label={column.title}
                        onChange={() =>
                          !isTitleColumn && toggleColumn(column.dataIndex)
                        }
                      />
                    );
                  })}
              </div>
            </Dropdown>
            <Button
              icon={Filter}
              style="tertiary"
              onClick={() => setIsPaneOpen(prev => !prev)}
            />
            <Filters
              {...{
                isPaneOpen,
                filterState,
                setFilterState,
                setIsPaneOpen,
                updateQueryParams,
                categories,
              }}
            />
          </div>
        )}
      </div>
      <PostTable {...{ filteredColumns, isLoading, rowData }} />
    </Container>
  );
};

export default MyPosts;
