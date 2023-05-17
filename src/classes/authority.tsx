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


export interface Authority {
  authorityIdentifier: string;
  name: string;
  remarks: string;
}

export const DEFAULTS: Authority = {
  authorityIdentifier : '',
  name                : '',
  remarks             : '',
};

const listPrinter: ListPrinter<Authority> = {
  identifier(itemData) {
    return itemData.authorityIdentifier;
  },
  name(itemData) {
    return itemData.name;
  },
}

export const authority: ItemClassConfiguration<Authority> = {
  meta : {
    title            : 'Authority',
    description      : 'Conversion System Authority',
    id               : 'authority',
    alternativeNames : [],
  },
  defaults : {
    ...DEFAULTS,
  },
  views : {
    listItemView : ListItemViewPrinter<Authority>(listPrinter),
    detailView   : (props) => {
      const data = props.itemData;

      return (
        <>
          {props.children}

          <PropertyDetailView inline title="Authority Identifier">
            {data.authorityIdentifier}
          </PropertyDetailView>

          <PropertyDetailView inline title="Name">
            {data.name}
          </PropertyDetailView>

          <PropertyDetailView inline title="Remarks">
            {data.remarks}
          </PropertyDetailView>

        </>
      )
    },
    editView : (props) => (
      <>
        <FormGroup label="Authority Identifier:">
          <TextArea fill required value={props.itemData.authorityIdentifier}
            {...textInputProps(props.itemData, props.onChange)('authorityIdentifier')}
          />
        </FormGroup>

        <FormGroup label="Name:">
          <InputGroup required value={props.itemData.name}
            {...textInputProps(props.itemData, props.onChange)('name')} />
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
