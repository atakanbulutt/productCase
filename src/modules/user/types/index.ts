export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  address: Address;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  address: Address;
}

export type UpdateUserDto = Partial<CreateUserDto>;

export interface UserState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}
