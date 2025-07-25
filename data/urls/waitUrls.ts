export const responseUrlsToWait: Record<string, Record<string, RegExp>> = {
  dashboard: {
    getEntreprise: /api\/app\/Users\/\d+\/Enterprises/,
  },
  myAccount: {
    profile: /api\/app\/users\/\d+\/profile/,
    identity: /api\/app\/Users\/Identity/,
  },
};

export const urlsToWait: Record<string, Record<string, string>> = {
  home: {
    entreprise: "home?EnterpriseStatus=Active",
  },
  myAccount: {
    profile: "/profile",
  },
};
