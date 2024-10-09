//"eip155:1/erc20:0x6b175474e89094c44da98b954eedeac495271d0f"
export type CAIP = {
  chainId: number;
  namespace: string;
  address: string;
};

export const decode = (codedId: string) => {
  // write a way to split codedId into chainId, namespace, and address
  // it should handle both of these cases:
  // eip155:1:0x7e90e03654732abedf89Faf87f05BcD03ACEeFdc or eip155:1/erc20:0x6b175474e89094c44da98b954eedeac495271d0f

  const parts = codedId.split(/[:/]/);
  if (parts.length === 3) {
    return {
      chainId: parseInt(parts[1]),
      namespace: "",
      address: parts[2],
    };
  } else if (parts.length === 4) {
    return {
      chainId: parseInt(parts[1]),
      namespace: parts[2],
      address: parts[3],
    };
  } else {
    throw new Error("Invalid codedId format");
  }
};
