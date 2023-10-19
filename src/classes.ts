export type FieldName = string;

export const itemMetaClasses = [
  'timestampable',
  'remarkable',
] as const;

export type ItemMetaClass = typeof itemMetaClasses[number];

export const commonItemMetaClasses: ItemMetaClass[] = [
  'timestampable',
  'remarkable',
];

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

export type FieldType =
  'text' |
  'textarea' |
  'number' |
  'date' |
  'datetime' |
  'boolean' |
  'list' |
  'standardClass' |
  'itemClass';

export interface FieldConfiguration {
  id: FieldName
  title: string;
  type: FieldType;
  typeSpecialization?: FieldTypeSpecialization;
  optional?: boolean;
}

export interface ClassConfiguration {
  title: string;
  description: string;
  id: string;
  // fields: Record<FieldName, FieldConfiguration>;
  fields: FieldConfiguration[];
  interfaces: ItemMetaClass[];
}

export interface ClassPresentationConfiguration {
  identifier?(itemData: any): string;
  name?(itemData: any): string;
}

/**
 * First field is the ID field
 */
export const classes: Record<ItemClass, ClassConfiguration> = {
  'authority' : {
    title       : 'Authority',
    description : 'Conversion System Authority',
    id          : 'authority',
    interfaces  : commonItemMetaClasses,
    fields      : [
      {
        id    : 'authorityIdentifier',
        title : 'Authority Identifier',
        type  : 'text',
      },
      {
        id    : 'name',
        title : 'Name',
        type  : 'text',
      },
    ],
  },
  'code-status' : {
    title       : 'Code Status',
    description : 'Conversion System Code Status',
    id          : 'code-status',
    interfaces  : commonItemMetaClasses,
    fields      : [
      {
        id    : 'codeStatus',
        title : 'Code Status',
        type  : 'text',
      },
    ],
  },
  'spelling-system' : {
    title       : 'Spelling System',
    description : 'Conversion Spelling System',
    id          : 'spelling-system',
    interfaces  : commonItemMetaClasses,
    fields      : [
      {
        id                 : 'languageCode',
        title              : 'Language Code',
        type               : 'standardClass',
        typeSpecialization : 'ISO15924',
        optional           : true,
      },
      {
        id                 : 'scriptCode',
        title              : 'Script Code',
        type               : 'standardClass',
        typeSpecialization : 'ISO639',
      },
      {
        id                 : 'countryCode',
        title              : 'Country Code',
        type               : 'standardClass',
        typeSpecialization : 'ISO3166',
        optional           : true,
      },
      {
        id    : 'extension',
        title : 'Extension',
        type  : 'text',
      },
    ],
  },
  'system-code' : {
    title       : 'System Code',
    description : 'Conversion System Code',
    id          : 'system-code',
    interfaces  : commonItemMetaClasses,
    fields      : [
      {
        id    : 'code',
        title : 'Code',
        type  : 'text',
      },
      {
        id    : 'name',
        title : 'Name',
        type  : 'text',
      },
      {
        id                 : 'authority',
        title              : 'Authority',
        type               : 'itemClass',
        typeSpecialization : 'authority',
      },
      {
        id                 : 'sourceSpelling',
        title              : 'Source Spelling System',
        type               : 'itemClass',
        typeSpecialization : 'spelling-system',
      },
      {
        id                 : 'targetSpelling',
        title              : 'Target Spelling System',
        type               : 'itemClass',
        typeSpecialization : 'spelling-system',
      },
      {
        id    : 'identifyingSegment',
        title : 'Identifying Segment',
        type  : 'text',
      },
      {
        id                 : 'relations',
        title              : 'Relations',
        type               : 'list',
        typeSpecialization : { type : 'itemClass', id : 'system-relation' },
      },
      {
        id                 : 'codeStatus',
        title              : 'Code Status',
        type               : 'itemClass',
        typeSpecialization : 'code-status',
      },
      {
        id                 : 'systemStatus',
        title              : 'System Status',
        type               : 'itemClass',
        typeSpecialization : 'system-status',
      }
    ],
  },
  'system-relation' : {
    title       : 'Relation',
    description : 'Conversion System Relation',
    id          : 'system-relation',
    interfaces  : commonItemMetaClasses,
    fields      : [
      {
        id    : 'type',
        title : 'Relation Type',
        type  : 'text',
      },
      {
        id                 : 'targetSystem',
        title              : 'Target System',
        type               : 'itemClass',
        typeSpecialization : 'system-code',
      },
    ],
  },
  'system-relation-type' : {
    title       : 'System Relation Type',
    description : 'Conversion System Relation Type',
    id          : 'system-relation-type',
    interfaces  : commonItemMetaClasses,
    fields      : [
      {
        id    : 'systemRelationType',
        title : 'System Relation Type',
        type  : 'text',
      },
    ],
  },
  'system-status' : {
    title       : 'System Status',
    description : 'Conversion System Status',
    id          : 'system-status',
    interfaces  : commonItemMetaClasses,
    fields      : [
      {
        id    : 'systemStatus',
        title : 'System Status',
        type  : 'text',
      },
    ],
  },
};

export const classesPresentation: Record<ItemClass, ClassPresentationConfiguration> = {
  'authority' : {
  },
  'code-status' : {
    name() {
      return '';
    },
  },
  'spelling-system' : {
    identifier(itemData) {
      return [
        itemData.languageCode,
        itemData.scriptCode,
        itemData.countryCode,
        itemData.extension
      ].filter(Boolean).join('-');
    },
    name() {
      return '';
    },
  },
  'system-code' : {
  },
  'system-relation' : {
    identifier(itemData) {
      return itemData.type + itemData.targetSystem;
    },
    name() {
      return '';
    },
  },
  'system-relation-type' : {
    name() {
      return '';
    },
  },
  'system-status' : {
    name() {
      return '';
    },
  },
};
