import { includes, without } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePostsStore = create(
  persist(
    set => ({
      clickedCategories: [],
      toggleClickedCategories: id => {
        set(({ clickedCategories }) => {
          if (includes(id, clickedCategories)) {
            return {
              clickedCategories: without([id], clickedCategories),
            };
          }

          return {
            clickedCategories: [id, ...clickedCategories],
          };
        });
      },
    }),
    { name: "posts-store" }
  )
);

export default usePostsStore;
