import { useEffect, useState } from "react";
import { getUserList } from "./userList.service";
import { User } from "../User/user.interface";
import UserInfo from "../User/UserInfo";

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
    <>
      {userList.map((user, i) => (
        <UserInfo key={i} user={user} />
      ))}
    </>
  );
};

export default UserList;
