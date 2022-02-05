export const filterByUniqueValues = (arr) => {
  const unique = [];
  arr.forEach((item) => {
    if (unique.length === 0 || !unique.find(({ value }) => value === item.value)) {
      unique.push(item);
    }
  });
  return unique;
};
