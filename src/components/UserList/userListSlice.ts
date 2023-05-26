import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../User/user.interface";

interface UserListState {
  userList: User[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserListState = {
  userList: [],
  isLoading: false,
  error: null,
};

const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    getUserListStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    getUserListSuccess(state, action: PayloadAction<User[]>) {
      state.userList = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getUserListError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getUserListStart, getUserListSuccess, getUserListError } =
  userListSlice.actions;

export default userListSlice.reducer;
