import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "../../../shared/components/ui/button.tsx";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux.ts";
import { fetchProducts } from "../store/productSlice.ts";
import ProductCard from "../components/ProductCard.tsx";
import ProductFilters from "../components/ProductFilters.tsx";
import type { Product } from "../types/index.ts";

export default function ProductListPage() {
  const dispatch = useAppDispatch();
  const { filteredProducts, loading, error } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (filteredProducts.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, filteredProducts.length]);

  useEffect(() => {
    console.log(
      "ProductListPage render - filteredProducts:",
      filteredProducts.length
    );
  }, [filteredProducts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-red-600">Hata: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Ürünler</h1>
        <Link to="/products/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Ürün
          </Button>
        </Link>
      </div>

      <ProductFilters />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Ürün bulunamadı</p>
        </div>
      )}
    </div>
  );
}
