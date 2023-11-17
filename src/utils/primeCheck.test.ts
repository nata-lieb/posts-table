import createPrimeChecker from './primeCheck';

const createMockCache = () => {
  const cache: Map<number, boolean> = new Map();

  return {
    has: jest.fn((key) => cache.has(key)),
    get: jest.fn((key) => cache.get(key)),
    set: jest.fn((key, value) => {
      cache.set(key, value);
    }),
    size: () => cache.size,
  };
};

describe('createPrimeChecker()', () => {
  test('correctly identifies prime numbers', () => {
    const isPrime = createPrimeChecker();

    expect(isPrime(2)).toBe(true);
    expect(isPrime(3)).toBe(true);
    expect(isPrime(5)).toBe(true);
    expect(isPrime(7)).toBe(true);
    expect(isPrime(11)).toBe(true);
  });

  test('correctly identifies non-prime numbers', () => {
    const isPrime = createPrimeChecker();

    expect(isPrime(1)).toBe(false);
    expect(isPrime(4)).toBe(false);
    expect(isPrime(6)).toBe(false);
    expect(isPrime(8)).toBe(false);
    expect(isPrime(9)).toBe(false);
  });

  test('caches results for efficiency', () => {
    const cache = createMockCache();
    const isPrime = createPrimeChecker(
      cache as unknown as Map<number, boolean>,
    );

    expect(cache.size()).toBe(0);
    expect(isPrime(2)).toBe(true);
    expect(cache.size()).toBe(1);
    expect(isPrime(4)).toBe(false);
    expect(cache.size()).toBe(2);

    expect(cache.has).toHaveBeenCalledTimes(2);
    expect(cache.get).toHaveBeenCalledTimes(0);
    expect(cache.set).toHaveBeenCalledTimes(2);

    isPrime(2);
    expect(cache.size()).toBe(2);
    expect(cache.get).toHaveBeenCalledTimes(1);
  });
});
