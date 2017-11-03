export class BlogItem {
  constructor(public title?: string,
              public id?: string,
              public content?: string,
              public tags?: string[],
              public postedOn?: Date) {
  }
}

export class BlogItemFactory {
  public static instanceOf(): BlogItem {
    return new BlogItem('', '', '', [ ]);
  }

  public static clone(c: BlogItem): BlogItem {
    return new BlogItem(
      c.title,
      c.id,
      c.content,
      c.tags,
      c.postedOn);
  }
}
