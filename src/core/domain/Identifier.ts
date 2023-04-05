export class Identifier<T> {
  constructor(private value: T) {
    this.value = value
  }

  equals(id?: Identifier<T>): boolean {
    if (id == null || id == undefined) {
      console.log("Identifier Null or Undefined")

      return false
    }
    // if(!(id instanceof this.constructor)){
    //     console.log('FAlse');
    //     return false
    // }

    return id.toValue() == this.value
  }

  toString() {
    return String(this.value)
  }

  toValue(): T {
    return this.value
  }
}
