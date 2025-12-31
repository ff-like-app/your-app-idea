import { GuestAccount } from "@/types/account";
import { generateId } from "./storage";

// Parse the custom text format:
// 👤{name} : 🆔️ {game id}
// {Uid}:{password}
export const parseAccountsFromText = (text: string): GuestAccount[] => {
  const accounts: GuestAccount[] = [];
  const lines = text.trim().split("\n").filter(line => line.trim());

  for (let i = 0; i < lines.length; i += 2) {
    if (i + 1 >= lines.length) break;

    const headerLine = lines[i];
    const credentialsLine = lines[i + 1];

    // Parse header: 👤{name} : 🆔️ {game id}
    const headerMatch = headerLine.match(/👤(.+?)\s*:\s*🆔️?\s*(\d+)/);
    const name = headerMatch?.[1]?.trim() || undefined;
    const gameId = headerMatch?.[2]?.trim() || undefined;

    // Parse credentials: {uid}:{password}
    const credMatch = credentialsLine.match(/(\d+):(.+)/);
    if (credMatch) {
      const uid = credMatch[1].trim();
      const password = credMatch[2].trim();

      accounts.push({
        id: generateId(),
        name,
        gameId,
        uid,
        password,
        createdAt: Date.now(),
      });
    }
  }

  return accounts;
};

// Generate the JSON format for the guest file
export const generateGuestJson = (account: GuestAccount): string => {
  return JSON.stringify({
    guest_account_info: {
      "com.garena.msdk.guest_password": account.password,
      "com.garena.msdk.guest_uid": account.uid,
    },
  }, null, 2);
};
