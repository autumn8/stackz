import { expect, describe, it, beforeEach } from "vitest";
import userListReducer, {
  blockUser,
  toggleFollowUser,
  unFollowUser,
} from "./userListSlice";

describe("counter reducer", () => {
  it("should handle initial state", () => {
    // assemble
    const expectedState = {
      error: null,
      isLoading: false,
      userList: [],
    };

    // act
    const actualState = userListReducer(undefined, {} as any);

    // assert
    expect(expectedState).toEqual(actualState);
  });

  describe("", () => {
    let initialState: any;
    beforeEach(() => {
      initialState = {
        error: null,
        isLoading: false,
        userList: [
          {
            accountId: 123,
            profileImage: "someImage",
            displayName: "Bob",
            reputation: 100,
            isFollowing: false,
            isBlocked: false,
          },
        ],
      };
    });
    describe("blockUser", () => {
      it("should not set isBlocked to true is user is not found", () => {
        // act
        const actualState = userListReducer(initialState, blockUser(13));

        // assert
        const user = actualState.userList[0];
        expect(user.isBlocked).toEqual(false);
      });

      it("should set isBlocked to true is user is found and isBlocked is currently false", () => {
        // act
        const actualState = userListReducer(initialState, blockUser(123));

        // assert
        const user = actualState.userList[0];
        expect(user.isBlocked).toEqual(true);
      });
    });
    describe("toggleFollowing", () => {
      it("should not set following to true is user is not found", () => {
        // act
        const actualState = userListReducer(initialState, toggleFollowUser(13));

        // assert
        const user = actualState.userList[0];
        expect(user.isFollowing).toEqual(false);
      });

      it("should set following to true is user is found and isFollowing is currently false", () => {
        // act
        const actualState = userListReducer(
          initialState,
          toggleFollowUser(123)
        );

        // assert
        const user = actualState.userList[0];
        expect(user.isFollowing).toEqual(true);
      });

      it("should set following to false is user is found and isFollowing is currently true", () => {
        // assemble
        initialState.userList[0].isFollowing = true;

        // act
        const actualState = userListReducer(
          initialState,
          toggleFollowUser(123)
        );

        // assert
        const user = actualState.userList[0];
        expect(user.isFollowing).toEqual(false);
      });
    });
    describe("unFollowUser", () => {
      it("should not set isFollowing to false is user is not found", () => {
        // assemble
        initialState.userList[0].isFollowing = true;

        // act
        const actualState = userListReducer(initialState, unFollowUser(13));

        // assert
        const user = actualState.userList[0];
        expect(user.isFollowing).toEqual(true);
      });

      it("should set isFollowing to true is user is found", () => {
        // asemble
        initialState.userList[0].isFollowing = true;

        // act
        const actualState = userListReducer(initialState, unFollowUser(123));

        // assert
        const user = actualState.userList[0];
        expect(user.isFollowing).toEqual(false);
      });
    });
  });
});
