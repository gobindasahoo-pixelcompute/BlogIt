import React from "react";

import { Input, Button, TextArea } from "components/commons";
import { Link } from "react-router-dom";

const Form = ({ type = "create", post, setPost, loading, handleSubmit }) => (
  <form
    className="relative mb-4 h-full w-full space-y-4 rounded-xl border p-8 shadow-xl"
    onSubmit={handleSubmit}
  >
    <Input
      label="Title*"
      placeholder="Todo Title (Max 50 Characters Allowed)"
      value={post.title}
      onChange={e => setPost(prev => ({ ...prev, title: e.target.value }))}
    />
    <TextArea
      label="Description*"
      placeholder="Todo description (Max 10000 Characters Allowed)"
      rows={10}
      value={post.description}
      onChange={e =>
        setPost(prev => ({ ...prev, description: e.target.value }))
      }
    />
    <div className="absolute bottom-6 right-8 flex gap-4">
      <Link to="/">
        <Button
          buttonText="Cancel"
          loading={loading}
          style="secondary"
          type="submit"
        />
      </Link>
      <Button
        buttonText={type === "create" ? "Create Post" : "Update Post"}
        loading={loading}
        type="submit"
      />
    </div>
  </form>
);

export default Form;
