import { useCallback, useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "../../../shared/components/ui/input.tsx";
import { Button } from "../../../shared/components/ui/button.tsx";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux.ts";
import { setFilters, clearFilters } from "../store/productSlice.ts";

const debounce = (func: (value: string) => void, delay: number) => {
  let timeoutId: number;
  return (value: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(value), delay);
  };
};

export default function ProductFilters() {
  const dispatch = useAppDispatch();
  const { filters, categories } = useAppSelector((state) => state.products);
  const [searchValue, setSearchValue] = useState(filters.search || "");

  useEffect(() => {
    setSearchValue(filters.search || "");
  }, [filters.search]);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (value.length >= 1) {
        dispatch(setFilters({ ...filters, search: value }));
      } else {
        dispatch(setFilters({ ...filters, search: undefined }));
      }
    }, 300),
    [dispatch, filters]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
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

        {/* Masaüstü için Temizle */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="default"
            onClick={handleClearFilters}
            className="text-gray-600 hover:text-gray-800 hidden md:flex"
          >
            <X className="w-4 h-4 ml-1" />
            Temizle
          </Button>
        )}
      </div>

      {/* Mobil için Temizle */}
      {hasActiveFilters && (
        <div className="md:hidden">
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="w-full text-gray-600 hover:text-gray-800"
          >
            <X className="w-4 h-4 mr-1" />
            Temizle
          </Button>
        </div>
      )}

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
