import React from "react";

import { Spinner, Table } from "@bigbinary/neetoui";

const PostTable = ({
  isLoading = false,
  filteredColumns = [],
  rowData = [],
}) => (
  <div className="inline-block w-[90%] lg:w-full">
    {isLoading ? (
      <div className="flex h-40 items-center justify-center">
        <Spinner size="large" />
      </div>
    ) : (
      <Table columnData={filteredColumns} rowData={rowData} />
    )}
  </div>
);

export default PostTable;
