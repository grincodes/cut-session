export abstract class Mapper<T> {
  // public static toDomain (raw: any): T;
  // public static toDTO (t: T): DTO;
  // public static toPersistence (t: T): any;

  public static serializeObj(obj: Record<string, any>) {
    return JSON.stringify(obj);
  }

  public static deserializeObj(data: string) {
    return JSON.parse(data);
  }
}
