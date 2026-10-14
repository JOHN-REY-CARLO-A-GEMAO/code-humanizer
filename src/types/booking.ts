export interface SpecialRequestsData {
  petCount: number;
  bonfireWoodSets: number;
  lateCheckoutHours: number;
  eventPurposes: string[];
  otherEventPurpose?: string;
  additionalNotes?: string;
}

export interface BookingData {
  id?: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  accommodationId: string;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  basePrice: number;
  reservationFee: number;
  specialRequestsData: SpecialRequestsData;
  /** Legacy free-text field maintained for backward compatibility with older readers / admin app */
  specialRequests: string;
  estimatedAddonFees: number;
  createdAt?: string;
}

export interface FeeBreakdownItem {
  label: string;
  quantityText: string;
  unitRateText: string;
  amount: number;
  requiresAdminReview: boolean;
}

export interface FeeBreakdownResult {
  items: FeeBreakdownItem[];
  totalEstimatedFees: number;
}
