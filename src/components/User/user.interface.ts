export interface User {
  accountId: number;
  displayName: string;
  profileImage: string;
  reputation: number;
  isFollowing: boolean;
  isBlocked: boolean;
}

export interface ApiUser {
  account_id: number;
  display_name: string;
  profile_image: string;
  reputation: number;
}
