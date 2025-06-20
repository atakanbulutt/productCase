import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  User,
  UserState,
  CreateUserDto,
  UpdateUserDto,
} from "../types/index.ts";
import { mockUsers } from "../../../shared/data/mockUsers.ts";

const initialState: UserState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockUsers;
});

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const user = mockUsers.find((u) => u.id === id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData: CreateUserDto) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return newUser;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, data }: { id: string; data: UpdateUserDto }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { id, data };
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return id;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { id, data } = action.payload;
        const index = state.users.findIndex((user) => user.id === id);
        if (index !== -1) {
          state.users[index] = {
            ...state.users[index],
            ...data,
            updatedAt: new Date().toISOString(),
          };
        }
        if (state.currentUser && state.currentUser.id === id) {
          state.currentUser = {
            ...state.currentUser,
            ...data,
            updatedAt: new Date().toISOString(),
          };
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
        if (state.currentUser && state.currentUser.id === action.payload) {
          state.currentUser = null;
        }
      });
  },
});

export const { clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
