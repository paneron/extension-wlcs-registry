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
  Iso15924Code,
  Iso639Code,
  Iso3166Code,
} from '@/classes/common';


import {
  ListItemViewPrinter,
  textInputProps
} from '@/classes/common';



export interface SpellingSystem {
  languageCode?: Iso639Code;
  scriptCode: Iso15924Code;
  countryCode?: Iso3166Code;
  extension: string;
  remarks: string;
}

export const DEFAULTS: SpellingSystem = {
  languageCode : '',
  scriptCode   : '',
  countryCode  : '',
  extension    : '',
  remarks      : '',
};

const listPrinter: ListPrinter<SpellingSystem> = {
  identifier(itemData) {
    return [
      itemData.languageCode,
      itemData.scriptCode,
      itemData.countryCode,
      itemData.extension
    ].filter(Boolean).join('-');
  },
  name(itemData) {
    return '';
  },
}

export const spellingSystem: ItemClassConfiguration<SpellingSystem> = {
  meta : {
    title            : 'Spelling System',
    description      : 'Conversion Spelling System',
    id               : 'spelling-system',
    alternativeNames : [],
  },
  defaults : {
    ...DEFAULTS,
  },
  views : {
    listItemView : ListItemViewPrinter<SpellingSystem>(listPrinter),
    detailView   : (props) => {
      const data = props.itemData;

      return (
        <>
          {props.children}

          <PropertyDetailView inline title="Language Code">
            {data.languageCode}
          </PropertyDetailView>

          <PropertyDetailView inline title="Script Code">
            {data.scriptCode}
          </PropertyDetailView>

          <PropertyDetailView inline title="Country Code">
            {data.countryCode}
          </PropertyDetailView>

          <PropertyDetailView inline title="Extension">
            {data.extension}
          </PropertyDetailView>

          <PropertyDetailView inline title="Remarks">
            {data.remarks}
          </PropertyDetailView>
        </>
      )
    },
    editView : (props) => (
      <>

        <FormGroup label="Language Code:">
          <TextArea fill required value={props.itemData.languageCode}
            {...textInputProps(props.itemData, props.onChange)('languageCode')}
          />
        </FormGroup>

        <FormGroup label="Script Code:">
          <TextArea fill required value={props.itemData.scriptCode}
            {...textInputProps(props.itemData, props.onChange)('scriptCode')}
          />
        </FormGroup>

        <FormGroup label="Country Code:">
          <TextArea fill required value={props.itemData.countryCode}
            {...textInputProps(props.itemData, props.onChange)('countryCode')}
          />
        </FormGroup>

        <FormGroup label="Extension:">
          <TextArea fill required value={props.itemData.extension}
            {...textInputProps(props.itemData, props.onChange)('extension')}
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
