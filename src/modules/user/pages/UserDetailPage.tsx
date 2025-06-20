import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Edit2, Trash2, Mail, Phone, MapPin } from "lucide-react";
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
} from "../../../shared/components/ui/alert-dialog";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux";
import {
  fetchUserById,
  deleteUser,
  clearCurrentUser,
} from "../store/userSlice";
import { useToast } from "../../../shared/hooks/useToast";

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const { currentUser, loading, error } = useAppSelector(
    (state) => state.users
  );

  console.log(
    "UserDetailPage render - loading:",
    loading,
    "currentUser:",
    currentUser?.firstName
  );

  useEffect(() => {
    console.log("UserDetailPage - ID:", id);
    dispatch(clearCurrentUser());
    if (id) {
      console.log("Dispatching fetchUserById for ID:", id);
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (currentUser) {
      try {
        await dispatch(deleteUser(currentUser.id)).unwrap();
        toast({
          title: "Kullanıcı Başarıyla Silindi",
          variant: "default",
        });
        navigate("/users");
      } catch (error) {
        console.log(error);
        toast({
          title: "Kullanıcı Silinemedi",
          variant: "destructive",
        });
      }
    }
  };

  if (loading && !currentUser) {
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

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="text-lg text-gray-600">
          Kullanıcı bulunamadı (ID: {id})
        </div>
        <Link to="/users">
          <Button>Kullanıcılara Dön</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate("/users")}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kullanıcılara Dön</span>
        </Button>

        <div className="flex space-x-2">
          <Link to={`/users/${currentUser.id}/edit`}>
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
                  Kullanıcıyı silmek istediğinizden emin misiniz?
                </DialogTitle>
                <DialogDescription>
                  Bu işlem geri alınamaz. Kullanıcı kalıcı olarak silinecektir.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    İptal
                  </Button>
                </DialogClose>
                <Button variant="destructive" onClick={handleDelete}>
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
                src={currentUser.avatar}
                alt={`${currentUser.firstName} ${currentUser.lastName}`}
                className="w-full h-96 lg:h-full object-cover rounded-l-lg"
              />
            </div>

            <div className="p-8 space-y-6">
              <div>
                <h1 className="text-xl font-bold text-gray-900 mb-2">
                  {currentUser.firstName} {currentUser.lastName}
                </h1>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{currentUser.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{currentUser.phone}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                  <div className="text-gray-700">
                    <p>{currentUser.address.street}</p>
                    <p>
                      {currentUser.address.city}, {currentUser.address.state}
                    </p>
                    <p>{currentUser.address.zipCode}</p>
                    <p>{currentUser.address.country}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <span className="text-sm text-gray-500">Kayıt Tarihi</span>
                  <p className="font-medium">
                    {new Date(currentUser.createdAt).toLocaleDateString(
                      "tr-TR"
                    )}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Son Güncelleme</span>
                  <p className="font-medium">
                    {new Date(currentUser.updatedAt).toLocaleDateString(
                      "tr-TR"
                    )}
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
