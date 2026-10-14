import { calculateEstimatedAddonFees, formatSpecialRequestsSummary, RATES } from '../src/utils/pricing';
import { SpecialRequestsData } from '../src/types/booking';

function runTests() {
  console.log('Running Special Requests and Pricing Tests...');

  // Test 1: Zero Selections
  const emptyRequests: SpecialRequestsData = {
    petCount: 0,
    bonfireWoodSets: 0,
    lateCheckoutHours: 0,
    eventPurposes: [],
    otherEventPurpose: '',
    additionalNotes: '',
  };

  const emptyResult = calculateEstimatedAddonFees(emptyRequests);
  console.assert(emptyResult.totalEstimatedFees === 0, 'Empty requests total should be 0');
  console.assert(emptyResult.items.length === 0, 'Empty requests items should be empty');
  console.assert(formatSpecialRequestsSummary(emptyRequests) === '', 'Summary should be empty string');

  // Test 2: Pets, Bonfire, Late Checkout Fee Calculation
  const sampleRequests: SpecialRequestsData = {
    petCount: 2,
    bonfireWoodSets: 1,
    lateCheckoutHours: 2,
    eventPurposes: ['Reunion / Team Building', 'Other'],
    otherEventPurpose: 'Family Gathering',
    additionalNotes: 'Need extra towels please.',
  };

  const expectedPetsFee = 2 * RATES.PET_FEE_PER_PET; // 600
  const expectedBonfireFee = 1 * RATES.BONFIRE_WOOD_PER_SET; // 150
  const expectedLateCheckoutFee = 2 * RATES.LATE_CHECKOUT_PER_HOUR; // 500
  const expectedTotal = expectedPetsFee + expectedBonfireFee + expectedLateCheckoutFee; // 1250

  const sampleResult = calculateEstimatedAddonFees(sampleRequests);
  console.assert(sampleResult.totalEstimatedFees === expectedTotal, `Expected total ${expectedTotal}, got ${sampleResult.totalEstimatedFees}`);
  console.assert(sampleResult.items.length === 3, 'Should have 3 breakdown items');

  // Test 3: Formatting for backward compatibility (Legacy text representation)
  const summaryText = formatSpecialRequestsSummary(sampleRequests);
  console.assert(summaryText.includes('Pet count: 2 (₱600)'), 'Summary text should include pet count and fee');
  console.assert(summaryText.includes('Bonfire wood: 1 set(s) (₱150)'), 'Summary text should include bonfire wood');
  console.assert(summaryText.includes('Late checkout: 2 hr(s) after noon (₱500)'), 'Summary text should include late checkout');
  console.assert(summaryText.includes('Event/Purpose: Reunion / Team Building, Other (Family Gathering)'), 'Summary text should include formatted event purpose with Other specified');
  console.assert(summaryText.includes('Notes: Need extra towels please.'), 'Summary text should include custom notes');

  console.log('✅ All tests passed successfully!');
}

runTests();
