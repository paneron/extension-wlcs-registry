// https://stackoverflow.com/questions/45771307/typescript-dynamically-create-interface
export interface MapSchemaTypes {
  uuid: string;
  string: string;
  text: string;
  textarea: string;
  number: number;
  boolean: boolean;
  date: Date;
  time: Date;
  datetime: Date;
  'externalReferenceClass': string; // ID for standard
  'internalReferenceClass': string; // ID for item
  list: any[];
  'generated-text': string;
}

/**
 * Expects an object mapping from field name to field type (those that are the
 * keys of MapSchemaTypes).
 */
export type MapSchema<T extends Record<string, keyof MapSchemaTypes>> = {
  -readonly [K in keyof T]: MapSchemaTypes[T[K]]
}
