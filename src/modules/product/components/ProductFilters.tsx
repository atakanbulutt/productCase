import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "../../../shared/components/ui/input.tsx";
import { Button } from "../../../shared/components/ui/button.tsx";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux.ts";
import { setFilters, clearFilters } from "../store/productSlice.ts";

export default function ProductFilters() {
  const dispatch = useAppDispatch();
  const { filters, categories } = useAppSelector((state) => state.products);
  const [searchValue, setSearchValue] = useState(filters.search || "");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    dispatch(setFilters({ ...filters, search: value }));
  };

  const handleCategoryFilter = (category: string) => {
    if (filters.category === category) {
      dispatch(setFilters({ ...filters, category: undefined }));
    } else {
      dispatch(setFilters({ ...filters, category }));
    }
  };

  const handleClearFilters = () => {
    setSearchValue("");
    dispatch(clearFilters());
  };

  const hasActiveFilters = searchValue || filters.category;

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Ürün ara..."
            value={searchValue}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearFilters}
            className="text-gray-600 hover:text-gray-800"
          >
            <X className="w-4 h-4 mr-1" />
            Temizle
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-gray-700 py-2">
          Kategoriler:
        </span>
        {categories.map((category: string) => (
          <Button
            key={category}
            variant="outline"
            size="sm"
            onClick={() => handleCategoryFilter(category)}
            className={`${
              filters.category === category
                ? "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}
