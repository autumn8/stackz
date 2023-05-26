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
    blockUser(state, { payload: userId }: PayloadAction<number>) {
      const user = state.userList.find((user) => user.accountId === userId);
      if (user) user.isBlocked = true;
    },
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
    toggleFollowUser(state, { payload: userId }: PayloadAction<number>) {
      const user = state.userList.find((user) => user.accountId === userId);
      if (user) user.isFollowing = !user.isFollowing;
    },
    unFollowUser(state, { payload: userId }: PayloadAction<number>) {
      const user = state.userList.find((user) => user.accountId === userId);
      if (user) user.isFollowing = false;
    },
  },
});

export const {
  getUserListStart,
  getUserListSuccess,
  getUserListError,
  blockUser,
  toggleFollowUser,
  unFollowUser,
} = userListSlice.actions;

export default userListSlice.reducer;
