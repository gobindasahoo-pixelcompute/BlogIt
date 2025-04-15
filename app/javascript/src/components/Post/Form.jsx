import React from "react";

import { Input, Button, Textarea } from "components/commons";
import Select from "react-select";

const Form = ({
  post,
  setPost,
  loading,
  handleSubmit,
  history,
  categories,
}) => (
  <form
    className="relative h-full space-y-8 rounded-xl border p-8 shadow-xl lg:p-16"
    onSubmit={handleSubmit}
  >
    <Input
      label="Title*"
      placeholder="Enter title"
      value={post.title}
      onChange={e => setPost(prev => ({ ...prev, title: e.target.value }))}
    />
    <div className="mt-1 w-full">
      <label className="text-sm">Category*</label>
      <Select
        isMulti
        isSearchable
        className="text-sm"
        menuPosition="fixed"
        placeholder="Search category"
        options={
          categories?.map(category => ({
            label: category.name,
            value: category.id,
          })) || []
        }
        onChange={selectedOptions =>
          setPost(prev => ({
            ...prev,
            category_ids: selectedOptions.map(option => option.value),
          }))
        }
      />
    </div>
    <Textarea
      label="Description*"
      placeholder="Enter description"
      value={post.description}
      onChange={e =>
        setPost(prev => ({ ...prev, description: e.target.value }))
      }
    />
    <div className="absolute bottom-8 right-8 flex gap-4 lg:bottom-16 lg:right-16">
      <Button
        buttonText="Cancel"
        loading={loading}
        style="secondary"
        type="submit"
        onClick={() => history.push("/")}
      />
      <Button buttonText="Submit" loading={loading} type="submit" />
    </div>
  </form>
);

export default Form;
