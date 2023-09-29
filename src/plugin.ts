import { makeExtension } from '@riboseinc/paneron-extension-kit';
import datasetInitializer from '@riboseinc/paneron-registry-kit/migrations/initial';
import mainView from '@/RepoView';

export default makeExtension({
  mainView,
  name                   : 'Written Language Conversion System Registry',
  requiredHostAppVersion : '^2.2.8',
  datasetMigrations      : {},
  datasetInitializer,
  exportFormats          : {
    // ['public-site']: {
    //  name: "Public website",
    //  description: "The current version of the register (excluding proposals), rendered in HTML and ready for web serving.",
    //  exporter: exportPublicSite,
    // },
  },
});
