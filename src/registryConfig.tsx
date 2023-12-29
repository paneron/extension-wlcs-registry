import type {
  ItemClassConfiguration,
} from '@riboseinc/paneron-registry-kit/types';

import {
  itemClasses,
} from '@/classes';

import {
  ui,
} from '@/uiGenerator';

export const itemClassConfiguration: Record<string, ItemClassConfiguration<any>> =
  itemClasses.reduce((acc, itemClass) => {
    const result = ui(itemClass);
    if (typeof result === 'undefined') {
      return acc;
    }
    acc[itemClass] = result;
    return acc;
  }, {} as Record<string, ItemClassConfiguration<any>>);
