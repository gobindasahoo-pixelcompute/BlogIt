import React, { useState } from "react";

import { DownArrow, UpArrow } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";
import { votesApi } from "apis/vote";
import { Link } from "react-router-dom";

import Category from "./Category";
import { formatDate } from "./utils";

const Card = ({
  title,
  description,
  slug,
  user,
  categories,
  created_at,
  net_votes,
  is_bloggable,
}) => {
  const [netVotes, setNetVotes] = useState(net_votes);
  const [isBloggable, setIsBloggable] = useState(is_bloggable);

  const handleVote = async type => {
    const {
      data: { net_votes, is_bloggable },
    } = await votesApi.create(slug, type);
    setNetVotes(net_votes);
    setIsBloggable(is_bloggable);
    window.location.reload();
  };

  return (
    <div className="mt-6 flex justify-between">
      <div>
        <div className="flex gap-2">
          <Link
            className="text-2xl font-semibold capitalize"
            to={`/posts/${slug}/show`}
          >
            {title}
          </Link>
          {isBloggable && (
            <div className="my-auto flex h-5 items-center justify-center  rounded-full border border-green-400 px-6 text-xs font-semibold capitalize text-green-400 shadow-xl">
              BlogIt
            </div>
          )}
        </div>
        <Category categories={categories} className="mt-1" />
        <p className="mt-2 text-sm">
          {description.length > 180
            ? `${description.slice(0, 180)}...`
            : description}
        </p>
        <p className="mt-2 text-xs font-bold">{user.name}</p>
        <p className=" text-[10px]">{formatDate(created_at)}</p>
        <hr className="mt-2" />
      </div>
      <div className="flex w-1/4 flex-col items-center justify-center">
        <Button
          icon={UpArrow}
          style="tertiary"
          onClick={() => handleVote("upvote")}
        />
        <p className="mx-auto text-xl font-bold">{netVotes}</p>
        <Button
          icon={DownArrow}
          style="tertiary"
          onClick={() => handleVote("downvote")}
        />
      </div>
    </div>
  );
};

export default Card;
