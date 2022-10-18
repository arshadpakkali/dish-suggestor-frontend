import Box from "@mui/material/Box/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Dish, PageQueryDto, PaginatedResponseDto } from "../../models";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
  },
  {
    field: "diet",
    headerName: "Diet",
  },
  {
    field: "prep_time",
    headerName: "Prep Time",
  },
  {
    field: "cook_time",
    headerName: "Cook Time",
  },
  {
    field: "course",
    headerName: "Course",
  },
  {
    field: "flavor_profile",
    headerName: "Flavor Profile",
  },
  {
    field: "state",
    headerName: "state",
  },
  {
    field: "region",
    headerName: "Region",
  },
];

const fetchDishesPaginated = async (pageOpts: PageQueryDto) =>
  (
    await axios.get<PaginatedResponseDto<Dish>>(
      `http://localhost:3000/dishes?page[currentPage]=${pageOpts.currentPage}&page[perPage]=${pageOpts.perPage}`
    )
  ).data;

export function DishesList() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const { data, isLoading, error } = useQuery(
    ["dishes", page, pageSize],
    async () => fetchDishesPaginated({ perPage: pageSize, currentPage: page }),
    { keepPreviousData: true }
  );

  const [rowCountState, setRowCountState] = React.useState(
    data?.pagination?.total || 0
  );

  React.useEffect(() => {
    setRowCountState((prevRowCountState) =>
      data?.pagination?.total !== undefined
        ? data?.pagination?.total
        : prevRowCountState
    );
  }, [data?.pagination?.total, setRowCountState]);

  if (error) return <>Error fetching Data</>;

  if (data)
    return (
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          loading={isLoading}
          rows={data.results.map((x, ix) => ({ ...x, id: ix + 1 }))}
          columns={columns}
          pageSize={pageSize}
          onPageChange={(nePage) => {
            setPage(nePage);
          }}
          onPageSizeChange={(n) => setPageSize(n)}
          rowCount={rowCountState}
          rowsPerPageOptions={[5, 10]}
          paginationMode="server"
        />
      </Box>
    );

  return <></>;
}
