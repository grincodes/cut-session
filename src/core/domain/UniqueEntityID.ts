import { v4 as uuid, validate as uuidValidate } from "uuid"
import { Identifier } from "./Identifier"

export class UniqueEntityID extends Identifier<string | number> {
  public static isValidId(id: string): boolean {
    return uuidValidate(id)
  }
  constructor(id?: string | number) {
    super(id ? id : uuid())
  }
}
