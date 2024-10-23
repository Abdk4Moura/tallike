export type FieldProps = {
    label: string;
  };
  
  export type TextFieldProps = FieldProps & {
    isLong?: boolean;
  };
  
  export type CheckboxFieldProps = FieldProps & {
    options: string[];
  };
    
  export abstract class Field {
    label: string;
  
    constructor({ label }: FieldProps) {
      this.label = label;
    }
  
    abstract toJSON(): string;
  
    static fromProps(props: FieldProps): Field {
      switch (props.constructor.name) {
        case 'TextFieldProps':
          return new TextField(props as TextFieldProps);
        case 'CheckboxFieldProps':
          return new CheckboxField(props as CheckboxFieldProps);
        // Add other field cases here...
        default:
          throw new Error(`Unknown field type: ${props.constructor.name}`);
      }
    }
  
    static fromJSON(json: string): Field {
      const data = JSON.parse(json);
      switch (data.type) {
        case 'TextField':
          return TextField.fromJSON(json);
        case 'CheckboxField':
          return CheckboxField.fromJSON(json);
        // Add other field cases here...
        default:
          throw new Error(`Unknown field type: ${data.type}`);
      }
    }
  }
  
  export class TextField extends Field {
    isLong: boolean;
  
    constructor({ label, isLong = false }: TextFieldProps) {
      super({ label });
      this.isLong = isLong;
    }
  
    toJSON(): string {
      return JSON.stringify({
        type: 'TextField',
        label: this.label,
        isLong: this.isLong
      });
    }
  
    static fromJSON(json: string): TextField {
      const data = JSON.parse(json);
      return new TextField({ label: data.label, isLong: data.isLong });
    }
  }
  
  export class CheckboxField extends Field {
    options: string[];
  
    constructor({ label, options }: CheckboxFieldProps) {
      super({ label });
      this.options = options;
    }
  
    toJSON(): string {
      return JSON.stringify({
        type: 'CheckboxField',
        label: this.label,
        options: this.options
      });
    }
  
    static fromJSON(json: string): CheckboxField {
      const data = JSON.parse(json);
      return new CheckboxField({ label: data.label, options: data.options });
    }
  }  