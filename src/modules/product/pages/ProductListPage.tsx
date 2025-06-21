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
  const { filteredProducts, loading, error, products } = useAppSelector(
    (state) => state.products
  );
  console.log("filteredProducts", filteredProducts);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    console.log(
      "ProductListPage render - filteredProducts:",
      filteredProducts.length
    );
  }, [filteredProducts]);

  if (loading && filteredProducts.length === 0) {
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
        <h3 className="text-xl font-bold text-gray-900">Ürünler</h3>
        <Link to="/products/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Ürün
          </Button>
        </Link>
      </div>

      <ProductFilters />

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Ürün bulunamadı</p>
          </div>
        )
      )}
    </div>
  );
}
