import { MouseEvent, ReactElement, ReactFragment, useState } from "react";
import { User } from "./user.interface";
import "./UserInfo.scss";

interface UserInfoProps {
  user: User;
}

const UserInfo = ({ user }: UserInfoProps) => {
  const [showActionBar, setShowActionBar] = useState(false);

  const toggleUserActions = (event: MouseEvent): void => {
    console.log("toggle actions");
    setShowActionBar(!showActionBar);
  };

  const toggleFollowUser = (event: MouseEvent): void => {
    console.log("toggle follow");
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
    <div className="user-info" onClick={toggleUserActions}>
      <img src={user.profileImage} className="user-info__image" />
      <div className="user-info__content">
        <h1 className="user-info__name">{user.displayName}</h1>
        <h2 className="user-info__reputation">{user.reputation}</h2>
        <div
          className={`user-info__actions ${
            showActionBar ? "user-info__actions--active" : ""
          }`}
        >
          <button onClick={toggleFollowUser}>Follow</button>
          <button onClick={blockUser}>Block</button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
