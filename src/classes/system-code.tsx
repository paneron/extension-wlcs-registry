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


export interface SystemCode {
  authority: string;
  code: string;
  codeStatus: string;
  identifyingSegment: string;
  name: string;
  // relations: string[];
  relations: string;
  remarks: string;
  sourceSpelling: string;
  systemStatus: string;
  systemcodeIdentifier: string;
  targetSpelling: string;
}

export const DEFAULTS: SystemCode = {
  authority            : '',
  code                 : '',
  codeStatus           : '',
  identifyingSegment   : '',
  name                 : '',
  relations            : '',
  remarks              : '',
  sourceSpelling       : '',
  systemStatus         : '',
  systemcodeIdentifier : '',
  targetSpelling       : '',
};


const listPrinter: ListPrinter<SystemCode> = {
  identifier(itemData) {
    return itemData.code;
  },
  name(itemData) {
    return itemData.name;
  },
}

export const systemCode: ItemClassConfiguration<SystemCode> = {
  meta : {
    title            : 'System Code',
    description      : 'Conversion System Code',
    id               : 'system-code',
    alternativeNames : [],
  },
  defaults : {
    ...DEFAULTS,
  },
  views : {
    listItemView : ListItemViewPrinter<SystemCode>(listPrinter),
    detailView   : (props) => {
      const data = props.itemData;

      return (
        <>
          {props.children}

          <PropertyDetailView inline title="Code">
            {data.code}
          </PropertyDetailView>

          <PropertyDetailView inline title="Name">
            {data.name}
          </PropertyDetailView>

          <PropertyDetailView inline title="Authority">
            {data.authority}
          </PropertyDetailView>

          <PropertyDetailView inline title="Source Spelling System">
            {data.sourceSpelling}
          </PropertyDetailView>

          <PropertyDetailView inline title="Target Spelling System">
            {data.targetSpelling}
          </PropertyDetailView>

          <PropertyDetailView inline title="Identifying Segment">
            {data.identifyingSegment}
          </PropertyDetailView>

          <PropertyDetailView inline title="Relations">
            {data.relations}
          </PropertyDetailView>

          <PropertyDetailView inline title="Code Status">
            {data.codeStatus}
          </PropertyDetailView>

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
        <FormGroup label="Code:">
          <TextArea fill required value={props.itemData.code}
            {...textInputProps(props.itemData, props.onChange)('code')} />
        </FormGroup>

        <FormGroup label="Name:">
          <InputGroup required value={props.itemData.name}
            {...textInputProps(props.itemData, props.onChange)('name')} />
        </FormGroup>

        <FormGroup label="Authority:">
          <InputGroup required value={props.itemData.authority}
            {...textInputProps(props.itemData, props.onChange)('authority')} />
        </FormGroup>

        <FormGroup label="Source Spelling System:">
          <InputGroup required value={props.itemData.sourceSpelling}
            {...textInputProps(props.itemData, props.onChange)('sourceSpelling')}
          />
        </FormGroup>

        <FormGroup label="Target Spelling System:">
          <InputGroup required value={props.itemData.targetSpelling}
            {...textInputProps(props.itemData, props.onChange)('targetSpelling')}
          />
        </FormGroup>

        <FormGroup label="Identifying Segment:">
          <InputGroup required value={props.itemData.identifyingSegment}
            {...textInputProps(props.itemData, props.onChange)('identifyingSegment')}
          />
        </FormGroup>

        <FormGroup label="Relations:">
          <InputGroup required value={props.itemData.relations}
            {...textInputProps(props.itemData, props.onChange)('relations')} />
        </FormGroup>

        <FormGroup label="Code Status:">
          <InputGroup required value={props.itemData.codeStatus}
            {...textInputProps(props.itemData, props.onChange)('codeStatus')} />
        </FormGroup>

        <FormGroup label="System Status:">
          <InputGroup required value={props.itemData.systemStatus}
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
