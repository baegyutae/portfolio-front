import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationComponent = ({ totalPages, page, onPageChange }) => {
  return (
    <Stack alignItems="center" spacing={2}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, page) => onPageChange(page)}
        color="primary"
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default PaginationComponent;
