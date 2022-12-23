import type { Context } from "../types";

import { TABLE } from "./constants";

export const upgrade = (context: Context) => {
  const store = context.createObjectStore(TABLE, {
    autoIncrement: true,
  });

  store.createIndex("dateCreated", "dateCreated");
};
