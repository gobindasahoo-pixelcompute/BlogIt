import React, { useEffect, useState } from "react";

import { Input } from "@bigbinary/neetoui";
import classNames from "classnames";
import { includes } from "ramda";

import Modal from "./Modal";

import { categoriesApi } from "../../apis/categories";
import usePostsStore from "../../stores/usePostsStore";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { clickedCategories, toggleClickedCategories } = usePostsStore();

  const handleSubmit = async () => {
    if (!category.trim()) {
      setError("Category title cannot be empty.");

      return;
    }
    setError("");
    try {
      await categoriesApi.create({ name: category });
      fetchCategories();
    } catch (error) {
      setError(error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const fetchCategories = async () => {
    const {
      data: { categories },
    } = await categoriesApi.fetch();
    setCategories(categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="h-screen w-48 bg-gray-100 px-4 py-16 sm:w-52 lg:w-60">
      <div className="flex justify-between">
        <h2 className="text-sm font-bold uppercase">categories</h2>
        <div className="flex gap-3">
          <button
            className="cursor-pointer"
            onClick={() => setIsSearchOpen(prev => !prev)}
          >
            <i className="ri-search-line" />
          </button>
          <button onClick={() => setIsModalOpen(true)}>
            <i className="ri-add-line" />
          </button>
        </div>
      </div>
      {isSearchOpen && (
        <Input
          placeholder="Search categories"
          type="search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      )}
      <ul className="mt-8 flex h-[96%] flex-col gap-4 overflow-y-scroll">
        {categories
          .filter(category =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(category => (
            <li
              key={category.id}
              className={classNames(
                "cursor-pointer rounded border px-2 py-0.5 text-left",
                {
                  "bg-white": includes(category.id, clickedCategories),
                }
              )}
              onClick={() => toggleClickedCategories(category.id)}
            >
              {category.name}
            </li>
          ))}
      </ul>
      <Modal
        {...{
          isModalOpen,
          setIsModalOpen,
          handleSubmit,
          error,
          category,
          setCategory,
        }}
      />
    </div>
  );
};

export default Category;
