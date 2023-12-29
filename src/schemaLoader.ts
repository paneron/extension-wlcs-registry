// export interface ClassSchema<T extends BaseFieldConfiguration> {
//   [itemClass: string]: GenericClassConfiguration<T>;
// }


export const itemMetaClasses = [
  'uuidentifiable',
  'timestampable',
  'remarkable',
] as const;

export type ItemMetaClass = typeof itemMetaClasses[number];

export type FieldOrValue<T> = { field: string; value?: never; } | { value: T; field?: never; };

export interface GenericClassConfiguration {
  title: string;
  description: string;
  id: string;
  fields: GenericFieldConfiguration[];
  interfaces: ItemMetaClass[];
  presentation: {
    /**
     * Used by ListPrinter
     */
    list: {
      identifier: FieldOrValue<string>;
      name: FieldOrValue<string>;
    }
    /**
     * Other views can be added here
     */
  }
}

export interface ClassSchema {
  [itemClass: string]: GenericClassConfiguration;
}

export type GenericFieldConfiguration =
| BasicFieldConfiguration
| GeneratedTextFieldConfiguration
| InternalReferenceClassFieldConfiguration
| ExternalReferenceClassFieldConfiguration
;

// TODO: define a way to specify:
// - internal/external reference classes with their reference class ID
// - list of internal/external reference classes with their reference class ID

// export type CompoundFieldConfiguration = BaseFieldConfiguration & {
//   type: 'compound',
//   typeParam: GenericFieldConfiguration[],
// }

export const basicFieldTypes = [
  'uuid',
  'text',
  'textarea',
  'number',
  'date',
  'datetime',
  'boolean',
] as const;

export type BasicFieldType = typeof basicFieldTypes[number];

export interface BaseFieldConfiguration {
  id: string;
  title: string;
  optional?: boolean;
  isList?: boolean;
}

export type BasicFieldConfiguration = BaseFieldConfiguration & {
  type: BasicFieldType;
  typeParam?: never,
  generator?: never;
};

export type GeneratedTextFieldConfiguration = BaseFieldConfiguration & {
  type: 'generated-text';
  typeParam?: never;
  generator: {
    language: string,
    code: string
  };
};

export type ExternalReferenceClassFieldConfiguration = BaseFieldConfiguration & {
  type: 'externalReferenceClass';
  typeParam: string;
  generator?: never;
};

export type InternalReferenceClassFieldConfiguration = BaseFieldConfiguration & {
  type: 'internalReferenceClass';
  typeParam: string;
  generator?: never;
};

// TODO: define type guards for the above field configurations,
// for use in the schema loader

export const hasBaseFieldConfiguration = (o: any): boolean => {
  return (typeof o === 'object') &&
    'id' in o &&
    'title' in o &&
    'type' in o
  ;
};

export const isBasicFieldConfiguration = (o: any): o is BasicFieldConfiguration => {
  return (typeof o === 'object') &&
  hasBaseFieldConfiguration(o) &&
  ! ('typeParam' in o) &&
    o.type in basicFieldTypes;
};

export const isGeneratedTextFieldConfiguration = (o: any): o is GeneratedTextFieldConfiguration => {
  return (typeof o === 'object') &&
  hasBaseFieldConfiguration(o) &&
    o.type === 'generated-text' &&
  'generator' in o;
};

export const isExternalReferenceClassFieldConfiguration = (o: any): o is ExternalReferenceClassFieldConfiguration => {
  return (typeof o === 'object') &&
  hasBaseFieldConfiguration(o) &&
    o.type === 'externalReferenceClass' &&
  'typeParam' in o;
};

export const isInternalReferenceClassFieldConfiguration = (o: any): o is InternalReferenceClassFieldConfiguration => {
  return (typeof o === 'object') &&
  hasBaseFieldConfiguration(o) &&
    o.type === 'internalReferenceClass' &&
  'typeParam' in o;
};

export const isGenericFieldConfiguration = (o: any): o is GenericFieldConfiguration => {
  return isBasicFieldConfiguration(o) ||
    isGeneratedTextFieldConfiguration(o) ||
    isExternalReferenceClassFieldConfiguration(o) ||
    isInternalReferenceClassFieldConfiguration(o);
};

export const isGenericClassConfiguration = (o: any): o is GenericClassConfiguration => {
  return (typeof o === 'object') &&
    // 'title' in o &&
    // 'description' in o &&
    // 'id' in o &&
    // 'fields' in o &&
    // 'interfaces' in o &&
    // 'presentation' in o &&
    o.fields.every(isGenericFieldConfiguration)
  ;
};

export const isClassSchema = (o: any): o is ClassSchema => {
  return (typeof o === 'object') &&
    Object.values(o).every((value) =>
      isGenericClassConfiguration(value)
    );
};

export type ClassSchemaJSONDeserializer = (potentialJsonString: string) => Result<ClassSchema, JSONParseError>;

export type Result<T, E extends Error> = {
  result: T;
  error?: never;
} | {
  error: E;
  result?: T;
};


export class JSONParseError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}



export const classSchemaJSONDeserializer: ClassSchemaJSONDeserializer = (potentialJsonString: string) => {
  const obj = JSON.parse(potentialJsonString);

  if (typeof obj !== 'object') {
    return {
      error : new JSONParseError('input is not an object'),
    };
  }

  if (! isClassSchema(obj)) {
    return {
      error : new JSONParseError('input is not a class schema'),
    };
  }

  return {
    result : obj,
  };
};
