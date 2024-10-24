import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import Loader from "../Loader";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function DeleteConfirmation({
  description,
  isOpen,
  closeModal,
  confirm,
  updating,
  action,
}: {
  description: string;
  isOpen: boolean;
  closeModal: () => void;
  confirm: () => void;
  updating: boolean;
  action?: string;
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-hidden"
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
        <div className="fixed inset-0 flex justify-center">
          <div className="fixed max-w-md:w-full md:w-[600px] bottom-0">
            <TransitionChild
              enter="transition ease-in-out duration-300 transform"
              enterFrom="transform translate-y-full"
              enterTo="transform translate-y-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="transform translate-y-0"
              leaveTo="transform translate-y-full"
            >
              <DialogPanel className="rounded-t-3xl bg-white p-4 shadow-xl">
                <div
                  className="absolute right-2 top-2 p-2"
                  onClick={closeModal}
                >
                  <XMarkIcon className="w-6 h-6 text-black" />
                </div>
                <DialogTitle
                  as="h3"
                  className="text-xl text-center font-medium leading-6 text-gray-900"
                >
                  Are you sure?
                </DialogTitle>
                <p className="mt-2 px-12 text-sm text-center text-gray-500">
                  {description}
                </p>
                {updating ? (
                  <div className="flex justify-center items-center mt-16">
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
                      onClick={confirm}
                    >
                      {action ?? "Delete"}
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
