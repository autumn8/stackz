import { MouseEvent, useState } from "react";
import { User } from "./user.interface";
import "./UserInfo.scss";
import { useDispatch } from "react-redux";
import {
  toggleFollowUser,
  blockUser,
  unFollowUser,
} from "../UserList/userListSlice";

interface UserInfoProps {
  user: User;
}

const UserInfo = ({ user }: UserInfoProps) => {
  const dispatch = useDispatch();
  const [showActionBar, setShowActionBar] = useState(false);

  const toggleUserActions = (): void => {
    setShowActionBar(!showActionBar);
  };

  const onToggleFollowUser = (event: MouseEvent): void => {
    dispatch(toggleFollowUser(user.accountId));
    if (event.target === event.currentTarget) {
      event.stopPropagation();
    }
  };

  const onBlockUser = (event: MouseEvent): void => {
    dispatch(blockUser(user.accountId));
    setShowActionBar(false);
    dispatch(unFollowUser(user.accountId));

    if (event.target === event.currentTarget) {
      event.stopPropagation();
    }
  };

  return (
    <article
      className={`user-info ${user.isBlocked ? "user-info--blocked" : ""}`}
      onClick={toggleUserActions}
    >
      <img src={user.profileImage} className="user-info__image" />
      <div className="user-info__content">
        <div className="flex-container flex-row align-center">
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
            onClick={onToggleFollowUser}
            className="user-info__action-button"
          >
            {user.isFollowing ? "Unfollow" : "Follow"}
          </button>
          <button onClick={onBlockUser} className="user-info__action-button">
            Block
          </button>
        </div>
      </div>
    </article>
  );
};

export default UserInfo;
