import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "../../../shared/components/ui/button.tsx";
import { Input } from "../../../shared/components/ui/input.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../shared/components/ui/card.tsx";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux.ts";
import { createProduct } from "../store/productSlice.ts";
import type { CreateProductDto } from "../types/index.ts";

export default function ProductAddPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categories, loading } = useAppSelector((state) => state.products);

  const [formData, setFormData] = useState<CreateProductDto>({
    name: "",
    description: "",
    price: 0,
    category: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? (value === "" ? 0 : Number(value)) : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Ürün adı gereklidir";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Açıklama gereklidir";
    }
    if (formData.price < 1) {
      newErrors.price = "Fiyat en az 1₺ olmalıdır";
    }
    if (!formData.category) {
      newErrors.category = "Kategori seçiniz";
    }
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "Resim URL'si gereklidir";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      console.log("Ürün ekleme başlıyor:", formData);
      const result = await dispatch(createProduct(formData)).unwrap();
      console.log("Ürün başarıyla eklendi:", result);
      navigate("/products");
    } catch (error) {
      console.error("Ürün eklenirken hata:", error);
      setErrors({ general: "Ürün eklenirken bir hata oluştu" });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate("/products")}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ürünlere Dön</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Yeni Ürün Ekle</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
                {errors.general}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ürün Adı *
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
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
                Açıklama *
              </label>
              <textarea
                name="description"
                value={formData.description}
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
                Fiyat (₺) *
              </label>
              <Input
                type="text"
                name="price"
                value={formData.price === 0 ? "" : formData.price.toString()}
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
                Kategori *
              </label>
              <select
                name="category"
                value={formData.category}
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
                Resim URL'si *
              </label>
              <Input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
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
                onClick={() => navigate("/products")}
                className="flex-1"
              >
                İptal
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Ekleniyor..." : "Ürün Ekle"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
