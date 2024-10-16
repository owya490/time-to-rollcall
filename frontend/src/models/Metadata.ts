export type MetadataModelId = string;

export interface MetadataModel {
  id: MetadataModelId;
  key: string;
  values: MetadataValueModel;
}

export type MetadataModelValueId = string;

export interface MetadataValueModel {
  [id: MetadataModelValueId]: string;
}

export const InitMetadata = {
  id: "placeholder",
  key: "",
  values: [],
};
