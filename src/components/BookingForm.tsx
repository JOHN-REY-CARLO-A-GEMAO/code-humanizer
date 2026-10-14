import React, { useState } from 'react';
import { SpecialRequestsForm } from './SpecialRequestsForm';
import { BookingData, SpecialRequestsData } from '../types/booking';
import { calculateEstimatedAddonFees, formatSpecialRequestsSummary } from '../utils/pricing';

interface BookingFormProps {
  initialAccommodationId?: string;
  initialBasePrice?: number;
  onSubmitBooking?: (booking: BookingData) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  initialAccommodationId = 'villa-main',
  initialBasePrice = 12000,
  onSubmitBooking,
}) => {
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestCount, setGuestCount] = useState(2);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [specialRequestsData, setSpecialRequestsData] = useState<SpecialRequestsData>({
    petCount: 0,
    bonfireWoodSets: 0,
    lateCheckoutHours: 0,
    eventPurposes: [],
    otherEventPurpose: '',
    additionalNotes: '',
  });

  const feeBreakdown = calculateEstimatedAddonFees(specialRequestsData);
  const formattedSummary = formatSpecialRequestsSummary(specialRequestsData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('Please accept the Terms and Conditions before proceeding.');
      return;
    }

    const bookingPayload: BookingData = {
      guestName,
      guestEmail,
      guestPhone,
      accommodationId: initialAccommodationId,
      checkInDate,
      checkOutDate,
      guestCount,
      basePrice: initialBasePrice,
      reservationFee: Math.round(initialBasePrice * 0.5),
      specialRequestsData,
      specialRequests: formattedSummary,
      estimatedAddonFees: feeBreakdown.totalEstimatedFees,
      createdAt: new Date().toISOString(),
    };

    if (onSubmitBooking) {
      onSubmitBooking(bookingPayload);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl border border-[#E5DFD5] shadow-lg max-w-3xl mx-auto font-sans">
      <div className="mb-8 border-b border-[#E5DFD5] pb-4">
        <h1 className="text-2xl font-serif font-bold text-[#1C2D27]">Reservation Details</h1>
        <p className="text-sm text-[#5A6E65] mt-1">
          Hacienda de LuisAna Guest Reservation
        </p>
      </div>

      {/* Guest Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="guest-name" className="block text-xs font-semibold uppercase tracking-wider text-[#1C2D27] mb-1">
            Full Name
          </label>
          <input
            id="guest-name"
            type="text"
            required
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-[#D0C8B8] rounded-xl p-3 text-sm text-[#1C2D27] focus:ring-2 focus:ring-[#1C2D27] focus:outline-none"
            placeholder="e.g. Maria Santos"
          />
        </div>
        <div>
          <label htmlFor="guest-email" className="block text-xs font-semibold uppercase tracking-wider text-[#1C2D27] mb-1">
            Email Address
          </label>
          <input
            id="guest-email"
            type="email"
            required
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-[#D0C8B8] rounded-xl p-3 text-sm text-[#1C2D27] focus:ring-2 focus:ring-[#1C2D27] focus:outline-none"
            placeholder="e.g. maria@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div>
          <label htmlFor="guest-phone" className="block text-xs font-semibold uppercase tracking-wider text-[#1C2D27] mb-1">
            Phone Number
          </label>
          <input
            id="guest-phone"
            type="tel"
            required
            value={guestPhone}
            onChange={(e) => setGuestPhone(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-[#D0C8B8] rounded-xl p-3 text-sm text-[#1C2D27] focus:ring-2 focus:ring-[#1C2D27] focus:outline-none"
            placeholder="09171234567"
          />
        </div>
        <div>
          <label htmlFor="check-in-date" className="block text-xs font-semibold uppercase tracking-wider text-[#1C2D27] mb-1">
            Check-in Date
          </label>
          <input
            id="check-in-date"
            type="date"
            required
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-[#D0C8B8] rounded-xl p-3 text-sm text-[#1C2D27] focus:ring-2 focus:ring-[#1C2D27] focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="check-out-date" className="block text-xs font-semibold uppercase tracking-wider text-[#1C2D27] mb-1">
            Check-out Date
          </label>
          <input
            id="check-out-date"
            type="date"
            required
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-[#D0C8B8] rounded-xl p-3 text-sm text-[#1C2D27] focus:ring-2 focus:ring-[#1C2D27] focus:outline-none"
          />
        </div>
      </div>

      {/* Special Requests Form Module */}
      <div className="mb-8">
        <SpecialRequestsForm value={specialRequestsData} onChange={setSpecialRequestsData} />
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-start space-x-3 mb-8 text-xs text-[#5A6E65] leading-relaxed">
        <input
          id="terms-checkbox"
          type="checkbox"
          required
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className="mt-0.5 rounded text-[#1C2D27] focus:ring-[#1C2D27] h-4 w-4 border-[#D0C8B8]"
        />
        <label htmlFor="terms-checkbox" className="cursor-pointer">
          I have read and accept the <span className="underline font-medium text-[#1C2D27]">Terms and Conditions</span>, <span className="underline font-medium text-[#1C2D27]">Privacy Policy</span>, booking, cancellation, payment and smart-lock rules (version 2026-09-27). This is not accepted for me.
        </label>
      </div>

      {/* Submit Action */}
      <button
        type="submit"
        disabled={!termsAccepted}
        className="w-full md:w-auto px-8 py-4 bg-[#1C2D27] hover:bg-[#283E36] disabled:opacity-50 text-[#FAF8F5] font-medium rounded-full transition-all shadow-md flex items-center justify-center space-x-2 text-sm tracking-wide"
      >
        <span>Continue to downpayment</span>
        <span>→</span>
      </button>
    </form>
  );
};
