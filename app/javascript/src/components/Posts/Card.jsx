import React from "react";

import { Link } from "react-router-dom";

import { formatCreatedAtDate } from "./utils";

const Card = ({ title, description, created_at, slug }) => (
  <div className="mt-6 flex flex-col gap-2">
    <Link className="text-2xl font-bold" to={`/posts/${slug}/show`}>
      {title}
    </Link>
    <p className="text-md">{description}</p>
    <p className="text-[10px]">{formatCreatedAtDate(created_at)}</p>
    <hr />
  </div>
);

export default Card;
