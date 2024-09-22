export const ratingHelper = (arr: number[]) => {
  let avg: number = 0;
  arr.forEach((ele: number) => {
    avg += ele;
  });
  return avg / arr.length;
};
