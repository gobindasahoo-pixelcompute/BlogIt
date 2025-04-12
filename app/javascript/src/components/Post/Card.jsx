import React from "react";

import { Link } from "react-router-dom";

import Category from "./Category";
import { formatDate } from "./utils";

const Card = ({ title, description, created_at, slug, user, categories }) => (
  <div className="mt-6">
    <Link
      className="text-2xl font-semibold capitalize"
      to={`/posts/${slug}/show`}
    >
      {title}
    </Link>
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
);

export default Card;
