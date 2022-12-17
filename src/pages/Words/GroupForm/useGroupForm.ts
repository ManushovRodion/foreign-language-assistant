import { ref, reactive } from "vue";
import type { Group, GroupItem, GroupLabel } from "../types";
import { dataBase } from "@/dataBase";
import type { WordsItem } from "@/dataBase/WordsItem";

type GroupData = Pick<Group, "id" | "cardId" | "title">;
type IndexKey = number;

interface GroupDataItem extends GroupItem {
  key: IndexKey;
}

let groupDataItemIndexKey: IndexKey = 0;

const defineItem = (key: IndexKey): GroupDataItem => {
  return {
    key,
    translate: "",
    original: "",
  };
};

export const useGroupForm = () => {
  const data = reactive<GroupData>({ id: 0, cardId: 0, title: "" });
  const dataItems = ref<GroupDataItem[]>([]);
  const dataLabels = ref<GroupLabel[]>([]);

  const loading = ref(false);
  const error = ref("");

  const { WordsGroup, WordsItem, WordsLabel } = dataBase.table;

  /**
   * Инициализация
   * @param group
   */
  const setup = (group?: Group) => {
    data.id = group?.id || 0;
    data.cardId = group?.cardId || 0;
    data.title = group?.title || "";

    dataItems.value = (group?.items || []).map((group) => {
      groupDataItemIndexKey++;
      return { ...group, key: groupDataItemIndexKey };
    });

    groupDataItemIndexKey++;
    dataItems.value.push(defineItem(groupDataItemIndexKey));

    dataLabels.value = group?.labels || [];
  };

  /**
   * Удаление данных
   */
  const remove = async () => {
    loading.value = true;
    error.value = "";

    try {
      await WordsGroup.remove(data.id);
      await WordsLabel.removeAllByGroupId(data.id);
      await WordsItem.removeAllByGroupId(data.id);

      data.id = 0;
      data.cardId = 0;
      data.title = "";

      dataItems.value = [];
      dataLabels.value = [];
    } catch (e) {
      error.value = String(e);
    }

    loading.value = false;
  };

  /**
   * Сохранение данных
   */
  const save = async () => {
    loading.value = true;
    error.value = "";

    try {
      let groupId = data.id;
      const { title, cardId, id } = data;

      if (!id) {
        groupId = await WordsGroup.createByCardId({ title }, cardId);
      } else {
        await WordsGroup.update({ title }, groupId);
        await WordsLabel.removeAllByGroupId(id);
        await WordsItem.removeAllByGroupId(id);
      }

      const promiseItems = dataItems.value.map((item) => {
        if (!item.translate && !item.original) return;

        const data = {
          translate: item.translate,
          original: item.original,
        };

        return WordsItem.createByGroupId(data, groupId);
      });

      await Promise.all(promiseItems);

      const promiseLabels = dataLabels.value.map((label) => {
        const data = {
          id: label.id,
          name: label.name,
        };

        return WordsLabel.createByGroupId(data, groupId);
      });

      await Promise.all(promiseLabels);
    } catch (e) {
      error.value = String(e);
    }

    loading.value = false;
  };

  /**
   * Удаляет элемент группы
   */
  const removeItem = (key: IndexKey) => {
    dataItems.value = dataItems.value.filter((item) => item.key !== key);

    if (!dataItems.value.length) {
      groupDataItemIndexKey++;

      dataItems.value.push(defineItem(groupDataItemIndexKey));
    }
  };

  /**
   * Обновляет элемент группы
   */
  const updateItem = (value: GroupItem, key: IndexKey) => {
    const index = dataItems.value.findIndex((item) => item.key === key);
    if (index < 0) return;

    dataItems.value[index].original = value.original;
    dataItems.value[index].translate = value.translate;

    if (value.original && value.translate) {
      const index = dataItems.value.findIndex(
        (v) => !v.original || !v.translate
      );
      if (index > -1) return;

      groupDataItemIndexKey++;
      dataItems.value.push(defineItem(groupDataItemIndexKey));
    }
  };

  return {
    data,
    dataItems,
    dataLabels,
    loading,
    error,

    setup,
    remove,
    save,
    removeItem,
    updateItem,
  };
};
