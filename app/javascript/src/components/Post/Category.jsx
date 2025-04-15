import React from "react";

const Category = ({ categories, className }) => (
  <ul className={`flex gap-1 ${className}`}>
    {categories.map(category => (
      <li
        className="rounded-xl bg-green-100 px-6 py-0.5 text-xs font-bold"
        key={category.id}
      >
        {category.name}
      </li>
    ))}
  </ul>
);

export default Category;
