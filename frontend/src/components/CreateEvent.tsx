import { SubmitEventModel } from "@/models/Event";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function CreateEvent({
  isOpen,
  closeModal,
  step,
  incrementStep,
  submitEvent,
  setSubmitEvent,
}: {
  isOpen: boolean;
  closeModal: () => void;
  step: number;
  incrementStep: () => void;
  submitEvent: SubmitEventModel;
  setSubmitEvent: (event: SubmitEventModel) => void;
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex h-full items-end justify-center text-center">
            <Transition.Child
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="transform translate-y-0"
              leaveTo="transform translate-y-full"
            >
              <Dialog.Panel className="w-full transform overflow-hidden rounded-t-3xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                <div className="flex justify-end pb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 15 15"
                    width="15"
                    height="15"
                    onClick={closeModal}
                  >
                    <line
                      x1="2"
                      y1="2"
                      x2="13"
                      y2="13"
                      stroke="black"
                      strokeWidth="1.7"
                    />
                    <line
                      x1="13"
                      y1="2"
                      x2="2"
                      y2="13"
                      stroke="black"
                      strokeWidth="1.7"
                    />
                  </svg>
                </div>
                {step === 1 && (
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-medium leading-6 text-gray-900"
                    >
                      Create Your Event
                    </Dialog.Title>
                    <div className="mt-2 px-12">
                      <p className="text-sm text-gray-500">
                        Start by naming your event. This will be the name
                        displayed for everyone but it can always be changed
                        later.
                      </p>
                    </div>
                    <textarea
                      className="my-12 w-full resize-none text-center border-b border-blue-gray-200 bg-transparent pt-4 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0"
                      placeholder="Awesome Event"
                      value={submitEvent.name}
                      onChange={(event) =>
                        setSubmitEvent({
                          ...submitEvent,
                          name: event.target.value,
                        })
                      }
                    />
                  </div>
                )}
                {step === 2 && (
                  <div>
                    <div className="mt-2 px-12">
                      <p className="text-sm text-gray-500">
                        Attach relevant tags to the event. These won&apos;t be
                        displayed but they make it easier to group and organise
                        your events.
                      </p>
                    </div>
                  </div>
                )}
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-3xl border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={incrementStep}
                  >
                    Next
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
