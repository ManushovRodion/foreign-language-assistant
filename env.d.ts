/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_VERSION_DATE: string;
  readonly VITE_APP_VERSION_LINK: string;
  readonly VITE_APP_NAME: string;

  readonly VITE_INDEXDB_NAME: string;
  readonly VITE_INDEXDB_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
