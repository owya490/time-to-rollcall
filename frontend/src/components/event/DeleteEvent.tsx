import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import Loader from "../Loader";

export default function DeleteEvent({
  isOpen,
  closeModal,
  deleteEvent,
  updating,
}: {
  isOpen: boolean;
  closeModal: () => void;
  deleteEvent: () => void;
  updating: boolean;
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 w-full"
        onClose={closeModal}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>
        <div className="fixed inset-0">
          <div className="absolute w-full bottom-0">
            <TransitionChild
              enter="transition ease-in-out duration-300 transform"
              enterFrom="transform translate-y-full"
              enterTo="transform translate-y-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="transform translate-y-0"
              leaveTo="transform translate-y-full"
            >
              <DialogPanel className="rounded-t-3xl bg-white p-6 shadow-xl">
                <div className="absolute right-6 top-6">
                  <svg
                    className="hover:cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 15 15"
                    width="15"
                    height="15"
                    onClick={closeModal}
                  >
                    <line
                      x1="2"
                      y1="2"
                      x2="14"
                      y2="14"
                      stroke="black"
                      strokeWidth="2"
                    />
                    <line
                      x1="14"
                      y1="2"
                      x2="2"
                      y2="14"
                      stroke="black"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <DialogTitle
                  as="h3"
                  className="text-xl text-center font-medium leading-6 text-gray-900"
                >
                  Are you sure?
                </DialogTitle>
                <p className="mt-2 px-12 text-sm text-center text-gray-500">
                  This event will be gone forever
                </p>
                {updating ? (
                  <div className="flex justify-center items-center">
                    <Loader show />
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      className="inline-flex w-full mt-4 justify-center rounded-3xl border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={closeModal}
                    >
                      Go back
                    </button>
                    <button
                      type="button"
                      className="inline-flex w-full mt-4 justify-center rounded-3xl border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={deleteEvent}
                    >
                      Delete
                    </button>
                  </>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
