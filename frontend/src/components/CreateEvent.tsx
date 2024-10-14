import { convertToDateTimeLocalString } from "@/helper/Time";
import { addTag } from "@/lib/tags";
import { SubmitEventModel } from "@/models/Event";
import { GroupId } from "@/models/Group";
import { TagModel } from "@/models/Tag";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import Tag from "./event/Tag";

export default function CreateEvent({
  groupId,
  tags,
  setTags,
  isOpen,
  closeModal,
  submitEventForm,
  setSubmitEventForm,
  createEvent,
  selectedIndex,
  setSelectedIndex,
}: {
  groupId: GroupId;
  tags?: TagModel[];
  setTags: (tags: TagModel[]) => void;
  isOpen: boolean;
  closeModal: () => void;
  submitEventForm: SubmitEventModel;
  setSubmitEventForm: (event: SubmitEventModel) => void;
  createEvent: () => void;
  selectedIndex: number;
  setSelectedIndex: (i: number) => void;
}) {
  const [toggleAddTag, setToggleAddTag] = useState(false);
  const [newTag, setNewTag] = useState("");

  function incrementStep() {
    setSelectedIndex(selectedIndex + 1);
  }
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
              <DialogPanel className="rounded-t-3xl bg-white p-6 text-center shadow-xl">
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
                <TabGroup
                  selectedIndex={selectedIndex}
                  onChange={setSelectedIndex}
                >
                  <TabList className="flex justify-center space-x-2 rounded-xl p-1.5">
                    <Tab
                      className={({ selected }) =>
                        selected || selectedIndex >= 1
                          ? "w-12 h-0.5 rounded-xl bg-blue-500"
                          : "w-12 h-0.5 rounded-xl bg-blue-100"
                      }
                    />
                    <Tab
                      className={({ selected }) =>
                        selected || selectedIndex >= 2
                          ? "w-12 h-0.5 rounded-xl bg-blue-500"
                          : "w-12 h-0.5 rounded-xl bg-blue-100"
                      }
                      disabled={!submitEventForm.name}
                    />
                    <Tab
                      className={({ selected }) =>
                        selected || selectedIndex >= 3
                          ? "w-12 h-0.5 rounded-xl bg-blue-500"
                          : "w-12 h-0.5 rounded-xl bg-blue-100"
                      }
                    />
                  </TabList>
                  <TabPanels className="mt-3">
                    <TabPanel>
                      <ul>
                        <DialogTitle
                          as="h3"
                          className="text-xl font-medium leading-6 text-gray-900"
                        >
                          Create Your event.
                        </DialogTitle>
                        <p className="mt-2 px-12 text-sm text-gray-500">
                          Start by naming your event. This will be the name
                          displayed for everyone but it can always be changed
                          later.
                        </p>
                        <input
                          type="text"
                          autoFocus
                          className="my-11 w-full rounded-none resize-none text-center border-b border-blue-gray-200 border-t-0 bg-transparent pt-4 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:border-t-0 focus:outline-0"
                          placeholder="Awesome Event"
                          value={submitEventForm.name}
                          onChange={(event) =>
                            setSubmitEventForm({
                              ...submitEventForm,
                              name: event.target.value,
                            })
                          }
                        />
                      </ul>
                    </TabPanel>
                    <TabPanel>
                      <ul>
                        <DialogTitle
                          as="h3"
                          className="text-xl font-medium leading-6 text-gray-900"
                        >
                          Categorise your event.
                        </DialogTitle>
                        <p className="mt-2 px-8 text-sm text-gray-500">
                          Attach relevant tags make it easier to organise your
                          events into categories.
                        </p>
                        <p className="mt-7 mb-1 text-xs font-light text-gray-400">
                          Add Tags
                        </p>
                        <div className="flex flex-wrap justify-center">
                          {tags?.map((t, i) => (
                            <Tag
                              key={i}
                              tag={t}
                              selected={submitEventForm.tagIds.includes(t.id)}
                              onClick={() =>
                                setSubmitEventForm({
                                  ...submitEventForm,
                                  tagIds: submitEventForm.tagIds.includes(t.id)
                                    ? submitEventForm.tagIds
                                        .slice(
                                          0,
                                          submitEventForm.tagIds.indexOf(t.id)
                                        )
                                        .concat(
                                          submitEventForm.tagIds.slice(
                                            submitEventForm.tagIds.indexOf(
                                              t.id
                                            ) + 1
                                          )
                                        )
                                    : submitEventForm.tagIds.concat(t.id),
                                })
                              }
                            />
                          ))}
                          {toggleAddTag ? (
                            <input
                              type="text"
                              placeholder="Weekly Meeting"
                              className="rounded-3xl border-transparent border-2 text-center bg-white px-2 py-1 mx-1 my-1 text-xs font-medium w-32 text-black"
                              value={newTag}
                              onChange={(event) =>
                                setNewTag(event.target.value)
                              }
                              autoFocus
                              onBlur={() => setToggleAddTag(false)}
                              onKeyDown={(event) =>
                                event.key === "Enter" &&
                                addTag(groupId, newTag).then((tagId) => {
                                  setTags(
                                    (tags ?? []).concat({
                                      id: tagId,
                                      name: newTag,
                                    })
                                  );
                                  setToggleAddTag(false);
                                  setNewTag("");
                                })
                              }
                            />
                          ) : (
                            <button
                              type="button"
                              className="rounded-3xl border-transparent border-2 bg-blue-200 px-3 py-1 mx-1 my-1 text-xs font-medium text-blue-900"
                              onClick={() => setToggleAddTag(true)}
                            >
                              Create New Tag +
                            </button>
                          )}
                        </div>
                      </ul>
                    </TabPanel>
                    <TabPanel>
                      <ul>
                        <DialogTitle
                          as="h3"
                          className="text-xl font-medium leading-6 text-gray-900"
                        >
                          Set the day and time.
                        </DialogTitle>
                        <div className="flex flex-wrap mt-16 mb-4 justify-between items-center">
                          <p className="text-xs">Start Time</p>
                          <input
                            type="datetime-local"
                            value={convertToDateTimeLocalString(
                              submitEventForm.dateStart
                            )}
                            onChange={(event) => {
                              setSubmitEventForm({
                                ...submitEventForm,
                                dateStart: new Date(event.target.value),
                              });
                            }}
                          />
                        </div>
                        <div className="flex flex-wrap mb-16 justify-between items-center">
                          <p className="text-xs">End Time</p>
                          <input
                            type="datetime-local"
                            value={convertToDateTimeLocalString(
                              submitEventForm.dateEnd
                            )}
                            onChange={(event) =>
                              setSubmitEventForm({
                                ...submitEventForm,
                                dateEnd: new Date(event.target.value),
                              })
                            }
                            min={convertToDateTimeLocalString(
                              submitEventForm.dateStart
                            )}
                          />
                        </div>
                      </ul>
                    </TabPanel>
                  </TabPanels>
                  <button
                    type="button"
                    disabled={
                      selectedIndex === 0
                        ? !submitEventForm.name
                        : selectedIndex === 1
                        ? false
                        : selectedIndex === 2
                        ? !submitEventForm.dateStart || !submitEventForm.dateEnd
                        : false
                    }
                    className="inline-flex w-full mt-4 justify-center rounded-3xl border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={selectedIndex === 2 ? createEvent : incrementStep}
                  >
                    {selectedIndex === 2 ? "Create event" : "Next"}
                  </button>
                </TabGroup>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
