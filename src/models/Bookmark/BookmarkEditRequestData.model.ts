export interface BookmarkEditRequestData {
  title: string;
  link: string;
  userId: string;
  status: string;
  tags?: {
    connect?: TagsConnect[];
    create?: TagsCreate[];
  };
}

type TagsConnect = {
  id: string;
};

type TagsCreate = {
  title: string;
  userId: string;
  status: string;
};
