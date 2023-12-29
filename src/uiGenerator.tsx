/** @jsx jsx */
/** @jsxFrag React.Fragment */

import {
  logger,
} from '@/logger';

const {
  log,
  error,
  debug,
  warn,
  info,
} = logger();

import {
  css,
  jsx,
} from '@emotion/react';

import React, {
  useCallback,
} from 'react';

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

// import {
//   classes,
//   classesPresentation,
// } from '@/classes';

// import type {
//   ItemClass,
//   ItemMetaClass,
//   FieldName,
//   StandardClass,
//   StandardClassType,
//   ItemClassType,
//   // SpecializedFieldType,
//   FieldType,
//   FieldTypeSpecialization,
//   FieldConfiguration,
//   ClassConfiguration,
//   ClassPresentationConfiguration,
//   ItemClassSchemaFields,
//   ItemClassFieldConfiguration,
// } from '@/classes';

import {
  itemFieldsToMappableSchemaTypes,
} from '@/classes';

import type {
  MapSchema,
  MapSchemaTypes,
} from '@/uiTypeBridge';

import type {
  GenericFieldConfiguration,
  ExternalReferenceClassFieldConfiguration,
  InternalReferenceClassFieldConfiguration,
} from '@/schemaLoader';

export const timestamp: string = new Date().toISOString();

const getClassId = (field: InternalReferenceClassFieldConfiguration | ExternalReferenceClassFieldConfiguration): string => {
  return field.typeParam;
};

import {
  classSchemaJSONDeserializer,
  // isClassSchema,
} from '@/schemaLoader';

import _classesJSON from '@/schemas/iso24229-registry-schema.json';

const classesJSONString = JSON.stringify(_classesJSON);

const serializedClasses = classSchemaJSONDeserializer(classesJSONString);

log('jsonstring', classesJSONString);
log('serializedClasses', serializedClasses);

// const classes = isClassSchema(classesJSON) ? classesJSON : new Error('classesJSON is not a class schema');

// TODO: read from schema as a string without using node JS API:

export function ui(itemClassName: string) {

  if (serializedClasses.error) {
    error(serializedClasses.error);
    return undefined;
  }
  const classes = serializedClasses.result;
  const itemClass = classes[itemClassName];
  const itemClassPresentation = itemClass.presentation;

  // const itemFields: FieldConfiguration[] = [ ...itemClass.fields ];
  const itemFields: GenericFieldConfiguration[] = [ ...itemClass.fields ];

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
  // type ItemClassSchema = ItemClassSchemaFields<ItemClass>;

  // Set empty string as default for now
  const itemDefaults = itemFields.reduce((acc, field) => {
    return {
      ...acc,
      [field.id] : '',
    };
  }, {});

  const listPrinter: ListPrinter<ItemClassSchema> = {
    identifier(itemData) {
      return typeof itemClassPresentation.list.identifier.field !== 'undefined' ?
        itemData[itemClassPresentation.list.identifier.field] as string :
        itemClassPresentation.list.identifier.value;
    },
    name(itemData) {
      return typeof itemClassPresentation.list.name.field !== 'undefined' ?
        itemData[itemClassPresentation.list.name.field] as string :
        itemClassPresentation.list.name.value;
    },
  };

  const EditView : ItemClassConfiguration<ItemClassSchema>['views']['editView'] = function(props) {

    const data = props.itemData;

    const onClearItemClass = useCallback(() => {
      log('hello from onClearItemClass', props);
      if (!props.onChange) {
        throw new Error(`Cannot clear ${props.className ?? 'field'} (read-only)`);
      }

      props.onChange({ ...props.itemData });
    }, [props]);

    const onCreateNewItemClass = useCallback(async (ic: string) => {
      log('hello from onCreateNewItemClass', props);
      if (!props.onChange) {
        throw new Error(`Cannot create ${props.className ?? 'field'} (read-only)`);
      }

      if (props.onCreateRelatedItem) {
        const itemRef = await props.onCreateRelatedItem(ic);
        props.onChange({ ...props.itemData });
        return itemRef;
      }
    }, [props]);

    const onChangeItemClass = useCallback(() => {
      log('hello from onChangeItemClass', props);
      if (!props.onChange) {
        throw new Error(`Cannot change ${props.className ?? 'field'} (read-only)`);
      }

      props.onChange({ ...props.itemData });
    }, [props]);

    return (
      <>
        {props.children}

        {
          itemFields.map(field => {
            switch (field.type) {
              case 'uuid': {
                return (
                  <PropertyDetailView css={css`display: none;`} title={field.title} key={field.id}>
                    {timestamp}
                    {data[field.id] ? data[field.id] : <em>to be generated</em>}
                  </PropertyDetailView>
                );
              }

              case 'text': {
                return (
                  <PropertyDetailView title={field.title} key={field.id}>
                    {timestamp}
                    <InputGroup
                      fill
                      readOnly={!props.onChange}
                      value={data[field.id] as string}
                      // onChange={props.onChange
                      //   ? ((evt: React.FormEvent<HTMLInputElement>) => handleIdentifierChange(evt.currentTarget.value))
                      //   : undefined}
                      {...textInputProps(props.itemData, props.onChange)(field.id)
                      }
                    />
                  </PropertyDetailView>
                );
              }

              case 'textarea': {
                return (
                  <PropertyDetailView title={field.title} key={field.id}>
                    {timestamp}
                    <TextArea
                      css={css`min-width: 80ex;`}
                      fill
                      readOnly={!props.onChange}
                      required
                      value={data[field.id] as string}
                      {...textInputProps(props.itemData, props.onChange)(field.id)} />
                  </PropertyDetailView>
                );
              }

              // TODO:
              case 'internalReferenceClass': {
                return (
                  <PropertyDetailView title={field.title} key={field.id}>
                    {timestamp}
                    <GenericRelatedItemView
                      itemRef={{ classID : getClassId(field), itemID : data[field.id as string] as string ?? '' }}
                      onClear={typeof props.onChange !== 'undefined' ? onClearItemClass : undefined}
                      onChange={typeof props.onChange !== 'undefined' ? onChangeItemClass : undefined}
                      onCreateNew={props.onCreateRelatedItem && props.onChange ? onCreateNewItemClass(getClassId(field) as string) as any : undefined}
                    />

                  </PropertyDetailView>
                );
              }

              // TODO:
              case 'externalReferenceClass': {
                return (
                  <PropertyDetailView title={field.title} key={field.id}>
                    {timestamp}
                    <InputGroup
                      fill
                      readOnly={!props.onChange}
                      value={data[field.id] as string}
                      // onChange={props.onChange
                      //   ? ((evt: React.FormEvent<HTMLInputElement>) => handleIdentifierChange(evt.currentTarget.value))
                      //   : undefined}
                      {...textInputProps(props.itemData, props.onChange)(field.id)
                      }
                    />
                  </PropertyDetailView>
                );
              }

              // TODO:
              case 'datetime': {
                return (
                  data[field.id] ?
                    <PropertyDetailView title={field.title} key={field.id}>
                      <InputGroup
                        fill
                        readOnly={!props.onChange}
                        value={data[field.id] as string}
                        // onChange={props.onChange
                        //   ? ((evt: React.FormEvent<HTMLInputElement>) => handleIdentifierChange(evt.currentTarget.value))
                        //   : undefined}
                        {...textInputProps(props.itemData, props.onChange)(field.id)
                        }
                      />
                    </PropertyDetailView> :
                    <></>
                );
              }
            }
          })
        }
      </>
    )
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
      detailView   : EditView,
      editView     : EditView,
    },

    validatePayload : async () => true,
    sanitizePayload : async (t) => t,
  };
  return itemClassConfiguration;
}
