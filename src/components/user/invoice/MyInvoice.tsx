import useToggle from "@/lib/common/hooks/useToggle";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import CancelInvoice from "./CancelInvoice";

type Props = {
  data: any;
};

const MyInvoice = ({ data }: Props) => {
  const { value: hideCancelModal, toggle: toggleCancel } = useToggle(true);
  const [invoiceId, setInvoiceId] = useState("");

  const handleCancelInvoice = () => {
    toggleCancel();
  };

  return (
    <>
      <CancelInvoice
        invoiceId={invoiceId}
        hide={hideCancelModal}
        toggle={toggleCancel}
      />
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b bg-white">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center text-sm font-medium text-gray-900"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center text-sm font-medium text-gray-900"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center text-sm font-medium text-gray-900"
                    >
                      Account Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center text-sm font-medium text-gray-900"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center text-sm font-medium text-gray-900"
                    >
                      Message
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center text-sm font-medium text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center text-sm font-medium text-gray-900"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.pages.map((page: any) =>
                    page?.data?.map((invoice: any, index: any) => (
                      <tr
                        key={index}
                        className="border-b bg-gray-100 duration-300 ease-linear hover:cursor-pointer hover:rounded-md hover:bg-gray-200"
                      >
                        <td className="whitespace-nowrap px-6 py-4 text-center text-sm font-medium text-gray-900">
                          #{invoice.id}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center text-sm font-light text-gray-900">
                          {`${invoice.customer.firstName} ${invoice.customer.lastName}`}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center text-sm font-light text-gray-900">
                          {invoice.customer.accountNumber}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center text-sm font-light text-gray-900">
                          {invoice.amount} $
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center text-sm font-light text-gray-900">
                          {invoice.message}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center text-sm font-light text-gray-900">
                          {invoice.isPaid ? (
                            <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                              Paid
                            </span>
                          ) : (
                            <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                              Unpaid
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center text-sm font-light text-gray-900">
                          {!invoice.isPaid ? (
                            <RxCross1
                              className="m-auto h-6 w-6 text-red-400 hover:cursor-pointer hover:opacity-25"
                              strokeWidth={0.8}
                              onClick={() => {
                                setInvoiceId(invoice.id);
                                handleCancelInvoice();
                              }}
                            />
                          ) : null}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyInvoice;
