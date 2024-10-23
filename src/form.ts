// src/form.ts
import { Page, PageProps } from './page';

export type FormProps = {
  title: string;
  description: string;
  pages?: PageProps[];
};

export class Form {
  title: string;
  description: string;
  pages: Page[];

  constructor({ title, description, pages = [] }: FormProps) {
    this.title = title;
    this.description = description;
    this.pages = pages.map((page) => new Page(page));
  }

  addPage(page: PageProps): void {
    this.pages.push(new Page(page));
  }

  toJSON(): string {
    return JSON.stringify(this);
  }

  static fromJSON(json: string): Form {
    const data = JSON.parse(json);
    return new Form({
      title: data.title,
      description: data.description,
      pages: data.pages
    });
  }
}
