export type LabelId = number;

export interface Label {
  id: LabelId;
  name: string;
}

export type GroupId = number;

export interface Item {
  original: string;
  translate: string;
}

export interface Group {
  id: GroupId;
  cardId: CardId;
  title: string;

  items: Item[];
  labels: Label[];
}

export interface CardEmpty {
  title: string;
  dateCreated: Date;

  groups: Group[];
}

export type CardId = number;

export interface Card {
  id: CardId;
  dateCreated: Date;
  title: string;

  groups: Group[];
}

export interface CreateCard {
  title?: string;
  dateCreated?: Date;

  groups: Group[];
}

export interface UpdateCard {
  title?: string;

  groups: Group[];
}
