export const SORTING_UPDATE = 'SORTING_UPDATE';
export const TICKET_BUYED = 'TICKET_BUYED';

export function updateSort(orderId) {
  return { type: SORTING_UPDATE, orderId };
}

export function ticketBuyedNotification(id) {
  return { type: TICKET_BUYED, id };
}
