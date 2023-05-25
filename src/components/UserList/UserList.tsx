import { useEffect, useState } from "react";
import { getUserList } from "../../services/userList.service";
import { User } from "../User/user.interface";
import UserInfo from "../User/UserInfo";
import "./UserList.scss";

const UserList = () => {
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    try {
      const userList = await getUserList();
      setUserList(userList);
    } catch (error) {
      // TODO: handle error more elegantly.
      console.error(error);
    }
  }

  return (
    <div className="user-list">
      {userList.map((user, i) => (
        <UserInfo key={i} user={user} />
      ))}
    </div>
  );
};

export default UserList;
