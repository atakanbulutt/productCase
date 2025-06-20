import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "../../shared/components/ui/button";

const navigationItems = [
  {
    path: "/products",
    label: "Ürünler",
  },
  {
    path: "/users",
    label: "Kullanıcılar",
  },
];

export default function Layout() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  const getButtonStyle = (path: string) => ({
    backgroundColor: isActive(path) ? "#DBEAFE" : "transparent",
    color: "#000000",
    borderBottom: isActive(path)
      ? "3px solid ##DBEAFE"
      : "3px solid transparent",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-xl font-bold text-gray-900">
                Product Catalog
              </Link>
              <nav className="flex space-x-4">
                {navigationItems.map((item) => (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant={isActive(item.path) ? "default" : "ghost"}
                      style={getButtonStyle(item.path)}
                      className="transition-all duration-200"
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
