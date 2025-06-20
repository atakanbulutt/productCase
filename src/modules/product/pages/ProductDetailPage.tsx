import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Heart, Edit2, Trash2 } from "lucide-react";
import { Button } from "../../../shared/components/ui/button";
import { Card, CardContent } from "../../../shared/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../shared/components/ui/alert-dialog.tsx";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux";
import {
  fetchProducts,
  toggleFavorite,
  deleteProduct,
} from "../store/productSlice";
import { useToast } from "../../../shared/hooks/useToast";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toast = useToast();

  const { products, favorites, loading, error } = useAppSelector(
    (state) => state.products
  );
  const product = products.find((p) => p.id === id);
  const isFavorite = product ? favorites.includes(product.id) : false;

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const handleToggleFavorite = () => {
    if (product) {
      dispatch(toggleFavorite(product.id));
    }
  };

  const handleDelete = async () => {
    if (product) {
      try {
        await dispatch(deleteProduct(product.id)).unwrap();
        toast.toast({
          title: "Ürün başarıyla silindi",
        });
        navigate("/products");
      } catch (error) {
        console.log(error);
        toast.toast({
          title: "Ürün silinirken hata oluştu",
        });
      }
    }
  };

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

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="text-lg text-gray-600">Ürün bulunamadı (ID: {id})</div>
        <Link to="/products">
          <Button>Ürünlere Dön</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate("/products")}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handleToggleFavorite}
            style={{
              backgroundColor: isFavorite ? "#fecaca" : "#f8fafc",
              color: isFavorite ? "#dc2626" : "#64748b",
              borderColor: isFavorite ? "#fca5a5" : "#e2e8f0",
            }}
            className="hover:opacity-80 transition-opacity"
          >
            <Heart
              className={`w-4 h-4 mr-2 ${isFavorite ? "fill-current" : ""}`}
            />
            {isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}
          </Button>

          <Link to={`/products/${product.id}/edit`}>
            <Button
              style={{
                backgroundColor: "#dbeafe",
                color: "#1e40af",
              }}
              className="hover:opacity-80 transition-opacity"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Düzenle
            </Button>
          </Link>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                className="hover:opacity-80 transition-opacity"
              >
                <Trash2 className="w-4 h-4 mr-2" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>
                  Ürünü silmek istediğinizden emin misiniz?
                </DialogTitle>
                <DialogDescription>
                  Bu işlem geri alınamaz. Ürün kalıcı olarak silinecektir.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Kapat
                  </Button>
                </DialogClose>
                <Button variant="outline" onClick={handleDelete}>
                  Sil
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-96 lg:h-full object-cover rounded-l-lg"
              />
            </div>

            <div className="p-8 space-y-6">
              <div>
                <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full mb-3">
                  {product.category}
                </span>
                <h1 className="text-xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-4xl font-bold text-green-600">
                  ₺{product.price.toLocaleString()}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Açıklama
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <span className="text-sm text-gray-500">Eklenme Tarihi</span>
                  <p className="font-medium">
                    {new Date(product.createdAt).toLocaleDateString("tr-TR")}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Son Güncelleme</span>
                  <p className="font-medium">
                    {new Date(product.updatedAt).toLocaleDateString("tr-TR")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
