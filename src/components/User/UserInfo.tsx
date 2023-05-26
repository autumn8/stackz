import { MouseEvent, useState } from "react";
import { User } from "./user.interface";
import "./UserInfo.scss";
import { useDispatch } from "react-redux";
import { toggleFollowing } from "../UserList/userListSlice";

interface UserInfoProps {
  user: User;
}

const UserInfo = ({ user }: UserInfoProps) => {
  const dispatch = useDispatch();
  const [showActionBar, setShowActionBar] = useState(false);

  const toggleUserActions = (event: MouseEvent): void => {
    console.log("toggle actions");
    setShowActionBar(!showActionBar);
  };

  const toggleFollowUser = (event: MouseEvent): void => {
    console.log("toggle follow");
    dispatch(toggleFollowing(user.accountId));
    if (event.target === event.currentTarget) {
      event.stopPropagation();
    }
  };

  const blockUser = (event: MouseEvent) => {
    console.log("block user");
    if (event.target === event.currentTarget) {
      event.stopPropagation();
    }
  };

  return (
    <div
      className={`user-info ${user.isBlocked ? "user-info--blocked" : ""}`}
      onClick={toggleUserActions}
    >
      <img src={user.profileImage} className="user-info__image" />
      <div className="user-info__content">
        <div className="flex-container flex-row">
          <h1 className="user-info__name">{user.displayName}</h1>
          {user.isFollowing && <div className="user-info__following"></div>}
        </div>

        <h2 className="user-info__reputation">{user.reputation}</h2>

        <div
          className={`user-info__actions ${
            showActionBar ? "user-info__actions--active" : ""
          }`}
        >
          <button
            onClick={toggleFollowUser}
            className="user-info__action-button"
          >
            {user.isFollowing ? "UnFollow" : "Follow"}
          </button>
          <button onClick={blockUser} className="user-info__action-button">
            Block
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
