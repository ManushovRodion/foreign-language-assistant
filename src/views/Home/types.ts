export type Meta = {
  id: number;
  name: string;
};

export type Item = {
  original: string;
  translate: string;
};

export type Group = {
  id: number;
  title: string;

  items: Item[];
  meta: Meta[];
};

export type Card = {
  id: number;
  dateCreated: Date;
  dateUpdate: Date;
  title: string;

  groups: Group[];
};
