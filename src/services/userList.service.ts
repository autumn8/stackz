import { logError } from "./errorLogger.service";
import { ApiUser, User } from "../components/User/user.interface";

const USER_LIST_URL =
  "http://api.stackexchange.com/2.2/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow";

/**
 * Gets a mapped array of users with {profileImage,  displayName, reputation}.
 * @async
 * @method
 * @returns {Promise} Promise object resolves with list of users with profileImage, displayName & reputation properties
 */

async function getUserList(): Promise<User[]> {
  try {
    const users = await fetchUsers();
    return users.map((user: ApiUser) => {
      const { profile_image, display_name, reputation } = user;
      if (!display_name) throw Error("No user name");
      return {
        profileImage: profile_image,
        displayName: display_name,
        reputation,
      };
    });
  } catch (error) {
    logError(error as Error);
    return [];
  }
}

/**
 * Fetches list of users.
 * @async
 * @method
 * @returns {Promise} Promise object resolves with list of users
 */

async function fetchUsers() {
  const response = await fetch(USER_LIST_URL);
  const json = await response.json();
  return json.items;
}

export { getUserList };
