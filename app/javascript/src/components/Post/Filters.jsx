import React from "react";

import { Input, Pane, Select } from "@bigbinary/neetoui";

import { getCategoryIds } from "./utils";

import { Button, PageTitle } from "../commons";

const Filters = ({
  filterState,
  setFilterState,
  setIsPaneOpen,
  isPaneOpen,
  updateQueryParams,
  categories,
}) => {
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

  const handleClearFilters = () => {
    updateQueryParams({
      title: null,
      categories: [],
      status: null,
    });
    setIsPaneOpen(false);
  };

  const handleSubmit = () => {
    updateQueryParams({
      title: filterState.title,
      status: filterState.status,
      categories: getCategoryIds(filterState.categories),
    });
    setIsPaneOpen(false);
  };

  return (
    <Pane isOpen={isPaneOpen} onClose={() => setIsPaneOpen(false)}>
      <div className="flex h-full w-[90%] flex-col justify-between px-16 py-8 lg:px-4">
        <div className="mt-8 flex flex-col gap-4">
          <PageTitle title="Filters" />
          <Input
            label="Title"
            value={filterState.title}
            onChange={e =>
              setFilterState(prev => ({ ...prev, title: e.target.value }))
            }
          />
          <Select
            isMulti
            isSearchable
            label="Category"
            options={categories}
            value={filterState.categories}
            optionRemapping={{
              label: "name",
              value: "id",
            }}
            onChange={selected =>
              setFilterState(prev => ({ ...prev, categories: selected }))
            }
          />
          <Select
            isSearchable
            label="Status"
            options={statusOptions}
            value={
              statusOptions.find(opt => opt.value === filterState.status) ||
              null
            }
            onChange={selected =>
              setFilterState(prev => ({ ...prev, status: selected.value }))
            }
          />
        </div>
        <div className="flex gap-4">
          <Button buttonText="Done" onClick={handleSubmit} />
          <Button
            buttonText="Clear filters"
            className="border-2 border-solid bg-white"
            style="secondary"
            onClick={handleClearFilters}
          />
        </div>
      </div>
    </Pane>
  );
};

export default Filters;
