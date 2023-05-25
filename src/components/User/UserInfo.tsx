import { User } from "./user.interface";
import "./UserInfo.scss";

interface UserInfoProps {
  user: User;
}

const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <div className="user-info">
      <img src={user.profileImage} className="user-info__image" />
      <div className="user-info__content">
        <h1 className="user-info__name">{user.displayName}</h1>
        <h2 className="user-info__reputation">{user.reputation}</h2>
        <div className="user-info__actions">
          <button>Follow</button>
          <button>Block</button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
