export const users: Record<string, UserData> = {
  "cabinet comptable": {
    email: "ca-1752832631642+NotSend@gmail.com",
    password: "?4$5W02)",
    enterpriseId: "685437",
    enterpriseName: "qa2826208904",
  },
};

export function getUser(key: string): UserData {
  const user = users[key];
  if (!user) {
    throw new Error(`User "${key}" not found in credentials`);
  }
  return user;
}
