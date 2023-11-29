/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from 'react';
import {
  css,
  jsx,
} from '@emotion/react';

import type {
  Payload,
} from '@riboseinc/paneron-registry-kit/types';

import {
  Colors,
} from '@blueprintjs/core';

import type {
  ItemClassConfiguration,
} from '@riboseinc/paneron-registry-kit/types';


export type Iso15924Code = string;
export type Iso639Code = string;
export type Iso3166Code = string;

interface TextInputProps {
  disabled: boolean;
  onChange: (evt: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

// interface TextInputPropsOnchange<
//   P extends Payload,
// > {
//     onChange?: (newData: P) => void;
//     itemData: P;
// }

export function textInputProps<
  P extends Payload,
  Field extends keyof P,
  // XXX: type erasure?!
  // Q extends TextInputPropsOnchange<P>,
// > (props: Q): (field: Field) => TextInputProps {
  // const { onChange, itemData } = props;
> (itemData: P, onChange?: (newData: P) => void): (field: Field) => TextInputProps {
  return function (fieldName) {
    return {
      disabled : !onChange,
      onChange : (evt: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!onChange) { return; }
        onChange({ ...itemData, [fieldName] : evt.currentTarget.value })
      },
    }
  }
}

export interface ListPrinter<A> {
  identifier(a: A): string;
  name(a: A): string;
}

export function ListItemViewPrinter<P extends Payload>(listPrinter: ListPrinter<P>): ItemClassConfiguration<P>['views']['listItemView'] {
  return function ListItemView(props) {
    return <span className={props.className}>
      <span css={css`color: ${Colors.GRAY4}; font-family: monospace; font-size: 90%`}>
        {listPrinter.identifier(props.itemData)}
      </span>
      &emsp;
      {listPrinter.name(props.itemData)}
    </span>
  };
}
