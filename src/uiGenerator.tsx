/** @jsx jsx */
/** @jsxFrag React.Fragment */

import {
  css,
  jsx,
} from '@emotion/react';
import React from 'react';

import {
  GenericRelatedItemView,
  PropertyDetailView,
} from '@riboseinc/paneron-registry-kit/views/util';

import type {
  InternalItemReference,
  ItemClassConfiguration,
} from '@riboseinc/paneron-registry-kit/types';

import {
  FormGroup,
  InputGroup,
  TextArea,
} from '@blueprintjs/core';


import type {
  ListPrinter,
} from '@/classes/common';


import {
  ListItemViewPrinter,
  textInputProps
} from '@/classes/common';

import {
  classes,
  classesPresentation,
} from '@/classes';

import type {
  ItemClass,
  ItemMetaClass,
  FieldName,
  StandardClass,
  StandardClassType,
  ItemClassType,
  // SpecializedFieldType,
  FieldType,
  FieldTypeSpecialization,
  FieldConfiguration,
  ClassConfiguration,
} from '@/classes';


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
  standardClass: string; // ID for standard
  itemClass: string; // ID for item
  list: any[];
}

export function itemFieldsToMappableSchemaTypes(itemFields: FieldConfiguration[]):
Record<string, keyof MapSchemaTypes> {
  return itemFields.reduce<Record<string, keyof MapSchemaTypes>>((acc, field) => {
    acc[field.id] = field.type;
    return acc;
  }, {});
}

/**
 * Expects an object mapping from field name to field type (those that are the
 * keys of MapSchemaTypes).
 */
type MapSchema<T extends Record<string, keyof MapSchemaTypes>> = {
  -readonly [K in keyof T]: MapSchemaTypes[T[K]]
}

export function ui(itemClassName: ItemClass) {
  const itemClass = classes[itemClassName];
  const itemClassPresentation = classesPresentation[itemClassName];

  const itemFields = itemClass.fields;

  const interfaces = itemClass.interfaces;

  /** supplement itemFields with interfaces */
  if (interfaces.includes('uuidentifiable')) {
    itemFields.unshift({
      id    : 'uuid',
      title : 'UUID',
      type  : 'uuid',
    });
  }

  if (interfaces.includes('remarkable')) {
    itemFields.push({
      id    : 'remarks',
      title : 'Remarks',
      type  : 'textarea',
    });
  }

  if (interfaces.includes('timestampable')) {
    itemFields.push({
      id    : 'timestampable--created-at',
      title : 'Created at',
      type  : 'datetime',
    }, {
      id    : 'timestampable--updated-at',
      title : 'Updated at',
      type  : 'datetime',
    });
  }

  const itemClassSchemaTypes = itemFieldsToMappableSchemaTypes(itemFields);

  type ItemClassSchema = MapSchema<typeof itemClassSchemaTypes>;

  // Set empty string as default for now
  const itemDefaults = itemClass.fields.reduce((acc, field) => {
    return {
      ...acc,
      [field.id] : '',
    };
  }, {});

  const identifierField = itemClass.fields[0];

  const listPrinter: ListPrinter<ItemClassSchema> = {
    identifier(itemData) {
      return typeof itemClassPresentation.identifier !== 'undefined' ?
        itemClassPresentation.identifier(itemData) :
        itemData[identifierField.id] as string;
    },
    name(itemData) {
      return typeof itemClassPresentation.name !== 'undefined' ?
        itemClassPresentation.name(itemData) :
        itemData.name as string;
    },
  };

  const itemClassConfiguration: ItemClassConfiguration<ItemClassSchema> = {
    meta : {
      title            : itemClass.title,
      description      : itemClass.description,
      id               : itemClass.id,
      alternativeNames : [],
    },
    defaults : itemDefaults,
    views    : {
      listItemView : ListItemViewPrinter<ItemClassSchema>(listPrinter),
      detailView   : (props) => {
        const data = props.itemData;

        return (
          <>
            {props.children}

            {
              itemFields.map(field => {
                switch (field.type) {
                  case 'uuid': {
                    return (
                      <PropertyDetailView inline title={field.title} key={field.id}>
                        {data[field.id] ? data[field.id] : <em>to be generated</em>}
                      </PropertyDetailView>
                    );
                  }

                  case 'text': {
                    return (
                      <PropertyDetailView inline title={field.title} key={field.id}>
                        {data[field.id]}
                      </PropertyDetailView>
                    );
                  }

                  case 'textarea': {
                    return (
                      <PropertyDetailView inline title={field.title} key={field.id}>
                        {data[field.id]}
                      </PropertyDetailView>
                    );
                  }

                  // TODO:
                  case 'itemClass': {
                    return (
                      <PropertyDetailView inline title={field.title} key={field.id}>
                        {data[field.id]}
                      </PropertyDetailView>
                    );
                  }

                  // TODO:
                  case 'standardClass': {
                    return (
                      <PropertyDetailView inline title={field.title} key={field.id}>
                        {data[field.id]}
                      </PropertyDetailView>
                    );
                  }

                  // TODO:
                  case 'datetime': {
                    return (
                        data[field.id] ?
                        <PropertyDetailView inline title={field.title} key={field.id}>
                          {data[field.id]}
                        </PropertyDetailView> :
                        <></>
                    );
                  }
                }
              })
            }
          </>
        )
      },
      editView : (props) => (
        <>
          {
            itemFields.map(field => {
              switch (field.type) {
                /** readonly */
                case 'uuid': {
                  return (
                    <FormGroup label={`${field.title}:`} key={field.id}>
                      {props.itemData[field.id] ? props.itemData[field.id] : <em>to be generated</em>}
                    </FormGroup>
                  );
                }

                case 'textarea': {
                  return (
                    <FormGroup label={`${field.title}:`} key={field.id}>
                      <TextArea fill required value={props.itemData[field.id] as string}
                        {...textInputProps(props.itemData, props.onChange)(field.id)} />
                    </FormGroup>
                  );
                }

                case 'text': {
                  return (
                    <FormGroup label={`${field.title}:`} key={field.id}>
                      <InputGroup required value={props.itemData[field.id] as string}
                        {...textInputProps(props.itemData, props.onChange)(field.id)} />
                    </FormGroup>
                  );
                }

                // TODO:
                case 'itemClass': {
                  return (
                    <FormGroup label={`${field.title}:`} key={field.id}>
                      <InputGroup required value={props.itemData[field.id] as string}
                        {...textInputProps(props.itemData, props.onChange)(field.id)} />
                    </FormGroup>
                  );
                }

                // TODO:
                case 'standardClass': {
                  return (
                    <FormGroup label={`${field.title}:`} key={field.id}>
                      <InputGroup required value={props.itemData[field.id] as string}
                        {...textInputProps(props.itemData, props.onChange)(field.id)} />
                    </FormGroup>
                  );
                }
              }
            })
          }

        </>
      ),
    },

    validatePayload : async () => true,
    sanitizePayload : async (t) => t,
  };
  return itemClassConfiguration;
}
