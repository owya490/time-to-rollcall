export type MetadataId = string;

export type MetadataType = "select" | "input";
export interface MetadataModel {
  id: MetadataId;
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

export const InitMetadataInput: MetadataModel = {
  id: "placeholder",
  key: "",
  type: "input",
  values: [],
} as MetadataModel;
