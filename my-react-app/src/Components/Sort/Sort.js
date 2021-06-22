import React from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import "./Sort.scss";

const Sort = ({ options, setSort, setSortDirection, styles }) => {
  const { sort, sortDirection, filterSort, filterEnd, filterStart, noteTemp } =
    options;
  const handleSortChange = (e) => {
    setSort(e.target.value);
    filterSort(e.target.value, sortDirection, filterStart, filterEnd, noteTemp);
  };

  const handleSortDirectionChange = (e) => {
    setSortDirection(e.target.value);
    filterSort(sort, e.target.value, filterStart, filterEnd, noteTemp);
  };

  const directions = [
    { value: "asc", name: "По возрастанию" },
    { value: "desc", name: "По убыванию" },
  ];

  const sorted = [
    { value: "default", name: "Умолчанию" },
    { value: "patient", name: "Имени" },
    { value: "doctor", name: "Врачу" },
    { value: "date", name: "Дате" },
  ];

  return (
    <div className="sort">
      <span>Сортировать по:</span>
      <FormControl variant="outlined" className="input-textfield">
        <Select value={sort} onChange={(e) => handleSortChange(e)}>
          {sorted.map((sort, index) => (
            <MenuItem key={`sort-${index}`} value={sort.value}>
              {sort.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <span style={{ display: styles }}>Направление:</span>
      <FormControl
        style={{ display: styles }}
        variant="outlined"
        className="input-textfield"
      >
        <Select
          value={sortDirection}
          onChange={(e) => handleSortDirectionChange(e)}
        >
          {directions.map((dir, index) => (
            <MenuItem key={`dir-${index}`} value={dir.value}>
              {dir.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Sort;
