import React from "react";

import { Input, Textarea } from "components/commons";
import Select from "react-select";

const Form = ({ post, setPost, categories }) => (
  <form className="relative h-full space-y-8 rounded-xl border p-8 shadow-xl lg:p-16">
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
        options={categories.map(category => ({
          label: category.name,
          value: category.id,
        }))}
        value={
          post?.categories?.map(category => ({
            label: category.name,
            value: category.id,
          })) || []
        }
        onChange={selectedOptions => {
          setPost(prev => ({
            ...prev,
            categories: selectedOptions.map(option => ({
              name: option.label,
              id: option.value,
            })),
          }));
        }}
      />
    </div>
    <Textarea
      label="Description*"
      placeholder="Enter description"
      rows={10}
      value={post.description}
      onChange={e =>
        setPost(prev => ({ ...prev, description: e.target.value }))
      }
    />
  </form>
);

export default Form;
