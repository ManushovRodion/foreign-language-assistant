export type Group = {
  id: number;
};

export type Card = {
  id: number;
  dateCreated: Date;
  dateUpdate: Date;
  title: string;

  groups: Group[];
};
