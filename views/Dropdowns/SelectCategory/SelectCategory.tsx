'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import { SPEND_CATEGORIES, SpendCategory } from '@/types/expense';
import type { SelectCategoryProps } from '@/views/Dropdowns/SelectCategory/types';

export const SelectCategory = ({
  value,
  expenseId,
  handleUpdateExpense,
}: SelectCategoryProps) => {
  const dropdown = useRef<HTMLDivElement>(null);
  const [selectedValue, setSelectedValue] = useState(value);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(SPEND_CATEGORIES);
  const hasNoCategory = useMemo(
    () => selectedValue === SpendCategory.Uncategorized,
    [selectedValue],
  );

  const handleOpen = () => setIsOpen(!isOpen);

  const handleCategory = (category: string) => {
    if (!handleUpdateExpense) return;

    handleUpdateExpense(expenseId, category);
    setSelectedValue(category);
    setIsOpen(false);
  };

  useEffect(() => {
    const filtered = SPEND_CATEGORIES.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredOptions(filtered);
  }, [searchTerm]);

  useOutsideClick(dropdown, () => setIsOpen(false));

  return (
    <div className="relative inline-block w-full">
      <button
        type="button"
        className={`inline-flex w-full items-center justify-center gap-2.5 rounded-md px-4 py-3 font-medium text-white hover:bg-opacity-95 ${hasNoCategory ? 'bg-danger' : 'bg-primary'}`}
        onClick={() => handleOpen()}
      >
        {selectedValue}
        <svg
          className={`${isOpen ? 'rotate-180' : null} fill-current duration-200 ease-linear`}
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.564864 0.879232C0.564864 0.808624 0.600168 0.720364 0.653125 0.667408C0.776689 0.543843 0.970861 0.543844 1.09443 0.649756L5.82517 5.09807C5.91343 5.18633 6.07229 5.18633 6.17821 5.09807L10.9089 0.649756C11.0325 0.526192 11.2267 0.543844 11.3502 0.667408C11.4738 0.790972 11.4562 0.985145 11.3326 1.10871L6.60185 5.55702C6.26647 5.85711 5.73691 5.85711 5.41917 5.55702L0.670776 1.10871C0.600168 1.0381 0.564864 0.967492 0.564864 0.879232Z"
            fill=""
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.4719 0.229332L6.00169 4.48868L10.5171 0.24288C10.9015 -0.133119 11.4504 -0.0312785 11.7497 0.267983C12.1344 0.652758 12.0332 1.2069 11.732 1.50812L11.7197 1.52041L6.97862 5.9781C6.43509 6.46442 5.57339 6.47872 5.03222 5.96853C5.03192 5.96825 5.03252 5.96881 5.03222 5.96853L0.271144 1.50833C0.123314 1.3605 -5.04223e-08 1.15353 -3.84322e-08 0.879226C-2.88721e-08 0.660517 0.0936127 0.428074 0.253705 0.267982C0.593641 -0.0719548 1.12269 -0.0699964 1.46204 0.220873L1.4719 0.229332ZM5.41917 5.55702C5.73691 5.85711 6.26647 5.85711 6.60185 5.55702L11.3326 1.10871C11.4562 0.985145 11.4738 0.790972 11.3502 0.667408C11.2267 0.543844 11.0325 0.526192 10.9089 0.649756L6.17821 5.09807C6.07229 5.18633 5.91343 5.18633 5.82517 5.09807L1.09443 0.649756C0.970861 0.543844 0.776689 0.543843 0.653125 0.667408C0.600168 0.720364 0.564864 0.808624 0.564864 0.879232C0.564864 0.967492 0.600168 1.0381 0.670776 1.10871L5.41917 5.55702Z"
            fill=""
          />
        </svg>
      </button>
      {isOpen ? (
        <div
          ref={dropdown}
          className="absolute left-0 top-full z-40 mt-2 max-h-96 w-full overflow-y-scroll rounded-md border border-stroke bg-white py-3 shadow-card dark:border-strokedark dark:bg-boxdark"
        >
          <div className="px-4">
            <label
              className="mb-3 block text-black dark:text-white"
              htmlFor="find-category"
            >
              Find category
              <input
                type="text"
                id="find-category"
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </label>
          </div>
          <ul className="flex flex-col">
            {filteredOptions.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  className="flex w-full px-5 py-2 font-medium hover:bg-whiter hover:text-primary dark:hover:bg-meta-4"
                  onClick={() => handleCategory(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
