import { useEffect, useState } from "react";
import { getUserList } from "../../services/userList.service";
import { User } from "../User/user.interface";
import UserInfo from "../User/UserInfo";
import "./UserList.scss";
import { logError } from "../../services/errorLogger.service";

const UserList = () => {
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    try {
      // TODO add loading indicator
      const userList = await getUserList();
      setUserList(userList);
      // TODO add empty array message to view.
    } catch (error) {
      logError(error as Error);
      // TODO add error display message to view
    }
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
