import { useState } from "react";
import useStudentData from "../../hooks/useStudentData";
import { classes } from "../../constants/classes";
const StudentFilter = () => {
  const { filters, updateFilters } = useStudentData();
  const [searchText, setSearchText] = useState(filters.search);
  const [selectedClass, setSelectedClass] = useState(filters.className);

  const handleSearchClick = () => {
    updateFilters({ search: searchText, className: selectedClass });
  };

  const handleClassChange = (e) => {
    const value = e.target.value;
    setSelectedClass(value);
    updateFilters({ search: searchText, className: value });
  };

  const handleResetClick = () => {
    setSearchText("");
    setSelectedClass("");
    updateFilters({ search: "", className: "" });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
      {/* Search input + button */}
      <div className="col-span-1 md:col-span-2 flex">
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value.trimStart())}
          placeholder="Search student by name and class roll..."
          type="text"
          className="px-4 py-1 text-black border border-gray-400 rounded-l-md focus:outline-none focus:ring-1 focus:ring-green-500 w-full placeholder:capitalize placeholder:italic placeholder:text-sm"
        />
        <button
          onClick={handleSearchClick}
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-sm transition cursor-pointer"
        >
          Search
        </button>
      </div>

      {/* Class Dropdown */}
      <div className="col-span-1 md:col-span-1 flex gap-2">
        <select
          value={selectedClass}
          onChange={handleClassChange}
          className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
        >
          <option value="">Filters By Classes</option>
          {classes.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Reset Button */}
        <button
          onClick={handleResetClick}
          type="button"
          className="border border-gray-400 bg-transparent text-black font-semibold px-6 py-2 rounded-sm transition cursor-pointer"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default StudentFilter;
