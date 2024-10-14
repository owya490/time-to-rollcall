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
import { Fragment } from "react";
import { MemberModel } from "@/models/Member";
import { CheckIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { universities } from "@/models/University";
import { roles } from "@/models/Role";
import Loader from "../Loader";

export default function EditMember({
  isOpen,
  closeModal,
  member,
  setMember,
  submit,
  updating,
}: {
  isOpen: boolean;
  closeModal: () => void;
  member: MemberModel;
  setMember: (member: MemberModel) => void;
  submit: () => void;
  updating: boolean;
}) {
  const newMember = member.id === "placeholder";
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
                  className="text-xl font-medium leading-6 text-gray-900 text-center"
                >
                  {newMember ? "Create New Member" : "Edit Member"}
                </DialogTitle>
                <div className="my-4">
                  <p className="text-sm text-gray-900">Name</p>
                  <input
                    type="text"
                    autoFocus
                    className="w-full rounded-none resize-none border-t-0 bg-transparent font-sans text-lg font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:border-t-0 focus:outline-0"
                    placeholder="Awesome Member"
                    value={member.name}
                    onChange={(e) =>
                      setMember({
                        ...member,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="my-4">
                  <p className="text-sm text-gray-900">Role</p>
                  <div className="mx-auto w-full">
                    <Listbox
                      value={member.role}
                      onChange={(role) =>
                        setMember({
                          ...member,
                          role,
                        })
                      }
                    >
                      <div className="flex justify-between items-center">
                        <ListboxButton className="block w-full appearance-none rounded-lg bg-white/5 text-left text-lg font-semibold focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25">
                          {member.role ?? "Unselected"}
                        </ListboxButton>
                        <ChevronUpIcon
                          className="pointer-events-none absolute right-6 w-6 h-6 text-black"
                          aria-hidden="true"
                        />
                      </div>
                      <ListboxOptions
                        anchor="top"
                        transition
                        className="rounded-xl border w-full border-white/5 bg-white p-1 focus:outline-none transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                      >
                        {roles.map((role, i) => (
                          <ListboxOption
                            key={i}
                            value={role}
                            onClick={() =>
                              setMember({
                                ...member,
                                role,
                              })
                            }
                            className="group flex justify-between cursor-default items-center gap-2 rounded-lg py-1.5 px-5 select-none data-[focus]:bg-white/10"
                          >
                            <div className="text-lg font-semibold">{role}</div>
                            <CheckIcon
                              className="invisible size-4 fill-white group-data-[selected]:visible right-6 w-5 h-5 text-black"
                              aria-hidden="true"
                            />
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </Listbox>
                  </div>
                </div>
                <div className="my-4">
                  <p className="text-sm text-gray-900">Campus</p>
                  <div className="mx-auto w-full">
                    <Listbox
                      value={member.campus}
                      onChange={(campus) =>
                        setMember({
                          ...member,
                          campus,
                        })
                      }
                    >
                      <div className="flex justify-between items-center">
                        <ListboxButton className="block w-full appearance-none rounded-lg bg-white/5 text-left text-lg font-semibold focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25">
                          {member.campus ?? "Unselected"}
                        </ListboxButton>
                        <ChevronUpIcon
                          className="pointer-events-none absolute right-6 w-6 h-6 text-black"
                          aria-hidden="true"
                        />
                      </div>
                      <ListboxOptions
                        anchor="top"
                        transition
                        className="rounded-xl border w-full border-white/5 bg-white p-1 focus:outline-none transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                      >
                        {universities.map((campus, i) => (
                          <ListboxOption
                            key={i}
                            value={campus}
                            onClick={() =>
                              setMember({
                                ...member,
                                campus,
                              })
                            }
                            className="group flex justify-between cursor-default items-center gap-2 rounded-lg py-1.5 px-5 select-none data-[focus]:bg-white/10"
                          >
                            <div className="text-lg font-semibold">
                              {campus}
                            </div>
                            <CheckIcon
                              className="invisible size-4 fill-white group-data-[selected]:visible right-6 w-5 h-5 text-black"
                              aria-hidden="true"
                            />
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </Listbox>
                  </div>
                </div>
                <div className="my-4">
                  <p className="text-sm text-gray-900">Year</p>
                  <div className="mx-auto w-full">
                    <Listbox
                      value={member.year}
                      onChange={(year) =>
                        setMember({
                          ...member,
                          year,
                        })
                      }
                    >
                      <div className="flex justify-between items-center">
                        <ListboxButton className="block w-full appearance-none rounded-lg bg-white/5 text-left text-lg font-semibold focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25">
                          {(member.year === 6 ? "6+" : member.year) ??
                            "Unselected"}
                        </ListboxButton>
                        <ChevronUpIcon
                          className="pointer-events-none absolute right-6 w-6 h-6 text-black"
                          aria-hidden="true"
                        />
                      </div>
                      <ListboxOptions
                        anchor="top"
                        transition
                        className="rounded-xl border w-full border-white/5 bg-white p-1 focus:outline-none transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                      >
                        {[1, 2, 3, 4, 5, 6].map((year, i) => (
                          <ListboxOption
                            key={i}
                            value={year}
                            onClick={() =>
                              setMember({
                                ...member,
                                year,
                              })
                            }
                            className="group flex justify-between cursor-default items-center gap-2 rounded-lg py-1.5 px-5 select-none data-[focus]:bg-white/10"
                          >
                            <div className="text-lg font-semibold">
                              {year === 6 ? "6+" : year}
                            </div>
                            <CheckIcon
                              className="invisible size-4 fill-white group-data-[selected]:visible right-6 w-5 h-5 text-black"
                              aria-hidden="true"
                            />
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </Listbox>
                  </div>
                </div>
                {updating ? (
                  <div className="flex justify-center items-center">
                    <Loader show />
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={!member.name}
                    className="inline-flex w-full mt-4 justify-center rounded-3xl border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={submit}
                  >
                    {newMember ? "Create" : "Update"}
                  </button>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
