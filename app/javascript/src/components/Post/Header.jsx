import React, { useState } from "react";

import { ExternalLink, MenuHorizontal } from "@bigbinary/neeto-icons";
import { Button as NeetoUIButton } from "@bigbinary/neetoui";
import { Button } from "components/commons";
import { Link, useHistory } from "react-router-dom";

import DropDown from "./DropDown";
import { formatDraftTime } from "./utils";

import postsApi from "../../apis/posts";

const Header = ({
  loading,
  setPost,
  post,
  isButtonDisabled = null,
  isPostEmpty = null,
  handleSubmit,
  slug = "",
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const history = useHistory();

  const handleDelete = async () => {
    await postsApi.destroy(slug);
    history.push("/");
  };
  const isChanged = slug ? isButtonDisabled : !isPostEmpty;

  const handlePreview = () => {
    history.push("/posts/preview", { post });
  };

  return (
    <div className="relative flex flex-col lg:flex-row-reverse lg:gap-8">
      <div className="flex items-center gap-2">
        {(slug || !isPostEmpty) && (
          <NeetoUIButton
            icon={ExternalLink}
            style="tertiary"
            tooltipProps={{ content: "Preview", position: "top" }}
            onClick={handlePreview}
          />
        )}
        <Link to="/">
          <Button buttonText="Cancel" loading={loading} style="secondary" />
        </Link>
        <DropDown
          defaultValue={post?.status}
          handleSubmit={handleSubmit}
          isChanged={isChanged}
          onChange={selectedValue =>
            setPost(prev => ({ ...prev, status: selectedValue }))
          }
        />
        {slug && (
          <NeetoUIButton
            icon={MenuHorizontal}
            style="tertiary"
            onClick={() => setIsDropdownOpen(prev => !prev)}
          />
        )}
        {isDropdownOpen && (
          <div className="absolute right-0 top-12 z-10 w-60 rounded-xl border bg-white py-2 shadow-xl">
            <NeetoUIButton
              className="text-red-400"
              label="Delete"
              style="tertiary"
              onClick={handleDelete}
            />
          </div>
        )}
      </div>
      {post?.status === "draft" && post?.updated_at && (
        <p className=" mt-2 text-end text-gray-400">
          Draft saved at{" "}
          <span className="font-semibold text-gray-600">
            {formatDraftTime(post?.updated_at)}
          </span>
        </p>
      )}
    </div>
  );
};

export default Header;
