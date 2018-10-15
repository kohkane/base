import 'helpers';

describe('helpers', () => {
  describe('Array', () => {
    const testArray = [1, 2, 3];
    test('iterate', () => {
      testArray.iterate((i, count) => {
        expect(i).toBe(testArray[count]);
      });
    });
    test('reverseIterate', () => {
      testArray.reverseIterate((i, count) => {
        expect(i).toBe(testArray[count]);
      });
    });
  });

  describe('Date', () => {
    const testDate = new Date('2018-06-13T00:00');
    test('yyyymmdd', () => {
      expect(testDate.yyyymmdd()).toBe('2018/06/13');
      expect(testDate.yyyymmdd('~')).toBe('2018~06~13');
    });
    test('getTimeReversed', () => {
      expect(testDate.getTimeReversed()).toBe(0000042688251);
    });
  });

  describe('String', () => {
    const testString = 'Test.Test_ Test-';
    test('sanatize', () => {
      expect(testString.sanatize()).toBe('testtest__test');
    });
  });
});
