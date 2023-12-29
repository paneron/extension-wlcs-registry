import type {
  BaseFieldConfiguration,
  BasicFieldConfiguration,
  BasicFieldType,
  // FieldType,
  GenericClassConfiguration,
  GenericFieldConfiguration,
} from '@/schemaLoader';


import type {
  // MapSchema,
  MapSchemaTypes,
} from '@/uiTypeBridge';

// export const commonItemMetaClasses: ItemMetaClass[] = [
//   'uuidentifiable',
//   'timestampable',
//   'remarkable',
// ];

export const itemClasses = [
  'authority',
  'code-status',
  'spelling-system',
  'system-code',
  'system-relation',
  'system-relation-type',
  'system-status',
] as const;

export type ItemClass = typeof itemClasses[number];

// export type FieldName = ItemClass;
export type FieldName<T extends string> = T;

export const standardClasses = [
  'ISO15924',
  'ISO639',
  'ISO3166',
] as const;

export type StandardClass = typeof standardClasses[number];

export interface StandardClassType {
  type: 'standardClass',
  id: StandardClass,
}

export interface ItemClassType {
  type: 'itemClass',
  id: ItemClass,
}

// export type SpecializedFieldType = StandardClassType | ItemClassType;

export type FieldTypeSpecialization =
  StandardClass |
  ItemClass |
  StandardClassType |
  ItemClassType;

// // TODO: obsolete this:
// export type FieldType =
// | 'uuid'
// | 'text'
// | 'textarea'
// | 'number'
// | 'date'
// | 'datetime'
// | 'boolean'
// | 'list'
// | 'standardClass'
// | 'itemClass'
// ;

// export interface BaseFieldConfiguration {
//   id: string;
//   title: string;
//   type: FieldType;
//   optional?: boolean;
// }

// export type BasicFieldType =
// | 'uuid'
// | 'text'
// | 'textarea'
// | 'number'
// | 'date'
// | 'datetime'
// | 'boolean'
// ;

// export type BasicFieldConfiguration = BaseFieldConfiguration & {
//   type: BasicFieldType;
//   typeSpecialization?: never;
// }

// export type ListFieldConfiguration = BaseFieldConfiguration & {
//   type: 'list';
//   typeSpecialization: FieldTypeSpecialization;
// }

// export type StandardClassFieldConfiguration = BaseFieldConfiguration & {
//   type: 'standardClass';
//   typeSpecialization: StandardClassType | StandardClass;
// }

// export type ItemClassFieldConfiguration = BaseFieldConfiguration & {
//   type: 'itemClass';
//   typeSpecialization: ItemClassType | ItemClass;
// }

// export type FieldConfiguration =
// | BasicFieldConfiguration
// | ListFieldConfiguration
// | StandardClassFieldConfiguration
// | ItemClassFieldConfiguration
// ;


// // export interface ClassConfiguration<T extends Object, U extends keyof T> {
// // export interface ClassConfiguration<T extends object> {

// export type ClassConfiguration = GenericClassConfiguration<FieldConfiguration>;

export function itemFieldsToMappableSchemaTypes<T extends string>(itemFields: GenericFieldConfiguration[]):
Record<T, keyof MapSchemaTypes> {
  return itemFields.reduce<Record<string, keyof MapSchemaTypes>>((acc, field) => {
    acc[field.id] = field.type;
    return acc;
  }, {});
}

/**
 * First field is the ID field
 */
// export const classes: Record<ItemClass, ClassConfiguration<unknown>> = {
// export const classes: Record<ItemClass, ClassConfiguration> = {
//   'authority' : {
//     title       : 'Authority',
//     description : 'Conversion System Authority',
//     id          : 'authority',
//     interfaces  : commonItemMetaClasses,
//     fields      : [
//       {
//         id    : 'authorityIdentifier',
//         title : 'Authority Identifier',
//         type  : 'text',
//       },
//       {
//         id    : 'name',
//         title : 'Name',
//         type  : 'text',
//       },
//     ],
//   },
//   'code-status' : {
//     title       : 'Code Status',
//     description : 'Conversion System Code Status',
//     id          : 'code-status',
//     interfaces  : commonItemMetaClasses,
//     fields      : [
//       {
//         id    : 'codeStatus',
//         title : 'Code Status',
//         type  : 'text',
//       },
//     ],
//   },
//   'spelling-system' : {
//     title       : 'Spelling System',
//     description : 'Conversion Spelling System',
//     id          : 'spelling-system',
//     interfaces  : commonItemMetaClasses,
//     fields      : [
//       {
//         id                 : 'languageCode',
//         title              : 'Language Code',
//         type               : 'standardClass',
//         typeSpecialization : 'ISO15924',
//         optional           : true,
//       },
//       {
//         id                 : 'scriptCode',
//         title              : 'Script Code',
//         type               : 'standardClass',
//         typeSpecialization : 'ISO639',
//       },
//       {
//         id                 : 'countryCode',
//         title              : 'Country Code',
//         type               : 'standardClass',
//         typeSpecialization : 'ISO3166',
//         optional           : true,
//       },
//       {
//         id    : 'extension',
//         title : 'Extension',
//         type  : 'text',
//       },
//     ],
//   },
//   'system-code' : {
//     title       : 'System Code',
//     description : 'Conversion System Code',
//     id          : 'system-code',
//     interfaces  : commonItemMetaClasses,
//     fields      : [
//       {
//         id    : 'code',
//         title : 'Code',
//         type  : 'text',
//       },
//       {
//         id    : 'name',
//         title : 'Name',
//         type  : 'text',
//       },
//       {
//         id                 : 'authority',
//         title              : 'Authority',
//         type               : 'itemClass',
//         typeSpecialization : 'authority',
//       },
//       {
//         id                 : 'sourceSpelling',
//         title              : 'Source Spelling System',
//         type               : 'itemClass',
//         typeSpecialization : 'spelling-system',
//       },
//       {
//         id                 : 'targetSpelling',
//         title              : 'Target Spelling System',
//         type               : 'itemClass',
//         typeSpecialization : 'spelling-system',
//       },
//       {
//         id    : 'identifyingSegment',
//         title : 'Identifying Segment',
//         type  : 'text',
//       },
//       {
//         id                 : 'relations',
//         title              : 'Relations',
//         type               : 'list',
//         typeSpecialization : { type : 'itemClass', id : 'system-relation' },
//       },
//       {
//         id                 : 'codeStatus',
//         title              : 'Code Status',
//         type               : 'itemClass',
//         typeSpecialization : 'code-status',
//       },
//       {
//         id                 : 'systemStatus',
//         title              : 'System Status',
//         type               : 'itemClass',
//         typeSpecialization : 'system-status',
//       }
//     ],
//   },
//   'system-relation' : {
//     title       : 'Relation',
//     description : 'Conversion System Relation',
//     id          : 'system-relation',
//     interfaces  : commonItemMetaClasses,
//     fields      : [
//       {
//         id    : 'type',
//         title : 'Relation Type',
//         type  : 'text',
//       },
//       {
//         id                 : 'targetSystem',
//         title              : 'Target System',
//         type               : 'itemClass',
//         typeSpecialization : 'system-code',
//       },
//     ],
//   },
//   'system-relation-type' : {
//     title       : 'System Relation Type',
//     description : 'Conversion System Relation Type',
//     id          : 'system-relation-type',
//     interfaces  : commonItemMetaClasses,
//     fields      : [
//       {
//         id    : 'systemRelationType',
//         title : 'System Relation Type',
//         type  : 'text',
//       },
//     ],
//   },
//   'system-status' : {
//     title       : 'System Status',
//     description : 'Conversion System Status',
//     id          : 'system-status',
//     interfaces  : commonItemMetaClasses,
//     fields      : [
//       {
//         id    : 'systemStatus',
//         title : 'System Status',
//         type  : 'text',
//       },
//     ],
//   },
// };
// } as const; // <- This is not recommended, as this prevents us from extending it to allow for external sources of schema definitions.

// type AllClassSchemas = typeof classes;

// type FieldArrayToObject<T extends FieldConfiguration[]> = {
//   [K in T[number] as K['id']]: T[number] extends FieldType ? FieldType : T[number];
// }

// const tuple = <T extends string>(args: T[]) => args;
// const furniture = tuple(['chair', 'table', 'lamp']);
// type Furniture = typeof furniture[number];

// interface TurnTypeToFieldType<T extends { [K in keyof FieldConfiguration]: string; }> {
// // [K in keyof typeof T]: K extends 'type' ? FieldType : T[K];
// }

// type AllClassFields = AllClassSchemas[keyof AllClassSchemas]['fields'];
// type Test = FieldArrayToObject<AllClassSchemas[keyof AllClassSchemas]['fields']>;
// export const itemClassToFields: Record<ItemClass, FieldConfiguration[]> =

// export const itemClassToFields: Record<ItemClass, typeof classes[ItemClass]['fields']> =
// Object.entries(classes).reduce((acc, [itemClass, itemClassPresentation]) => {
//   acc[itemClass as ItemClass] = itemClassPresentation.fields;
//   return acc;
// }, {} as Record<ItemClass, typeof classes[ItemClass]['fields']>);


// type Temp<IC extends ItemClass> = Array<typeof classes[IC]['fields'][number]['id']>;
// export const itemClassToFieldIds: Record<ItemClass, Temp<ItemClass>> =
// Object.entries(classes).reduce((acc, [itemClass, itemClassPresentation]) => {
//   acc[itemClass as ItemClass] = itemClassPresentation.fields.map(field => field.id);
//   return acc;
// }, {} as Record<ItemClass, Temp<ItemClass>>);

// export type ItemClassToFieldIds = typeof itemClassToFieldIds;

// type ItemClassSchema<T extends ItemClass> = Record<T, keyof MapSchemaTypes>;

// type ValueOf<T> = T extends any[] ? T[number] : T[keyof T];

// type ArrayToObject<T extends ReadonlyArray<{ id: string, type: string}>> = {
//     [K in T[number] as K['id']]: K['type']
// };

// type MappedArrayToObject<T extends ReadonlyArray<{ id: string, type: keyof MapSchemaTypes}>> = {
//     [K in T[number] as K['id']]: MapSchemaTypes[K['type']]
// };

// type Id<T> = T;

// export type ItemClassSchemaFields<T extends ItemClass> = MappedArrayToObject<typeof itemClassToFields[T]>;


// export interface ClassPresentationConfiguration<T extends ItemClass> {
//   identifier?(itemData: ItemClassSchemaFields<T>): string;
//   name?(itemData: ItemClassSchemaFields<T>): string;
// }

// export const classesPresentation = {
//   'authority' : {
//   },
//   'code-status' : {
//     name() {
//       return '';
//     },
//   },
//   'spelling-system' : {
//     identifier(itemData: ItemClassSchemaFields<'spelling-system'>) {
//       return [
//         itemData.languageCode,
//         itemData.scriptCode,
//         itemData.countryCode,
//         itemData.extension
//       ].filter(Boolean).join('-');
//     },
//     name() {
//       return '';
//     },
//   },
//   'system-code' : {
//     identifier(itemData: ItemClassSchemaFields<'system-code'>) {
//       return [
//         itemData.authority,
//         itemData.sourceSpelling,
//         itemData.targetSpelling,
//         itemData.identifyingSegment,
//       ].filter(Boolean).join(':');
//     },
//   },
//   'system-relation' : {
//     identifier(itemData: ItemClassSchemaFields<'system-relation'>) {
//       return `${itemData.type}${itemData.targetSystem}`;
//     },
//     name() {
//       return '';
//     },
//   },
//   'system-relation-type' : {
//     name() {
//       return '';
//     },
//   },
//   'system-status' : {
//     name() {
//       return '';
//     },
//   },
// };
