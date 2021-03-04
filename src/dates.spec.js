import {
  formatDate,
  formatTime,
  formatCurrency,
  isDateBetween,
} from './dates';

describe('dates', function() {
  describe('formatDate', function() {
    it('should format dates correctly', () => {
      [
        {date: new Date('December 17, 1995 03:24:00'), expected: '12/17/95'},
        {date: new Date('August 21, 1979 09:15:00'), expected: '8/21/79'},
      ].forEach(({date, expected}) => {
        expect(formatDate(date, 'en-US')).toEqual(expected);
      });
    });
  });

  describe('formateTime', () => {
    it('should format dates as just time.', () => {
      [
        {date: '2020-08-31T15:00:00Z', expected: '11:00 AM'},
        {date: '2020-08-31T17:00:00Z', expected: '1:00 PM'},
      ].forEach(({date, expected}) => {
        expect(formatTime(date, 'en-US', 'America/New_York')).toEqual(expected);
      });
    });

  });

  describe('isDateBetween', () => {
    it('should determine if the date is between two other dates', () => {
      [
        {date: '2020-08-31T15:00:00Z', minDate: '2020-08-31T15:00:00Z', maxDate: '2020-08-31T15:00:00Z', expected: true},
        {date: '2020-08-31T15:00:00Z', minDate: '2020-08-01T00:00:00Z', maxDate: '2020-09-01T00:00:00Z', expected: true},
        {date: '2020-08-31T15:00:00Z', minDate: '2020-08-01T00:00:00Z', maxDate: '2020-08-02T12:00:00Z', expected: false},
        {date: '2020-08-31T15:00:00Z', minDate: '2020-08-2T00:00:00Z', maxDate: '2020-08-01T12:00:00Z', expected: false},
      ].forEach(({date, minDate, maxDate, expected}) => {
        expect(isDateBetween(date, minDate, maxDate)).toEqual(expected);
      });
    });
  });

  describe('formCurrency', function() {
    it('should be able to format currency correctly.', () => {
      [
        {value: 105600, currency: 'USD', expected: '$1,056'},
        {value: 239800, currency: 'EUR', expected: '€2,398'},
      ].forEach(({currency, value, expected}) => {
        expect(formatCurrency(value, currency)).toEqual(expected);
      });
    });
  });
});
