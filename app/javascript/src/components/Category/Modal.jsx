import React from "react";

import { Modal } from "@bigbinary/neetoui";
import { Input, Button } from "components/commons";

const CategoryModal = ({
  isModalOpen,
  setIsModalOpen,
  handleSubmit,
  error,
  category,
  setCategory,
}) => (
  <Modal
    isOpen={isModalOpen}
    size="medium"
    onClose={() => setIsModalOpen(false)}
  >
    <Modal.Header>
      <h1 className="text-xl font-semibold">New category</h1>
    </Modal.Header>
    <Modal.Body>
      <div className="flex flex-col gap-4">
        <Input
          error={error}
          label="Category title"
          placeholder="Enter category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
        {error && <p className="text-xs text-red-500">*{error}</p>}
        <div className="flex gap-2">
          <Button
            buttonText="Add"
            size="medium"
            type="submit"
            onClick={handleSubmit}
          />
          <Button
            buttonText="Cancel"
            size="medium"
            style="secondary"
            onClick={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    </Modal.Body>
  </Modal>
);

export default CategoryModal;
