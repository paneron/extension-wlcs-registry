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


export interface CodeStatus {
  codeStatus: string;
  remarks: string;
}

export const DEFAULTS: CodeStatus = {
  codeStatus : '',
  remarks    : '',
};

const listPrinter: ListPrinter<CodeStatus> = {
  identifier(itemData) {
    return itemData.codeStatus;
  },
  name(itemData) {
    return '';
  },
}

export const codeStatus: ItemClassConfiguration<CodeStatus> = {
  meta : {
    title            : 'Code Status',
    description      : 'Conversion System Code Status',
    id               : 'code-status',
    alternativeNames : [],
  },
  defaults : {
    ...DEFAULTS,
  },
  views : {
    listItemView : ListItemViewPrinter<CodeStatus>(listPrinter),
    detailView   : (props) => {
      const data = props.itemData;

      return (
        <>
          {props.children}

          <PropertyDetailView inline title="Code Status">
            {data.codeStatus}
          </PropertyDetailView>

          <PropertyDetailView inline title="Remarks">
            {data.remarks}
          </PropertyDetailView>
        </>
      )
    },
    editView : (props) => (
      <>
        <FormGroup label="Code Status:">
          <TextArea fill required value={props.itemData.codeStatus}
            {...textInputProps(props.itemData, props.onChange)('codeStatus')}
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
