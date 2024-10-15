import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import { GroupModel } from "@/models/Group";
import Loader from "../Loader";
import Tag from "../event/Tag";
import { InitTag, TagModel } from "@/models/Tag";
import { addTag, updateTag } from "@/lib/tags";

export default function EditGroup({
  isOpen,
  closeModal,
  group,
  setGroup,
  submit,
  updating,
}: {
  isOpen: boolean;
  closeModal: () => void;
  group: GroupModel;
  setGroup: (group: GroupModel) => void;
  submit: () => void;
  updating: boolean;
}) {
  const newGroup = group.id === "placeholder";
  const [editTag, setEditTag] = useState<TagModel | null>(null);
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
                  {newGroup ? "Create New Group" : "Edit Group"}
                </DialogTitle>
                <div className="my-4">
                  <p className="text-sm text-gray-900">Name</p>
                  <input
                    type="text"
                    autoFocus
                    className="w-full rounded-none resize-none border-t-0 bg-transparent font-sans text-lg font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:border-t-0 focus:outline-0"
                    placeholder="Jane Doe"
                    value={group.name}
                    onChange={(e) =>
                      setGroup({
                        ...group,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="my-4">
                  <p className="text-sm text-gray-900">Tags</p>
                  <div className="flex flex-wrap justify-center">
                    {group.tags?.map((t, i) =>
                      editTag?.id === t.id ? (
                        <input
                          key={i}
                          type="text"
                          style={{
                            width: `${editTag.name.length + 3}ch`,
                          }}
                          className="rounded-3xl w-auto border-transparent text-center border-2 px-2 py-1 mr-2 my-1 text-xs font-medium bg-white text-black"
                          value={editTag.name}
                          onChange={(e) =>
                            setEditTag({ ...editTag, name: e.target.value })
                          }
                          autoFocus
                          onBlur={async () => {
                            await updateTag(group.id, editTag);
                            setGroup({
                              ...group,
                              tags: [
                                ...group.tags.slice(
                                  0,
                                  group.tags.map((t) => t.id).indexOf(t.id)
                                ),
                                editTag,
                                ...group.tags.slice(
                                  group.tags.map((t) => t.id).indexOf(t.id) + 1
                                ),
                              ],
                            });
                            setEditTag(null);
                          }}
                          onKeyDown={async (event) => {
                            if (event.key === "Enter") {
                              await updateTag(group.id, editTag);
                              setGroup({
                                ...group,
                                tags: [
                                  ...group.tags.slice(
                                    0,
                                    group.tags.map((t) => t.id).indexOf(t.id)
                                  ),
                                  editTag,
                                  ...group.tags.slice(
                                    group.tags.map((t) => t.id).indexOf(t.id) +
                                      1
                                  ),
                                ],
                              });
                              setEditTag(null);
                            }
                          }}
                        />
                      ) : (
                        <Tag
                          key={i}
                          tag={t}
                          selected={group.tags.includes(t)}
                          onClick={() => setEditTag(t)}
                        />
                      )
                    )}
                    {editTag?.id === "placeholder" ? (
                      <input
                        placeholder="Roadtrip"
                        style={{
                          width: `${editTag.name.length + 3}ch`,
                          minWidth: "101px",
                        }}
                        className="rounded-3xl border-transparent border-2 text-center bg-white px-2 py-1 mx-1 my-1 text-xs font-medium text-black"
                        value={editTag.name}
                        onChange={(e) =>
                          setEditTag({ ...editTag, name: e.target.value })
                        }
                        autoFocus
                        onBlur={() => setEditTag(null)}
                        onKeyDown={async (event) => {
                          if (event.key === "Enter") {
                            await addTag(group.id, editTag);

                            setGroup({
                              ...group,
                              tags: group.tags.concat(editTag),
                            });
                            setEditTag(null);
                          }
                        }}
                      />
                    ) : (
                      <button
                        type="button"
                        className="rounded-3xl border-transparent border-2 bg-blue-200 px-3 py-1 mx-1 my-1 text-xs font-medium text-blue-900"
                        onClick={() => setEditTag(InitTag)}
                      >
                        Create Tag +
                      </button>
                    )}
                  </div>
                </div>
                {updating ? (
                  <div className="flex justify-center items-center">
                    <Loader show />
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={!group.name}
                    className="inline-flex w-full mt-4 justify-center rounded-3xl border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={submit}
                  >
                    {newGroup ? "Create" : "Update"}
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
