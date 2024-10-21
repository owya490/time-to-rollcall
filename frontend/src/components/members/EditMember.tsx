import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Fragment, useContext } from "react";
import { MemberModel } from "@/models/Member";
import {
  CheckIcon,
  ChevronUpIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Loader from "../Loader";
import { MetadataContext } from "@/lib/context";
import DeleteConfirmation from "../event/DeleteEvent";
import { MetadataSelectModel } from "@/models/Metadata";

export default function EditMember({
  isOpen,
  closeModal,
  member,
  setMember,
  submit,
  updating,
  deleteConfirmationIsOpen,
  openDeleteConfirmationModal,
  closeDeleteConfirmationModal,
  deleteMember,
  updatingDelete,
}: {
  isOpen: boolean;
  closeModal: () => void;
  member: MemberModel;
  setMember: (member: MemberModel) => void;
  submit: () => void;
  updating: boolean;
  deleteConfirmationIsOpen?: boolean;
  openDeleteConfirmationModal?: () => void;
  closeDeleteConfirmationModal?: () => void;
  deleteMember?: () => void;
  updatingDelete?: boolean;
}) {
  const metadata = useContext(MetadataContext);
  const newMember = member.id === "placeholder";
  return (
    <>
      {deleteConfirmationIsOpen !== undefined &&
        closeDeleteConfirmationModal &&
        deleteMember &&
        updatingDelete !== undefined && (
          <DeleteConfirmation
            description={member.name + " will be deleted forever"}
            isOpen={deleteConfirmationIsOpen}
            closeModal={closeDeleteConfirmationModal}
            confirm={deleteMember}
            updating={updatingDelete}
          />
        )}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 w-full overflow-hidden"
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
            <div className="fixed w-full bottom-0">
              <TransitionChild
                enter="transition ease-in-out duration-300 transform"
                enterFrom="transform translate-y-full"
                enterTo="transform translate-y-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="transform translate-y-0"
                leaveTo="transform translate-y-full"
              >
                <DialogPanel className="rounded-t-3xl bg-white pt-4 pb-0 shadow-xl">
                  <div
                    className="absolute right-2 top-2 p-2 cursor-pointer"
                    onClick={closeModal}
                  >
                    <XMarkIcon className="w-6 h-6 text-black" />
                  </div>
                  {!newMember && (
                    <div
                      className="absolute left-2 top-2 p-2 cursor-pointer"
                      onClick={openDeleteConfirmationModal}
                    >
                      <TrashIcon className="w-6 h-6 text-red-600" />
                    </div>
                  )}
                  <DialogTitle
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900 text-center mb-2"
                  >
                    {newMember ? "Create New Member" : "Edit Member"}
                  </DialogTitle>
                  <div className="overflow-auto max-h-[70vh] pb-14 px-4">
                    <div className="my-4">
                      <p className="text-sm text-gray-900">Name</p>
                      <input
                        type="text"
                        autoFocus
                        className="w-full rounded-none resize-none border-t-0 bg-transparent font-sans text-lg font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:border-t-0 focus:outline-0"
                        placeholder="Sijin Yang"
                        value={member.name}
                        onChange={(e) =>
                          setMember({
                            ...member,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    {metadata &&
                      metadata.map((m, i) => (
                        <div key={i} className="my-4">
                          <p className="text-sm text-gray-900">{m.key}</p>
                          {m.type === "input" && (
                            <input
                              type="text"
                              autoFocus
                              className="w-full rounded-none resize-none border-t-0 bg-transparent font-sans text-lg font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:border-t-0 focus:outline-0"
                              placeholder={
                                m.key === "zID" ? "z5312345" : "Placeholder"
                              }
                              value={member.metadata?.[m.id]}
                              onChange={(e) =>
                                setMember({
                                  ...member,
                                  metadata: {
                                    ...member.metadata,
                                    [m.id]: e.target.value,
                                  },
                                })
                              }
                            />
                          )}
                          {m.type === "select" && (
                            <div className="mx-auto w-full">
                              <Listbox
                                value={member.metadata?.[m.id]}
                                onChange={(value) =>
                                  setMember({
                                    ...member,
                                    metadata: {
                                      ...member.metadata,
                                      [m.id]: value,
                                    },
                                  })
                                }
                              >
                                <div className="flex justify-between items-center">
                                  {member.metadata?.[m.id] ? (
                                    <ListboxButton className="block w-full appearance-none rounded-lg bg-white/5 text-left text-lg font-semibold focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25">
                                      {(m as MetadataSelectModel).values[
                                        member.metadata?.[m.id]
                                      ] ?? member.metadata?.[m.id]}
                                    </ListboxButton>
                                  ) : (
                                    <ListboxButton className="block w-full appearance-none rounded-lg bg-white/5 text-left text-lg font-semibold focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 text-gray-400">
                                      Unselected
                                    </ListboxButton>
                                  )}

                                  <ChevronUpIcon
                                    className="pointer-events-none w-6 h-6 text-black"
                                    aria-hidden="true"
                                  />
                                </div>
                                <ListboxOptions
                                  anchor="top"
                                  transition
                                  className="rounded-xl border w-full border-white/5 bg-gray-100 p-1 focus:outline-none transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                                >
                                  {(m as MetadataSelectModel).values &&
                                    Object.entries(
                                      (m as MetadataSelectModel).values
                                    )
                                      .sort(([a, b]) =>
                                        Number(a[0]) < Number(b[0]) ? -1 : 1
                                      )
                                      .map(([vId, vValue], j) => (
                                        <ListboxOption
                                          key={j}
                                          value={vId}
                                          onClick={() =>
                                            setMember({
                                              ...member,
                                              metadata: {
                                                ...member.metadata,
                                                [m.id]: vId,
                                              },
                                            })
                                          }
                                          className="group flex justify-between cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                                        >
                                          <div className="text-lg font-semibold">
                                            {vValue}
                                          </div>
                                          <CheckIcon
                                            className="invisible size-4 fill-white group-data-[selected]:visible right-4 w-5 h-5 text-black"
                                            aria-hidden="true"
                                          />
                                        </ListboxOption>
                                      ))}
                                </ListboxOptions>
                              </Listbox>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                  <div className="flex justify-center">
                    {updating ? (
                      <div className="bottom-2 fixed flex justify-center items-center">
                        <Loader show />
                      </div>
                    ) : (
                      <button
                        type="button"
                        disabled={!member.name}
                        className="bottom-2 fixed z-50 inline-flex mt-4 justify-center rounded-3xl border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={submit}
                      >
                        {newMember ? "Create" : "Update"}
                      </button>
                    )}
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
