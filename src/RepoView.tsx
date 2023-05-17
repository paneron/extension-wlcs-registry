/** @jsx jsx */

import { jsx } from '@emotion/react';

import { RegistryView } from '@riboseinc/paneron-registry-kit/views';
import { itemClassConfiguration } from '@/registryConfig';


export default function RepoView() {
  return <RegistryView itemClassConfiguration={itemClassConfiguration} />
}
