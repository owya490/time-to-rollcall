export type MetadataId = string;

export type MetadataType = "select" | "input";
export interface MetadataModel {
  id: MetadataId;
  key: string;
  type: MetadataType;
  order: number;
}

export interface MetadataSelectModel extends MetadataModel {
  values: MetadataValueModel;
}

export interface MetadataInputModel extends MetadataModel {}

export type MetadataValueId = string;

export interface MetadataValueModel {
  [id: MetadataValueId]: string;
}

export const InitMetadataInput = (order: number): MetadataModel => ({
  id: "placeholder",
  key: "",
  type: "input",
  order,
});
