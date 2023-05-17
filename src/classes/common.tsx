/** @jsx jsx */
/** @jsxFrag React.Fragment */

import update from 'immutability-helper';
import React,
{ ReactChildren,
  ReactNode, } from 'react';
import { jsx, css } from '@emotion/react';

import type { Payload } from '@riboseinc/paneron-registry-kit/types';

import {
  // Button,
  Classes,
  Colors,
  // ControlGroup,
  FormGroup,
  // H4,
  // H6,
  InputGroup,
  // NumericInput,
  // TextArea,
  // UL,
} from '@blueprintjs/core';


// import { DatasetContext } from '@riboseinc/paneron-extension-kit/context';
import type {
  // Citation,
  ItemClassConfiguration,
  // ItemDetailView,
  // ItemEditView,
} from '@riboseinc/paneron-registry-kit/types';
// import { incompleteItemRefToItemPathPrefix } from '@riboseinc/paneron-registry-kit/views/itemPathUtils';
// import { PropertyDetailView } from '@riboseinc/paneron-registry-kit/views/util';


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

const SimpleField: React.FC<{ val: string, label: string, onChange?: (newVal: string) => void }> =
function ({ val, label, onChange }) {
  return (
    <FormGroup label={`${label}:`}>
      <InputGroup
        readOnly={!onChange}
        value={val}
        onChange={(evt: React.FormEvent<HTMLInputElement>) => onChange!(evt.currentTarget.value)}
      />
    </FormGroup>
  );
};


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

const SplitView: React.FC<{
  aside?: ReactChildren | ReactNode
  className?: string
}> = function ({ children, aside, className }) {
  return (
    <div css={css`
        position: absolute; top: 0rem; left: 0rem; right: 0rem; bottom: 0rem;

        display: flex; flex-flow: row nowrap; overflow: hidden;

        @media (max-width: 1000px) {
          flex-flow: column nowrap;
        }

        & > * { padding: 1rem; }`} className={className}>

      <div css={css`overflow-y: auto; flex: 1;`}>
        {children}
      </div>

      <aside
        css={css`
            overflow-y: auto;
            flex-basis: 45%; background: ${Colors.LIGHT_GRAY4};
          `}
        className={Classes.ELEVATION_1}>
        {aside}
      </aside>
    </div>
  );
}
