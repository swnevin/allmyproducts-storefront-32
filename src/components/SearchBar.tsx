import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string, filter: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [filter, setFilter] = useState("name");

  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="relative flex-1 max-w-sm mx-auto">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value, filter)}
          className="w-full px-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#ea384c]/30 focus:ring-1 focus:ring-[#ea384c]/30"
        />
      </div>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="text-sm px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#ea384c]/30 focus:ring-1 focus:ring-[#ea384c]/30"
      >
        <option value="name">Name</option>
        <option value="tag">Tag</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};