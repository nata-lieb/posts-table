type PrimeChecker = (number: number) => boolean;

function createPrimeChecker(customCache?: Map<number, boolean>): PrimeChecker {
  const cache: Map<number, boolean> = customCache || new Map();

  const isPrime: PrimeChecker = function isPrime(number) {
    if (number <= 1) return false;

    // Check if result is already cached
    if (cache.has(number)) return cache.get(number) as boolean;

    // Check for prime
    for (let i = 2; i <= Math.sqrt(number); i++) {
      if (number % i === 0) {
        cache.set(number, false);
        return false;
      }
    }

    // If no divisor found, it's a prime number
    cache.set(number, true);
    return true;
  };

  return isPrime;
}

export default createPrimeChecker;
