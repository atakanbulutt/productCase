import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, User, Mail, Phone } from "lucide-react";
import { Button } from "../../../shared/components/ui/button";
import { Card, CardContent } from "../../../shared/components/ui/card";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux";
import { fetchUsers } from "../store/userSlice";
import type { User as UserType } from "../types/index";

export default function UserListPage() {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

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
        <h1 className="text-xl font-bold text-gray-900">Kullanıcılar</h1>
        <div className="flex justify-between items-center">
          <Link to="/users/add">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Yeni Kullanıcı
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user: UserType) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={user.avatar}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {user.firstName} {user.lastName}
                  </h3>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{user.phone}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Link to={`/users/${user.id}`}>
                      <Button size="sm" variant="outline">
                        <User className="w-4 h-4 mr-1" />
                        Detay
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Kullanıcı bulunamadı</p>
        </div>
      )}
    </div>
  );
}
