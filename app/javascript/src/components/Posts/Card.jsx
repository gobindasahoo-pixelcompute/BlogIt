import React from "react";

const Card = ({ title, description, created_at }) => {
  const createdAt = new Date(created_at).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mt-6">
      <h1 className="text-lg font-bold">{title}</h1>
      <p className="text-m mt-2">{description}</p>
      <p className="text-[10px]">{createdAt}</p>
      <hr className="mt-2" />
    </div>
  );
};

export default Card;
