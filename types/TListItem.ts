interface TListItem {
  title: string,
  value: string,
  disabled?: boolean,
  id?: string
}

export interface TListItemOrdered extends TListItem {
  ordered: number,
}

export class ListItem implements TListItem {
  title: string;
  value: string;
  disabled?: boolean;
  id?: string;

  constructor(data?: TListItem | any) {
    this.id = data?.id;
    this.value = data?.value;
    this.title = data?.title;
    this.disabled = data?.disabled ?? false;
  }
} 

export class ListItemOrdered extends ListItem {
  ordered: number;

  constructor(data?: TListItemOrdered | any) {
    super(data);

    this.ordered = data?.ordered ?? 0;
  }
}

export default TListItem;
