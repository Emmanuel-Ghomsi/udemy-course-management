import { useState } from "react";
import tableStyles from "./Table.module.css";

const TableHead = ({ columns, handleSorting }) => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor, sortable }) => {
          const cl = sortable
            ? sortField === accessor && order === "asc"
              ? `${tableStyles.up}`
              : sortField === accessor && order === "desc"
              ? `${tableStyles.down}`
              : `default`
            : "";

          return (
            <th
              key={accessor}
              onClick={sortable ? () => handleSortingChange(accessor) : null}
            >
              <span className={cl}>{label}</span>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
