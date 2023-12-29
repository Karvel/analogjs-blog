import { LabelValue } from '@models/label-value';

export const defaultPageOptions: LabelValue<number>[] = [
  {
    label: '5',
    value: 5,
  },
  {
    label: '10',
    value: 10,
  },
  {
    label: '20',
    value: 20,
  },
  {
    label: '50',
    value: 50,
  },
  {
    label: '100',
    value: 100,
  },
];

export const setPageSizeOptions = (
  totalItems: number,
): LabelValue<number>[] => {
  const filteredOptions = defaultPageOptions.filter(
    (pageOption) => pageOption.value < totalItems,
  );
  const calculatedAllOption = {
    label: 'All',
    value: totalItems,
  };
  filteredOptions.push(calculatedAllOption);
  return filteredOptions;
};
