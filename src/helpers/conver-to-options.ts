export const convertToOptions = ({ data, withAll = true }: { data: any[]; withAll?: boolean }) => {
  let options = [];
  if (withAll) options.push({ key: '', value: 'All' });

  return [
    ...options,
    ...data.map(item => ({
      key: item.description,
      value: item.description.charAt(0).toUpperCase() + item.description.slice(1),
    })),
  ];
};
