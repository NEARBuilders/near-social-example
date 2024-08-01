const contractPerNetwork = {
  testnet: "v1.social08.testnet",
  mainnet: "social.near",
};

export const NetworkId = process.env.NEXT_PUBLIC_NETWORK;
export const SocialContractAccountId = contractPerNetwork[NetworkId];
