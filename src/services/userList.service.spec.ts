import { Mock, expect, test, vi } from "vitest";
import axios from "axios";
import { getUserList } from "./userList.service";

vi.mock("axios");

test("getUserList", async () => {
  //assemble
  const apiResponseMock = {
    items: [{ display_name: "Bob", profile_image: "bob.jpg", reputation: 10 }],
  };

  const expectedUserList = [
    { displayName: "Bob", profileImage: "bob.jpg", reputation: 10 },
  ];

  (axios.get as Mock).mockResolvedValueOnce({
    data: apiResponseMock,
  });

  //act
  const actualUserList = await getUserList();

  //assert
  expect(expectedUserList).toStrictEqual(actualUserList);
});
