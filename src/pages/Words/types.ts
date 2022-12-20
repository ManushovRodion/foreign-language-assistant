export type CardId = number;
export type GroupId = number;
export type LabelId = number;

export interface Card {
  id: CardId;

  title: string;

  dateCreated: Date;
  dateUpdate: Date;
}

export interface GroupItem {
  original: string;
  translate: string;
}

export interface GroupLabel {
  id: LabelId;
  name: string;
}

export interface Group {
  id: GroupId;
  cardId: CardId;
  title: string;

  items: GroupItem[];
  labels: GroupLabel[];
}

export interface DictorItem extends GroupItem {}
