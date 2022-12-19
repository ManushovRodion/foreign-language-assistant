import { createDataBase } from "./createDataBase";

export const dataBaseName = import.meta.env.VITE_INDEXDB_NAME;
export const dataBaseVersion = +import.meta.env.VITE_INDEXDB_VERSION;

export const dataBase = createDataBase(dataBaseName, dataBaseVersion);
