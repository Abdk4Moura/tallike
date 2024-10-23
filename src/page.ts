import { Field, FieldProps } from './field';

export type PageProps = {
  title: string;
  fields?: FieldProps[];
};

export class Page {
  title: string;
  fields: Field[];

  constructor({ title, fields = [] }: PageProps) {
    this.title = title;
    this.fields = fields.map((field) => Field.fromProps(field));
  }

  addField(field: FieldProps): void {
    this.fields.push(Field.fromProps(field));
  }

  toJSON(): string {
    return JSON.stringify(this);
  }

  static fromJSON(json: string): Page {
    const data = JSON.parse(json);
    return new Page({
      title: data.title,
      fields: data.fields
    });
  }
}
