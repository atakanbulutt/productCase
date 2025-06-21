import { Link } from "react-router-dom";
import { Heart, Edit } from "lucide-react";
import { Card } from "../../../shared/components/ui/card.tsx";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux.ts";
import { toggleFavorite } from "../store/productSlice.ts";
import type { Product } from "../types/index.ts";
import { Button } from "../../../shared/components/ui/button.tsx";
import { memo, useCallback } from "react";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.products);
  const isFavorite = favorites.includes(product.id);

  const handleToggleFavorite = useCallback(() => {
    dispatch(toggleFavorite(product.id));
  }, [dispatch, product.id]);

  return (
    <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-lg">
      <div className="relative">
        <img
          src={product.imageUrl}
          loading="lazy"
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <Button
          onClick={handleToggleFavorite}
          variant="ghost"
          className="absolute top-2 right-2 p-2 rounded-full text-white"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </Button>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-green-600">
            ₺{product.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500 px-2 py-1 bg-gray-100 rounded">
            {product.category}
          </span>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/products/${product.id}/edit`}
            className="text-black underline text-sm font-medium hover:no-underline"
          >
            <Edit className="w-4 h-4 inline mr-1" />
            Düzenle
          </Link>

          <Link
            to={`/products/${product.id}`}
            className="text-black underline text-sm font-medium hover:no-underline"
          >
            Detay
          </Link>
        </div>
      </div>
    </Card>
  );
}
export default memo(ProductCard);
