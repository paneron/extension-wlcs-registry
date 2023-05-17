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


export interface SystemStatus {
  systemStatus: string;
  remarks: string;
}

export const DEFAULTS: SystemStatus = {
  systemStatus : '',
  remarks      : '',
};

const listPrinter: ListPrinter<SystemStatus> = {
  identifier(itemData) {
    return itemData.systemStatus;
  },
  name(itemData) {
    return '';
  },
}

export const systemStatus: ItemClassConfiguration<SystemStatus> = {
  meta : {
    title            : 'System Status',
    description      : 'Conversion System Status',
    id               : 'system-status',
    alternativeNames : [],
  },
  defaults : {
    ...DEFAULTS,
  },
  views : {
    listItemView : ListItemViewPrinter<SystemStatus>(listPrinter),
    detailView   : (props) => {
      const data = props.itemData;

      return (
        <>
          {props.children}

          <PropertyDetailView inline title="System Status">
            {data.systemStatus}
          </PropertyDetailView>

          <PropertyDetailView inline title="Remarks">
            {data.remarks}
          </PropertyDetailView>
        </>
      )
    },
    editView : (props) => (
      <>
        <FormGroup label="System Status:">
          <TextArea fill required value={props.itemData.systemStatus}
            {...textInputProps(props.itemData, props.onChange)('systemStatus')}
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
