export type MetadataModelId = string;

export type MetadataType = "select" | "input";
export interface MetadataModel {
  id: MetadataModelId;
  key: string;
  type: MetadataType;
}

export interface MetadataSelectModel extends MetadataModel {
  values: MetadataValueModel;
}

export interface MetadataInputModel extends MetadataModel {}

export type MetadataValueId = string;

export interface MetadataValueModel {
  [id: MetadataValueId]: string;
}

export const InitMetadata = {
  id: "placeholder",
  key: "",
  type: "select",
  values: [],
};
