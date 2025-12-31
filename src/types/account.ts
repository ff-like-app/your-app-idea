export interface GuestAccount {
  id: string;
  name?: string;
  gameId?: string;
  uid: string;
  password: string;
  createdAt: number;
}

export interface GuestAccountInfo {
  guest_account_info: {
    "com.garena.msdk.guest_password": string;
    "com.garena.msdk.guest_uid": string;
  };
}
