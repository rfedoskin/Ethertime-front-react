export const ACCOUNT_UPDATE = 'ACCOUNT_UPDATE';
export const CONNECTING_UPDATE = 'CONNECTING_UPDATE';
export const METAMASK_CONNECT = 'METAMASK_CONNECT';

export function updateAccount(address, isConnected) {
  return {
    type: ACCOUNT_UPDATE,
    address,
    isConnected,
  };
}

export function updateConnectingStatus(isConnecting) {
  return {
    type: CONNECTING_UPDATE,
    isConnecting,
  };
}

export function updateMetamaskConnection(isConnecting) {
  return {
    type: METAMASK_CONNECT,
    isConnecting,
  };
}
