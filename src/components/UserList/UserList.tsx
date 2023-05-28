import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserListStart,
  getUserListSuccess,
  getUserListError,
} from "./userListSlice";

import UserInfo from "../User/UserInfo";
import { RootState } from "../../store";
import { getUserList } from "../../services/userList.service";

import "./UserList.scss";

const UserList = () => {
  const [filter, setFilter] = useState("");
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

  const onFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredUserList = userList.filter((user) =>
    user.displayName.toLowerCase().includes(filter.toLowerCase())
  );

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
      <>
        <header>
          <input
            type="text"
            value={filter}
            onChange={onFilterChange}
            placeholder="Filter users"
          />
        </header>
        <div className="flex-container flex-column">
          <div className="user-list__message">
            Sorry, no users to display :().
          </div>
        </div>
      </>
    );
  }

  return (
    <section>
      <header>
        <input
          className="user-list__filter"
          type="text"
          value={filter}
          onChange={onFilterChange}
          placeholder="Filter users"
        />
      </header>
      <div className="user-list">
        {filteredUserList.map((user) => (
          <UserInfo key={user.accountId} user={user} />
        ))}
      </div>
    </section>
  );
};

export default UserList;
