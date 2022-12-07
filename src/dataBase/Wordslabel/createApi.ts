import type { Connect } from "../types";

import type { CreateWordsLabel, WordsLabel, WordsLabelId } from "./types";
import type { WordsGroupId } from "./types";

import { LINK_TABLE_GROUP, TABLE, TABLE_GROUP } from "./constants";
import { validRequered } from "../validations";

export const createApi = (connect: Connect) => {
  /**
   * @param value
   * @param groupId
   * @returns WordsLabelId
   */
  const createByGroupId = async (
    value: CreateWordsLabel,
    groupId: WordsGroupId
  ) => {
    const link = await connect;

    const group = await link.get(TABLE_GROUP, groupId);
    if (!group) throw new Error(`Не найдена группа с ID ${groupId}`);

    validRequered<CreateWordsLabel>(value, "name");

    const tx = link.transaction(TABLE);

    let cursor = await tx.store.openCursor();
    let labelId;
    while (cursor) {
      if (cursor.value.name === value.name) {
        labelId = cursor.key;
        break;
      }

      cursor = await cursor.continue();
    }

    await tx.done;

    if (!labelId) {
      labelId = await link.add(TABLE, value);
    }

    await link.add(LINK_TABLE_GROUP, { labelId, groupId });
    return labelId;
  };

  /**
   * @param groupId
   */
  const removeAllByGroupId = async (groupId: WordsGroupId) => {
    const link = await connect;
    const txLink = link.transaction(LINK_TABLE_GROUP, "readwrite");
    const mapObject: { [key: WordsLabelId]: WordsGroupId[] } = {};

    let cursor = await txLink.store.openCursor();
    while (cursor) {
      const { labelId, groupId: _groupId } = cursor.value;

      if (!mapObject[labelId]) mapObject[labelId] = [];
      mapObject[labelId].push(_groupId);

      if (groupId === _groupId) {
        cursor.delete();
      }

      cursor = await cursor.continue();
    }

    txLink.done;

    const promise = Object.entries(mapObject).map(([labelId, groups]) => {
      if (groups.length > 1 || groups[0] !== groupId) return;
      return link.delete(TABLE, +labelId);
    });

    await Promise.all(promise);
  };

  /**
   * @param groupId
   * @returns
   */
  const findAllByGroupId = async (groupId: WordsGroupId) => {
    const link = await connect;

    const index = await link.getAllFromIndex(
      LINK_TABLE_GROUP,
      "groupId",
      groupId
    );

    const promise = index.map(async (index) => {
      const context = await link.get(TABLE, index.labelId);
      if (!context) return;

      return {
        ...context,
        id: index.labelId,
      } as WordsLabel;
    });

    /**
     * items.filter((v) => v?.id) - ts некорректно возвращает тип
     */
    const items = await Promise.all(promise);
    const labels: WordsLabel[] = [];
    items.forEach((v) => {
      if (v) labels.push(v);
    });

    return labels;
  };

  return {
    createByGroupId,
    removeAllByGroupId,
    findAllByGroupId,
  };
};
