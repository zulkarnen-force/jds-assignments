export interface IMapperTemplate {
  [key: string]: string;
}

export class MapperBuilder<T extends Object> {
  private data: T | T[];
  private template: IMapperTemplate;
  private isReverse: boolean;
  private excludedKeys: string[];
  private selectedKeys: string[];

  constructor(data: T | T[]) {
    this.data = data;
    this.template = {};
    this.isReverse = false;
    this.excludedKeys = [];
    this.selectedKeys = [];
  }

  make(data: T): this {
    this.data = data;
    return this;
  }

  to(template: IMapperTemplate): this {
    this.template = template;
    return this;
  }

  reverse(): this {
    this.isReverse = true;
    return this;
  }

  excludes(keys: string[]): this {
    this.excludedKeys = keys;
    return this;
  }

  select(keys: string[]): this {
    this.selectedKeys = keys;
    return this;
  }

  build(): T | T[] {
    if (Array.isArray(this.data)) {
      return this.buildArray();
    } else {
      return this.buildObject();
    }
  }

  private buildArray(): T[] {
    const mappedDataArray: any[] = [];

    if (Array.isArray(this.data)) {
      this.data.forEach((item) => {
        const mappedData: any = {};

        for (const key in this.template) {
          if (
            !this.isExcluded(key) &&
            (this.isSelectedEmpty() || this.isSelected(key))
          ) {
            if (this.isReverse) {
              if (key in item) {
                //@ts-ignore
                mappedData[this.template[key]] = item[key];
              }
            } else {
              if (this.template[key] in item) {
                //@ts-ignore
                mappedData[key] = item[this.template[key]];
              }
            }
          }
        }

        mappedDataArray.push(mappedData);
      });
    }

    return mappedDataArray;
  }

  private buildObject(): T {
    const mappedData: any = {};

    for (const key in this.template) {
      if (
        !this.isExcluded(key) &&
        (this.isSelectedEmpty() || this.isSelected(key))
      ) {
        if (this.isReverse) {
          if (key in this.data) {
            //@ts-ignore
            mappedData[this.template[key]] = this.data[key];
          }
        } else {
          if (this.template[key] in this.data) {
            //@ts-ignore
            mappedData[key] = this.data[this.template[key]];
          }
        }
      }
    }

    return mappedData;
  }

  private isExcluded(key: string): boolean {
    return this.excludedKeys.includes(key);
  }

  private isSelected(key: string): boolean {
    return this.selectedKeys.includes(key);
  }

  private isSelectedEmpty(): boolean {
    return this.selectedKeys.length === 0;
  }
}
