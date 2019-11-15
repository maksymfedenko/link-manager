export interface Tag {
  id: string;
  title: string;
  tags?: Tag[];
}

export interface TagShow extends Tag {
  userId: string;
}
