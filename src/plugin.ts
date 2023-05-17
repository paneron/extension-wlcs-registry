import { makeExtension } from '@riboseinc/paneron-extension-kit';

export default makeExtension({
  mainView               : () => import('@/RepoView'),
  name                   : 'Written Language Conversion System Registry',
  requiredHostAppVersion : '^2.0.0',
  datasetMigrations      : {},
  datasetInitializer     : () => import('@/migrations/initial'),
});
