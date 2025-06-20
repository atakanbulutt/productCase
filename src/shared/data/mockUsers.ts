import type { User } from "../../modules/user/types";

export const mockUsers: User[] = [
  {
    id: "1",
    firstName: "Ahmet",
    lastName: "Yılmaz",
    email: "ahmet.yilmaz@email.com",
    phone: "+90 532 123 4567",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    address: {
      street: "Atatürk Caddesi No: 123",
      city: "İstanbul",
      state: "Beyoğlu",
      zipCode: "34433",
      country: "Turkey",
    },
    createdAt: "2024-01-01T09:00:00Z",
    updatedAt: "2024-01-01T09:00:00Z",
  },
  {
    id: "2",
    firstName: "Zeynep",
    lastName: "Demir",
    email: "zeynep.demir@email.com",
    phone: "+90 533 234 5678",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b665?w=100",
    address: {
      street: "Bağdat Caddesi No: 456",
      city: "İstanbul",
      state: "Kadıköy",
      zipCode: "34710",
      country: "Turkey",
    },
    createdAt: "2024-01-02T10:00:00Z",
    updatedAt: "2024-01-02T10:00:00Z",
  },
  {
    id: "3",
    firstName: "Mehmet",
    lastName: "Kaya",
    email: "mehmet.kaya@email.com",
    phone: "+90 534 345 6789",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    address: {
      street: "Cumhuriyet Bulvarı No: 789",
      city: "Ankara",
      state: "Çankaya",
      zipCode: "06420",
      country: "Turkey",
    },
    createdAt: "2024-01-03T11:00:00Z",
    updatedAt: "2024-01-03T11:00:00Z",
  },
  {
    id: "4",
    firstName: "Ayşe",
    lastName: "Özkan",
    email: "ayse.ozkan@email.com",
    phone: "+90 535 456 7890",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    address: {
      street: "Konak Meydanı No: 12",
      city: "İzmir",
      state: "Konak",
      zipCode: "35250",
      country: "Turkey",
    },
    createdAt: "2024-01-04T12:00:00Z",
    updatedAt: "2024-01-04T12:00:00Z",
  },
];
