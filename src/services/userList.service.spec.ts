import { Mock, expect, test, vi } from "vitest";
import axios from "axios";
import { getUserList } from "./userList.service";

vi.mock("axios");

// TODO add error response tests

test("getUserList", async () => {
  //assemble
  const apiResponseMock = {
    items: [
      {
        account_id: 10,
        display_name: "Bob",
        profile_image: "bob.jpg",
        reputation: 10,
      },
    ],
  };

  const expectedUserList = [
    {
      accountId: 10,
      displayName: "Bob",
      profileImage: "bob.jpg",
      reputation: 10,
      isBlocked: false,
      isFollowing: false,
    },
  ];

  (axios.get as Mock).mockResolvedValueOnce({
    data: apiResponseMock,
  });

  //act
  const actualUserList = await getUserList();

  //assert
  expect(expectedUserList).toStrictEqual(actualUserList);
});
