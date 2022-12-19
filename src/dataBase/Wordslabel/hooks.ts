import type { Context } from "../types";

import { LINK_TABLE_GROUP, TABLE } from "./constants";

export const upgrade = (context: Context) => {
  context.createObjectStore(TABLE, {
    autoIncrement: true,
  });

  const store = context.createObjectStore(LINK_TABLE_GROUP, {
    autoIncrement: true,
  });

  store.createIndex("groupId", "groupId");
  store.createIndex("name", "name", { unique: true });
};
