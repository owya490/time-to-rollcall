import { SubmitEventModel } from "@/models/Event";
import { Tag } from "@/models/Group";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function CreateEvent({
  tags,
  isOpen,
  closeModal,
  step,
  incrementStep,
  submitEvent,
  setSubmitEvent,
}: {
  tags?: Tag[];
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
                {step === 1 && (
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-medium leading-6 text-gray-900"
                    >
                      Create Your Event
                    </Dialog.Title>
                    <p className="mt-2 px-12 text-sm text-gray-500">
                      Start by naming your event. This will be the name
                      displayed for everyone but it can always be changed later.
                    </p>
                    <textarea
                      className="my-6 w-full rounded-none resize-none text-center border-b border-blue-gray-200 border-t-0 bg-transparent pt-4 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:border-t-0 focus:outline-0"
                      placeholder="Awesome Event"
                      value={submitEvent.name}
                      onChange={(event) =>
                        setSubmitEvent({
                          ...submitEvent,
                          name: event.target.value,
                        })
                      }
                    />
                    <button
                      type="button"
                      disabled={!submitEvent.name}
                      className="inline-flex w-full mt-4 justify-center rounded-3xl border border-transparent disabled: bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={incrementStep}
                    >
                      Next
                    </button>
                  </div>
                )}
                {step === 2 && (
                  <div>
                    <p className="mt-2 px-8 text-sm text-gray-500">
                      Attach relevant tags to the event. These won&apos;t be
                      displayed but they make it easier to group and organise
                      your events.
                    </p>
                    <p className="mt-7 mb-1 text-xs font-light text-gray-400">
                      Add Tags
                    </p>
                    {tags?.map((t, i) => (
                      <button
                        type="button"
                        key={i}
                        className={
                          submitEvent.tagIds.includes(t.id)
                            ? "rounded-3xl border-solid border-blue-800 border-2 bg-blue-100 px-4 py-2 mx-2 my-1 text-xs font-medium text-blue-900"
                            : "rounded-3xl border-transparent border-2 bg-blue-100 px-4 py-2 mx-2 my-1 text-xs font-medium text-blue-900"
                        }
                        onClick={() =>
                          setSubmitEvent({
                            ...submitEvent,
                            tagIds: submitEvent.tagIds.includes(t.id)
                              ? submitEvent.tagIds
                                  .slice(0, submitEvent.tagIds.indexOf(t.id))
                                  .concat(
                                    submitEvent.tagIds.slice(
                                      submitEvent.tagIds.indexOf(t.id) + 1
                                    )
                                  )
                              : submitEvent.tagIds.concat(t.id),
                          })
                        }
                      >
                        {t.name}
                      </button>
                    ))}
                    <button
                      type="button"
                      disabled={submitEvent.tagIds.length === 0}
                      className="inline-flex w-full mt-4 justify-center rounded-3xl border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={incrementStep}
                    >
                      Next
                    </button>
                  </div>
                )}
                {step === 3 && (
                  <div>
                    <p className="mt-2 px-12 text-sm text-gray-500">
                      Date stuff? Date stuff? Date stuff? Date stuff?
                    </p>
                    <button
                      type="button"
                      disabled
                      className="inline-flex w-full mt-4 justify-center rounded-3xl border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={incrementStep}
                    >
                      Next
                    </button>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
