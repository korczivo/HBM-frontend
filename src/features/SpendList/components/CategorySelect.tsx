import { type ChangeEvent, useEffect, useState } from 'react';

import { SPEND_CATEGORIES } from '@/utils/constants';

type CategorySelectProps = {
  value: string;
  expenseId: string;
  handleSelectChange: (expenseId: string, value: string) => void;
};
export const CategorySelect = ({
  value,
  expenseId,
  handleSelectChange,
}: CategorySelectProps) => {
  const [hasNoValue, setHasNoValue] = useState<boolean>(false);

  const handleChange = () => (e: ChangeEvent<HTMLSelectElement>) => {
    handleSelectChange(expenseId, e.target.value);
    if (SPEND_CATEGORIES.includes(e.target.value)) {
      setHasNoValue(false);
    }
  };

  useEffect(() => {
    if (!SPEND_CATEGORIES.includes(value)) {
      setHasNoValue(true);
    }
  }, [value]);

  return (
    <select
      className={`select select-ghost w-full max-w-xs ${
        hasNoValue ? 'select-error' : null
      }`}
      onChange={handleChange()}
    >
      <option disabled selected>
        Pick category
      </option>
      {SPEND_CATEGORIES.map((category, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <option selected={category === value} key={index}>
          {category}
        </option>
      ))}
    </select>
  );
};
