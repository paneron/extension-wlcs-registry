/** @jsx jsx */
/** @jsxFrag React.Fragment */

import { jsx } from '@emotion/react';
import React from 'react';
import { PropertyDetailView } from '@riboseinc/paneron-registry-kit/views/util';
import { ItemClassConfiguration } from '@riboseinc/paneron-registry-kit/types';

import {
  FormGroup,
  // InputGroup,
  TextArea,
} from '@blueprintjs/core';


import type {
  ListPrinter,
} from '@/classes/common';


import {
  ListItemViewPrinter,
  textInputProps
} from '@/classes/common';


export interface SystemRelationType {
  systemRelationType: string;
  remarks: string;
}

export const DEFAULTS: SystemRelationType = {
  systemRelationType : '',
  remarks            : '',
};

const listPrinter: ListPrinter<SystemRelationType> = {
  identifier(itemData) {
    return itemData.systemRelationType;
  },
  name(itemData) {
    return '';
  },
}

export const systemRelationType: ItemClassConfiguration<SystemRelationType> = {
  meta : {
    title            : 'System Relation Type',
    description      : 'Conversion System Relation Type',
    id               : 'system-relation-type',
    alternativeNames : [],
  },
  defaults : {
    ...DEFAULTS,
  },
  views : {
    listItemView : ListItemViewPrinter<SystemRelationType>(listPrinter),
    detailView   : (props) => {
      const data = props.itemData;

      return (
        <>
          {props.children}

          <PropertyDetailView inline title="System Relation type">
            {data.systemRelationType}
          </PropertyDetailView>

          <PropertyDetailView inline title="Remarks">
            {data.remarks}
          </PropertyDetailView>
        </>
      )
    },
    editView : (props) => (
      <>
        <FormGroup label="System Relation Type:">
          <TextArea fill required value={props.itemData.systemRelationType}
            {...textInputProps(props.itemData, props.onChange)('systemRelationType')}
          />
        </FormGroup>

        <FormGroup label="Remarks:">
          <TextArea fill required value={props.itemData.remarks}
            {...textInputProps(props.itemData, props.onChange)('remarks')} />
        </FormGroup>
      </>
    ),
  },

  validatePayload : async () => true,
  sanitizePayload : async (t) => t,
};
