import type { Context } from "../types";

import { TABLE } from "./constants";

export const upgrade = (context: Context) => {
  context.createObjectStore(TABLE, {
    autoIncrement: true,
  });
};
