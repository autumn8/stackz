import { User } from "./user.interface";

interface UserInfoProps {
  user: User;
}

const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <div className="user-info">
      <img src={user.profileImage} />
      <h1>{user.displayName}</h1>
      <h2>{user.reputation}</h2>
    </div>
  );
};

export default UserInfo;
