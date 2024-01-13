export const findDiscreteValuesUsingDivideAndConquer = (xPosition: number, discreteValues: number[]) => {
  let low = 0;
  let high = discreteValues.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (xPosition > discreteValues[mid] && xPosition <= discreteValues[mid + 1]) {
      return [discreteValues[mid + 1]];
    } else if (xPosition < discreteValues[mid]) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return [discreteValues[0]];
};
