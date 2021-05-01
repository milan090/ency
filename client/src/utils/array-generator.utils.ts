export const generateArray = (start: number, stop: number, step = 1): number[] => {
  const array: number[] = [];
  const steps = Math.floor((stop - start) / step);

  for (let i = 0; i < steps; i++) {
    array[i] = start + step * i;
  }

  return array;
};
