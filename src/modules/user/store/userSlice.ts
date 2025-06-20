import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  User,
  UserState,
  CreateUserDto,
  UpdateUserDto,
} from "../types/index.ts";
import { mockUsers as initialMockUsers } from "../../../shared/data/mockUsers.ts";

const getStoredUsers = (): User[] => {
  const stored = localStorage.getItem("addedUsers");
  return stored ? JSON.parse(stored) : [];
};

const saveUserToStorage = (user: User) => {
  const existingUsers = getStoredUsers();
  const updatedUsers = [...existingUsers, user];
  localStorage.setItem("addedUsers", JSON.stringify(updatedUsers));
};

const removeUserFromStorage = (id: string) => {
  const existingUsers = getStoredUsers();
  const updatedUsers = existingUsers.filter((user) => user.id !== id);
  localStorage.setItem("addedUsers", JSON.stringify(updatedUsers));
};

const updateUserInStorage = (id: string, userData: UpdateUserDto) => {
  console.log("updateUserInStorage called with:", id, userData);
  const existingUsers = getStoredUsers();
  console.log("Existing users:", existingUsers.length);
  const userIndex = existingUsers.findIndex((user) => user.id === id);
  console.log("Found user index in storage:", userIndex);
  if (userIndex !== -1) {
    existingUsers[userIndex] = {
      ...existingUsers[userIndex],
      ...userData,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem("addedUsers", JSON.stringify(existingUsers));
    console.log("User updated in localStorage");
  } else {
    console.log(
      "User not found in localStorage - this is normal for mock users"
    );
  }
};

const mockUsers = [...initialMockUsers, ...getStoredUsers()];

const initialState: UserState = {
  users: mockUsers,
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
  async (id: string, { getState }) => {
    console.log("fetchUserById called with ID:", id);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const state = getState() as { users: UserState };
    const user = state.users.users.find((u) => u.id === id);

    console.log("Found user:", user);
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
        state.users = [
          ...action.payload,
          ...state.users.filter(
            (u) => !action.payload.find((mock) => mock.id === u.id)
          ),
        ];
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        console.log("fetchUserById.fulfilled - setting loading to false");
        state.loading = false;
        state.currentUser = action.payload;
        console.log("Current user set:", action.payload);
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        saveUserToStorage(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log("updateUser.fulfilled called with:", action.payload);
        const { id, data } = action.payload;
        const index = state.users.findIndex((user) => user.id === id);
        console.log("User index found:", index);
        if (index !== -1) {
          state.users[index] = {
            ...state.users[index],
            ...data,
            updatedAt: new Date().toISOString(),
          };
          console.log("User updated in state");
        }
        console.log("Calling updateUserInStorage");
        updateUserInStorage(id, data);
        console.log("updateUserInStorage completed");
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
        removeUserFromStorage(action.payload);
        if (state.currentUser && state.currentUser.id === action.payload) {
          state.currentUser = null;
        }
      });
  },
});

export const { clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
