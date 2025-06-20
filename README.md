# Product & User Management System

Modern ve responsive bir ürün ve kullanıcı yönetim sistemi. React, TypeScript, Redux Toolkit ve Tailwind CSS kullanılarak geliştirilmiştir.

## 🚀 Özellikler

### Ürün Yönetimi
- ✅ Ürün listeleme, arama ve filtreleme
- ✅ Ürün detay sayfası
- ✅ Ürün ekleme ve düzenleme
- ✅ Ürün silme (onay dialog'u ile)
- ✅ Favorilere ekleme/çıkarma

### Kullanıcı Yönetimi
- ✅ Kullanıcı listeleme
- ✅ Kullanıcı detay sayfası
- ✅ Kullanıcı ekleme
- ✅ Kullanıcı profil düzenleme
- ✅ Kullanıcı silme (onay dialog'u ile)
- ✅ LocalStorage ile kalıcı veri saklama

### UI/UX
- ✅ Responsive tasarım
- ✅ Loading states
- ✅ Error handling
- ✅ Toast bildirimleri
- ✅ Modern UI bileşenleri (shadcn/ui benzeri)
- ✅ Smooth animasyonlar

## 🛠️ Teknoloji Stack

- **Frontend Framework:** React 19.1.0
- **Language:** TypeScript
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM v7
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI primitives
- **Icons:** Lucide React
- **Build Tool:** Vite
- **HTTP Client:** Axios

## 📁 Proje Yapısı

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

### Diğer Komutlar

```bash
# Production build
pnpm build

# Build önizleme
pnpm preview

# Linting
pnpm lint
```

## 🔧 Ana Bileşenler

### Layout (src/app/layout/Layout.tsx)
Ana sayfa düzeni ve navigation. Dinamik navigation item'ları ile genişletilebilir yapı.

```typescript
const navigationItems = [
  { path: "/products", label: "Ürünler" },
  { path: "/users", label: "Kullanıcılar" }
];
```

### Redux Store Yapısı

#### Product Store (src/modules/product/store/productSlice.ts)
- `fetchProducts`: Ürünleri yükler
- `createProduct`: Yeni ürün ekler
- `updateProduct`: Ürün günceller
- `deleteProduct`: Ürün siler
- `toggleFavorite`: Favori durumunu değiştirir
- `setFilters`: Filtreleri ayarlar

#### User Store (src/modules/user/store/userSlice.ts)
- `fetchUsers`: Kullanıcıları yükler
- `fetchUserById`: Belirli kullanıcıyı yükler
- `createUser`: Yeni kullanıcı ekler
- `updateUser`: Kullanıcı günceller
- `deleteUser`: Kullanıcı siler
- LocalStorage entegrasyonu ile kalıcı veri saklama

## 🎨 UI Bileşenleri

### Button (src/shared/components/ui/button.tsx)
Çoklu variant destekli button bileşeni:
- `default`, `destructive`, `outline`, `ghost` varyantları
- Farklı boyut seçenekleri
- Loading state desteği

### Card (src/shared/components/ui/card.tsx)
İçerik konteyner bileşeni:
- Header, Content, Footer alanları
- Responsive tasarım

### Toast System (src/shared/hooks/useToast.ts)
Basit toast bildirim sistemi:
- Success, error, info tipleri
- Otomatik kapanma (3 saniye)
- Özelleştirilebilir mesajlar

## 📊 Veri Yönetimi

### Mock Data
- **Products:** 20+ ürün verisi (src/shared/data/mockProducts.ts)
- **Users:** 4 kullanıcı verisi (src/shared/data/mockUsers.ts)

### LocalStorage Integration
Kullanıcı modülünde eklenen/güncellenen/silinen veriler localStorage'da kalıcı olarak saklanır:

```typescript
// Kullanıcı ekleme
saveUserToStorage(user);

// Kullanıcı güncelleme  
updateUserInStorage(id, userData);

// Kullanıcı silme
removeUserFromStorage(userId);
```

## 🔍 Özellik Detayları

### Ürün Filtreleme
- **Arama:** Ürün adına göre filtreleme
- **Kategori:** Dropdown ile kategori seçimi
- **Fiyat:** Min/Max fiyat aralığı
- Real-time filtreleme

### Toast Bildirimleri
- İşlem başarılı/başarısız durumlarında otomatik bildirim
- Özelleştirilebilir mesaj ve tip
- 3 saniye otomatik kapanma

### Dialog Onayları
- Silme işlemlerinde onay dialog'u
- Radix UI Alert Dialog kullanımı
- Erişilebilir (accessible) tasarım

## 🧪 Geliştirme Notları

### TypeScript
- Strict mode aktif
- Her modül için ayrı tip tanımları
- Generic tipler ve utility types kullanımı

### State Management Patterns
- Redux Toolkit ile modern state yönetimi
- Async thunk'lar ile API simülasyonu
- Immutable state updates

### Component Architecture
- Feature-based modül yapısı
- Reusable UI components
- Custom hooks kullanımı

## 🚀 Deployment

### Production Build
```bash
pnpm build
```

Build dosyaları `dist/` klasöründe oluşturulur. Bu dosyaları herhangi bir static hosting servisinde (Vercel, Netlify, GitHub Pages) çalıştırabilirsiniz.

## 📝 Geliştirme Kuralları

1. **Kod Standardı:** ESLint ve Prettier konfigürasyonu
2. **Commit Messages:** Conventional commits formatı
3. **Türkçe UI:** Kullanıcı arayüzü Türkçe
4. **English Code:** Değişken ve fonksiyon isimleri İngilizce
5. **No Comments:** Kod kendini açıklayacak şekilde yazılmıştır

## 🤝 Katkı

1. Bu repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🏃‍♂️ Çalıştırma

### Gereksinimler
- Node.js 18+ 
- pnpm (önerilen) veya npm

### Kurulum

1. **Projeyi klonlayın**
```bash
git clone <repository-url>
cd feCase
```

2. **Bağımlılıkları yükleyin**
```bash
pnpm install
# veya
npm install
```

3. **Geliştirme sunucusunu başlatın**
```bash
pnpm dev
# veya
npm run dev
```

4. **Tarayıcıda açın**
