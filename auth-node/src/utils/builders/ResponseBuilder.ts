class ResponseBuilder {
  private static data: any;

  static make<T>(data: T): typeof ResponseBuilder {
    this.data = data;
    return this;
  }

  static build<T>(): { data: T } {
    return {
      data: this.data as T,
    };
  }
}
