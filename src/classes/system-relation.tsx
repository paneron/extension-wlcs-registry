/** @jsx jsx */
/** @jsxFrag React.Fragment */

import { jsx } from '@emotion/react';
import React from 'react';
import { PropertyDetailView } from '@riboseinc/paneron-registry-kit/views/util';
import { ItemClassConfiguration } from '@riboseinc/paneron-registry-kit/types';

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


export interface Relation {
  type: string;
  targetSystem: string;
  remarks: string;
}

export const DEFAULTS: Relation = {
  type         : '',
  targetSystem : '',
  remarks      : '',
};

const listPrinter: ListPrinter<Relation> = {
  identifier(itemData) {
    return itemData.type + itemData.targetSystem;
  },
  name(itemData) {
    return '';
  },
}

export const systemRelation: ItemClassConfiguration<Relation> = {
  meta : {
    title            : 'Relation',
    description      : 'Conversion System Relation',
    id               : 'system-relation',
    alternativeNames : [],
  },
  defaults : {
    ...DEFAULTS,
  },
  views : {
    listItemView : ListItemViewPrinter<Relation>(listPrinter),
    detailView   : (props) => {
      const data = props.itemData;

      return (
        <>
          {props.children}

          <PropertyDetailView inline title="Relation Type">
            {data.type}
          </PropertyDetailView>

          <PropertyDetailView inline title="Target System">
            {data.targetSystem}
          </PropertyDetailView>

          <PropertyDetailView inline title="Remarks">
            {data.remarks}
          </PropertyDetailView>

        </>
      )
    },
    editView : (props) => (
      <>
        <FormGroup label="Relation Type:">
          <TextArea fill required value={props.itemData.type}
            {...textInputProps(props.itemData, props.onChange)('type')}
          />
        </FormGroup>

        <FormGroup label="Target System:">
          <InputGroup required value={props.itemData.targetSystem}
            {...textInputProps(props.itemData, props.onChange)('targetSystem')} />
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
