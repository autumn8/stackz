import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserListStart,
  getUserListSuccess,
  getUserListError,
} from "./userListSlice";

import UserInfo from "../User/UserInfo";
import "./UserList.scss";
import { RootState } from "../../store";
import { getUserList } from "../../services/userList.service";

const UserList = () => {
  const dispatch = useDispatch();
  const { userList, isLoading, error } = useSelector(
    (state: RootState) => state.userList
  );

  useEffect(() => {
    dispatch(getUserListStart());
    getUserList()
      .then((users) => dispatch(getUserListSuccess(users)))
      .catch((error) => dispatch(getUserListError(error.message)));
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex-container flex-column">
        <div className="user-list__message">Fetching users..</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-container flex-column">
        <div className="user-list__message">
          There was an error loading users. ({error})
        </div>
      </div>
    );
  }

  if (!userList?.length) {
    return (
      <div className="flex-container flex-column">
        <div className="user-list__message">Sorry, no users to display :(</div>
      </div>
    );
  }

  return (
    <div className="user-list">
      {userList.map((user) => (
        <UserInfo key={user.accountId} user={user} />
      ))}
    </div>
  );
};

export default UserList;
