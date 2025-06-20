import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit2 } from "lucide-react";
import { Button } from "../../../shared/components/ui/button.tsx";
import { Input } from "../../../shared/components/ui/input.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../shared/components/ui/card.tsx";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux.ts";
import { fetchProducts, updateProduct } from "../store/productSlice.ts";
import type { UpdateProductDto } from "../types/index.ts";
import { useToast } from "../../../shared/hooks/useToast.ts";
export default function ProductEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products, categories, loading } = useAppSelector(
    (state) => state.products
  );
  const toast = useToast();
  const product = products.find((p) => p.id === id);

  const [formData, setFormData] = useState<UpdateProductDto>({
    name: "",
    description: "",
    price: 0,
    category: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        imageUrl: product.imageUrl,
      });
    }
  }, [product]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "price") {
      // Sadece sayı ve nokta karakterlerine izin ver
      const numericValue = value.replace(/[^0-9.]/g, "");
      const parsedValue = numericValue === "" ? 0 : Number(numericValue);
      setFormData((prev) => ({
        ...prev,
        [name]: parsedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.name && !formData.name.trim()) {
      newErrors.name = "Ürün adı boş olamaz";
    }
    if (formData.description && !formData.description.trim()) {
      newErrors.description = "Açıklama boş olamaz";
    }
    if (formData.price && formData.price < 1) {
      newErrors.price = "Fiyat en az 1₺ olmalıdır";
    }
    if (formData.imageUrl && !formData.imageUrl.trim()) {
      newErrors.imageUrl = "Resim URL'si boş olamaz";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !id) return;

    try {
      await dispatch(updateProduct({ id, data: formData })).unwrap();
      toast.toast({
        title: "Ürün başarıyla güncellendi",
      });
      navigate(`/products/${id}`);
    } catch (error) {
      console.log(error);
      toast.toast({
        title: "Ürün güncellenirken hata oluştu",
      });
    }
  };

  if (!product && products.length > 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="text-lg text-gray-600">Ürün bulunamadı</div>
        <Button onClick={() => navigate("/products")}>Ürünlere Dön</Button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate(`/products/${id}`)}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Detaya Dön</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Edit2 className="w-5 h-5" />
            <span>Ürün Düzenle</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ürün Adı
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
                className={errors.name ? "border-red-500" : ""}
                placeholder="Ürün adını giriniz"
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Açıklama
              </label>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Ürün açıklamasını giriniz"
              />
              {errors.description && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fiyat (₺)
              </label>
              <Input
                type="text"
                name="price"
                value={
                  formData.price === 0 ? "" : formData.price?.toString() || ""
                }
                onChange={handleInputChange}
                className={errors.price ? "border-red-500" : ""}
                placeholder="Fiyatı giriniz (₺)"
              />
              {errors.price && (
                <p className="text-sm text-red-600 mt-1">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kategori
              </label>
              <select
                name="category"
                value={formData.category || ""}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Kategori seçiniz</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-sm text-red-600 mt-1">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resim URL'si
              </label>
              <Input
                type="url"
                name="imageUrl"
                value={formData.imageUrl || ""}
                onChange={handleInputChange}
                className={errors.imageUrl ? "border-red-500" : ""}
                placeholder="https://example.com/image.jpg"
              />
              {errors.imageUrl && (
                <p className="text-sm text-red-600 mt-1">{errors.imageUrl}</p>
              )}
            </div>

            <div className="flex space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/products/${id}`)}
                className="flex-1"
              >
                İptal
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Güncelleniyor..." : "Güncelle"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
