import DefaultDropdown from '@/views/Dropdowns/DefaultDropdown/DefaultDropdown';
import { SelectCategory } from '@/views/Dropdowns/SelectCategory';
import type { ExpensesTableProps } from '@/views/ExpensesTable/types';

export const ExpensesTable = ({
  expenses = [],
  handleUpdateExpense,
}: ExpensesTableProps) => {
  return (
    <div className="col-span-12 xl:col-span-7">
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-6 flex justify-between">
          <div>
            <h4 className="text-title-sm2 font-bold text-black dark:text-white">
              Expenses
            </h4>
          </div>
          <DefaultDropdown />
        </div>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
            <div className="p-2.5 xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Date
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Recipient
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Amount
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Category
              </h5>
            </div>
          </div>

          {expenses?.map((expense, key) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-4 ${
                key === expenses?.length - 1
                  ? ''
                  : 'border-b border-stroke dark:border-strokedark'
              }`}
              key={expense.id}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="max-w-9 h-9 w-full shrink-0">
                  {expense.postingDate}
                </div>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="font-medium dark:text-white">
                  {expense.recipient}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="font-black text-meta-1">
                  {`${expense.operationAmount} zł`}
                </p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                {handleUpdateExpense ? (
                  <SelectCategory
                    handleUpdateExpense={handleUpdateExpense}
                    expenseId={expense.id}
                    value={expense.category}
                  />
                ) : (
                  <p className="font-medium dark:text-white">
                    {expense.category}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
