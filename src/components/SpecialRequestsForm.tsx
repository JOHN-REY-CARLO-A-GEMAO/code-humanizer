import React from 'react';
import { SpecialRequestsData } from '../types/booking';
import { calculateEstimatedAddonFees, RATES } from '../utils/pricing';

interface SpecialRequestsFormProps {
  value: SpecialRequestsData;
  onChange: (value: SpecialRequestsData) => void;
}

const EVENT_PURPOSE_OPTIONS = [
  'Reunion / Team Building',
  'Wedding Preparation',
  'Photoshoot / Shoot',
  'Birthday / Anniversary',
  'Rest & Relaxation',
  'Other',
];

export const SpecialRequestsForm: React.FC<SpecialRequestsFormProps> = ({ value, onChange }) => {
  const feeBreakdown = calculateEstimatedAddonFees(value);

  const handlePetChange = (delta: number) => {
    const nextCount = Math.max(0, value.petCount + delta);
    onChange({ ...value, petCount: nextCount });
  };

  const handleBonfireChange = (delta: number) => {
    const nextCount = Math.max(0, value.bonfireWoodSets + delta);
    onChange({ ...value, bonfireWoodSets: nextCount });
  };

  const handleLateCheckoutChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...value, lateCheckoutHours: parseInt(e.target.value, 10) || 0 });
  };

  const togglePurpose = (purpose: string) => {
    const exists = value.eventPurposes.includes(purpose);
    let updatedPurposes: string[];
    if (exists) {
      updatedPurposes = value.eventPurposes.filter((p) => p !== purpose);
    } else {
      updatedPurposes = [...value.eventPurposes, purpose];
    }
    onChange({ ...value, eventPurposes: updatedPurposes });
  };

  const isOtherSelected = value.eventPurposes.includes('Other');

  return (
    <div className="bg-[#FAF8F5] text-[#1C2D27] p-6 rounded-2xl border border-[#E5DFD5] shadow-sm max-w-2xl mx-auto font-serif">
      <div className="border-b border-[#E5DFD5] pb-4 mb-6">
        <h2 className="text-xl font-medium tracking-wide text-[#1C2D27] uppercase text-xs font-sans tracking-widest text-[#5A6E65]">
          Special Requests & Add-ons
        </h2>
        <p className="text-sm text-[#5A6E65] font-sans mt-1">
          Customize your stay with optional add-ons and tell us about your occasion.
        </p>
      </div>

      {/* Steppers Section: Pets & Bonfire */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 font-sans">
        {/* Pet Counter */}
        <div className="bg-white p-4 rounded-xl border border-[#E5DFD5] flex items-center justify-between shadow-sm">
          <div>
            <label htmlFor="pet-counter-display" className="block text-sm font-semibold text-[#1C2D27]">
              Pets
            </label>
            <p className="text-xs text-[#6B7C73]">₱{RATES.PET_FEE_PER_PET} per pet for sanitation</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => handlePetChange(-1)}
              disabled={value.petCount <= 0}
              aria-label="Decrease pet count"
              className="w-8 h-8 rounded-full border border-[#D0C8B8] flex items-center justify-center text-lg font-bold text-[#1C2D27] hover:bg-[#F2ECE1] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              −
            </button>
            <span id="pet-counter-display" className="text-base font-semibold w-5 text-center" aria-live="polite">
              {value.petCount}
            </span>
            <button
              type="button"
              onClick={() => handlePetChange(1)}
              aria-label="Increase pet count"
              className="w-8 h-8 rounded-full border border-[#D0C8B8] flex items-center justify-center text-lg font-bold text-[#1C2D27] hover:bg-[#F2ECE1] transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Bonfire Wood Counter */}
        <div className="bg-white p-4 rounded-xl border border-[#E5DFD5] flex items-center justify-between shadow-sm">
          <div>
            <label htmlFor="bonfire-counter-display" className="block text-sm font-semibold text-[#1C2D27]">
              Bonfire Wood
            </label>
            <p className="text-xs text-[#6B7C73]">₱{RATES.BONFIRE_WOOD_PER_SET} per bundle / set</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => handleBonfireChange(-1)}
              disabled={value.bonfireWoodSets <= 0}
              aria-label="Decrease bonfire wood sets"
              className="w-8 h-8 rounded-full border border-[#D0C8B8] flex items-center justify-center text-lg font-bold text-[#1C2D27] hover:bg-[#F2ECE1] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              −
            </button>
            <span id="bonfire-counter-display" className="text-base font-semibold w-5 text-center" aria-live="polite">
              {value.bonfireWoodSets}
            </span>
            <button
              type="button"
              onClick={() => handleBonfireChange(1)}
              aria-label="Increase bonfire wood sets"
              className="w-8 h-8 rounded-full border border-[#D0C8B8] flex items-center justify-center text-lg font-bold text-[#1C2D27] hover:bg-[#F2ECE1] transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Late Checkout Selector */}
      <div className="bg-white p-4 rounded-xl border border-[#E5DFD5] mb-6 font-sans shadow-sm">
        <label htmlFor="late-checkout-select" className="block text-sm font-semibold text-[#1C2D27] mb-1">
          Approved Late Checkout
        </label>
        <p className="text-xs text-[#6B7C73] mb-3">
          ₱{RATES.LATE_CHECKOUT_PER_HOUR}/hour after standard 12:00 PM checkout time (subject to availability).
        </p>
        <select
          id="late-checkout-select"
          value={value.lateCheckoutHours}
          onChange={handleLateCheckoutChange}
          className="w-full bg-[#FAF8F5] border border-[#D0C8B8] rounded-lg p-2.5 text-sm text-[#1C2D27] focus:ring-2 focus:ring-[#1C2D27] focus:outline-none"
        >
          <option value={0}>Standard checkout (12:00 PM)</option>
          <option value={1}>1 hour extended (1:00 PM) (+₱250)</option>
          <option value={2}>2 hours extended (2:00 PM) (+₱500)</option>
          <option value={3}>3 hours extended (3:00 PM) (+₱750)</option>
          <option value={4}>4 hours extended (4:00 PM) (+₱1,000)</option>
        </select>
      </div>

      {/* Event / Purpose Selectable Chips */}
      <div className="mb-6 font-sans">
        <label className="block text-sm font-semibold text-[#1C2D27] mb-1">
          Purpose of Stay / Event Type
        </label>
        <p className="text-xs text-[#6B7C73] mb-3">
          Select all that apply to help us prepare for your visit.
        </p>
        <div className="flex flex-wrap gap-2">
          {EVENT_PURPOSE_OPTIONS.map((purpose) => {
            const isSelected = value.eventPurposes.includes(purpose);
            return (
              <button
                key={purpose}
                type="button"
                onClick={() => togglePurpose(purpose)}
                aria-pressed={isSelected}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  isSelected
                    ? 'bg-[#1C2D27] text-white border-[#1C2D27] shadow-sm'
                    : 'bg-white text-[#1C2D27] border-[#D0C8B8] hover:bg-[#F2ECE1]'
                }`}
              >
                {isSelected ? '✓ ' : ''}{purpose}
              </button>
            );
          })}
        </div>

        {/* Conditional "Other" Details Input */}
        {isOtherSelected && (
          <div className="mt-3">
            <label htmlFor="other-event-input" className="block text-xs font-medium text-[#1C2D27] mb-1">
              Please specify the occasion or event details:
            </label>
            <input
              id="other-event-input"
              type="text"
              placeholder="e.g. Intimate family gathering, commercial film shoot..."
              value={value.otherEventPurpose || ''}
              onChange={(e) => onChange({ ...value, otherEventPurpose: e.target.value })}
              className="w-full bg-white border border-[#D0C8B8] rounded-lg p-2.5 text-sm text-[#1C2D27] focus:ring-2 focus:ring-[#1C2D27] focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Compact Additional Notes */}
      <div className="mb-6 font-sans">
        <label htmlFor="additional-notes" className="block text-sm font-semibold text-[#1C2D27] mb-1">
          Additional Notes or Special Requests
        </label>
        <textarea
          id="additional-notes"
          rows={3}
          placeholder="Any other special requests or preferences..."
          value={value.additionalNotes || ''}
          onChange={(e) => onChange({ ...value, additionalNotes: e.target.value })}
          className="w-full bg-white border border-[#D0C8B8] rounded-lg p-3 text-sm text-[#1C2D27] focus:ring-2 focus:ring-[#1C2D27] focus:outline-none resize-y"
        />
      </div>

      {/* Live Fee Breakdown Panel */}
      <div className="bg-[#1C2D27] text-[#F9F7F2] p-5 rounded-xl font-sans shadow-md">
        <div className="flex items-center justify-between border-b border-[#344840] pb-3 mb-3">
          <span className="text-xs uppercase tracking-widest text-[#C8B89A] font-semibold">
            Estimated Add-on Fees
          </span>
          <span className="text-xs text-[#A2B5AB] italic">
            Reviewed & confirmed by Admin
          </span>
        </div>

        {feeBreakdown.items.length === 0 ? (
          <p className="text-xs text-[#A2B5AB] py-1">
            No add-on services selected. Standard stay rates apply.
          </p>
        ) : (
          <ul className="space-y-2 mb-4 text-xs">
            {feeBreakdown.items.map((item, idx) => (
              <li key={idx} className="flex justify-between items-center text-[#E3DEC3]">
                <div>
                  <span className="font-medium text-white">{item.label}</span>
                  <span className="text-[#A2B5AB] ml-2">({item.quantityText})</span>
                </div>
                <span className="font-mono text-sm font-semibold">₱{item.amount.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="border-t border-[#344840] pt-3 flex items-center justify-between">
          <span className="text-sm font-medium">Total Estimated Add-ons:</span>
          <span className="text-lg font-bold text-[#D4AF37] font-mono">
            ₱{feeBreakdown.totalEstimatedFees.toLocaleString()}
          </span>
        </div>

        <p className="text-[11px] text-[#A2B5AB] mt-3 leading-relaxed">
          <strong>Note:</strong> Declare each pet (₱300 per pet for sanitation), bonfire wood (₱150/set), approved late checkout (₱250/hour after noon), and special-event/use charges are reviewed by the Admin and are never added automatically.
        </p>
      </div>
    </div>
  );
};
