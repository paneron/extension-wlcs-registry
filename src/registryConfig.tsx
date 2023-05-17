import { ItemClassConfiguration } from '@riboseinc/paneron-registry-kit/types';

import { authority } from '@/classes/authority';
import { codeStatus } from '@/classes/code-status';
import { spellingSystem } from '@/classes/spelling-system';
import { systemCode } from '@/classes/system-code';
import { systemRelation } from '@/classes/system-relation';
import { systemRelationType } from '@/classes/system-relation-type';
import { systemStatus } from '@/classes/system-status';

export const itemClassConfiguration: Record<string, ItemClassConfiguration<any>> = {
  'authority'            : authority,
  'code-status'          : codeStatus,
  'spelling-system'      : spellingSystem,
  'system-code'          : systemCode,
  'system-relation'      : systemRelation,
  'system-relation-type' : systemRelationType,
  'system-status'        : systemStatus,
};
