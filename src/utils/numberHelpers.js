export const numberWithCommas = (x) => {
  const eachThreeDegitRegex = /\B(?=(\d{3})+(?!\d))/g;
  return x.toString().replace(eachThreeDegitRegex, ',');
};
