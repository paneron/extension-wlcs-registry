import { ItemClassConfiguration } from '@riboseinc/paneron-registry-kit/types';

import { itemClasses } from '@/classes';
import { ui } from '@/uiGenerator';

export const itemClassConfiguration: Record<string, ItemClassConfiguration<any>> =
  itemClasses.reduce((acc, itemClass) => {
    acc[itemClass] = ui(itemClass);
    return acc;
  }, {} as Record<string, ItemClassConfiguration<any>>);
