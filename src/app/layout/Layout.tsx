import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "../../shared/components/ui/button";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-xl font-bold text-gray-900">
                Product Manager
              </Link>
              <nav className="flex space-x-4">
                <Link to="/products">
                  <Button
                    variant={
                      location.pathname.startsWith("/products")
                        ? "default"
                        : "ghost"
                    }
                  >
                    Ürünler
                  </Button>
                </Link>
                <Link to="/users">
                  <Button
                    variant={
                      location.pathname.startsWith("/users")
                        ? "default"
                        : "ghost"
                    }
                  >
                    Kullanıcılar
                  </Button>
                </Link>
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
