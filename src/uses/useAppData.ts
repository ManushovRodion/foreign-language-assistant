export const useAppData = () => {
  return {
    name: import.meta.env.VITE_APP_NAME,
    version: import.meta.env.VITE_APP_VERSION,
    versionDate: import.meta.env.VITE_APP_VERSION_DATE,
    versionLink: import.meta.env.VITE_APP_VERSION_LINK,
  };
};
