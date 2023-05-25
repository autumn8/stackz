import { ApiUser, User } from "../components/User/user.interface";
import axios from "axios";

const USER_LIST_URL =
  "http://api.stackexchange.com/2.2/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow";

/**
 * Gets a mapped array of users with {profileImage,  displayName, reputation}.
 * @async
 * @method
 * @returns {Promise} Promise object resolves with list of users with profileImage, displayName & reputation properties
 */

async function getUserList(): Promise<User[]> {
  const users = await fetchUsers();
  return users.map((user: ApiUser) => {
    const { account_id, profile_image, display_name, reputation } = user;
    return {
      accountId: account_id,
      profileImage: profile_image,
      displayName: display_name,
      reputation,
    };
  });
}

/**
 * Fetches list of users.
 * @async
 * @method
 * @returns {Promise} Promise object resolves with list of users
 */

async function fetchUsers() {
  const response = await axios.get(USER_LIST_URL);
  return response.data.items;
}

export { getUserList };
