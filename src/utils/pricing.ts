import { SpecialRequestsData, FeeBreakdownItem, FeeBreakdownResult } from '../types/booking';

export const RATES = {
  PET_FEE_PER_PET: 300,
  BONFIRE_WOOD_PER_SET: 150,
  LATE_CHECKOUT_PER_HOUR: 250,
} as const;

export function calculateEstimatedAddonFees(data: SpecialRequestsData): FeeBreakdownResult {
  const items: FeeBreakdownItem[] = [];
  let totalEstimatedFees = 0;

  // Pets
  if (data.petCount > 0) {
    const amount = data.petCount * RATES.PET_FEE_PER_PET;
    items.push({
      label: 'Pet Sanitation Fee',
      quantityText: `${data.petCount} ${data.petCount === 1 ? 'pet' : 'pets'}`,
      unitRateText: `₱${RATES.PET_FEE_PER_PET}/pet`,
      amount,
      requiresAdminReview: true,
    });
    totalEstimatedFees += amount;
  }

  // Bonfire Wood
  if (data.bonfireWoodSets > 0) {
    const amount = data.bonfireWoodSets * RATES.BONFIRE_WOOD_PER_SET;
    items.push({
      label: 'Bonfire Wood',
      quantityText: `${data.bonfireWoodSets} ${data.bonfireWoodSets === 1 ? 'set' : 'sets'}`,
      unitRateText: `₱${RATES.BONFIRE_WOOD_PER_SET}/set`,
      amount,
      requiresAdminReview: true,
    });
    totalEstimatedFees += amount;
  }

  // Late Checkout
  if (data.lateCheckoutHours > 0) {
    const amount = data.lateCheckoutHours * RATES.LATE_CHECKOUT_PER_HOUR;
    items.push({
      label: 'Late Checkout',
      quantityText: `${data.lateCheckoutHours} ${data.lateCheckoutHours === 1 ? 'hour' : 'hours'} after 12:00 PM`,
      unitRateText: `₱${RATES.LATE_CHECKOUT_PER_HOUR}/hour`,
      amount,
      requiresAdminReview: true,
    });
    totalEstimatedFees += amount;
  }

  return {
    items,
    totalEstimatedFees,
  };
}

/**
 * Formats structured special requests data into a clear human-readable string.
 * This guarantees backwards compatibility with legacy Flutter admin apps and database fields
 * that expect `specialRequests` as a single text string.
 */
export function formatSpecialRequestsSummary(data: SpecialRequestsData): string {
  const parts: string[] = [];

  if (data.petCount > 0) {
    parts.push(`Pet count: ${data.petCount} (₱${data.petCount * RATES.PET_FEE_PER_PET})`);
  }

  if (data.bonfireWoodSets > 0) {
    parts.push(`Bonfire wood: ${data.bonfireWoodSets} set(s) (₱${data.bonfireWoodSets * RATES.BONFIRE_WOOD_PER_SET})`);
  }

  if (data.lateCheckoutHours > 0) {
    parts.push(`Late checkout: ${data.lateCheckoutHours} hr(s) after noon (₱${data.lateCheckoutHours * RATES.LATE_CHECKOUT_PER_HOUR})`);
  }

  if (data.eventPurposes.length > 0) {
    const purposes = [...data.eventPurposes];
    const otherIdx = purposes.indexOf('Other');
    if (otherIdx !== -1 && data.otherEventPurpose) {
      purposes[otherIdx] = `Other (${data.otherEventPurpose.trim()})`;
    }
    parts.push(`Event/Purpose: ${purposes.join(', ')}`);
  }

  if (data.additionalNotes && data.additionalNotes.trim()) {
    parts.push(`Notes: ${data.additionalNotes.trim()}`);
  }

  return parts.join('; ');
}
