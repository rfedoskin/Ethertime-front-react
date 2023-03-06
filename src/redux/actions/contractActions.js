export const CONTRACT_LOAD = 'CONTRACT_LOAD';
export const CONTRACT_SET = 'CONTRACT_SET';

export function setContract(contract) {
  return { type: CONTRACT_SET, contract };
}
