export class Utils {
  public static exists(data) {
    return data !== null && data !== undefined && data !== '';
  }

  public static missing(data) {
    return !this.exists(data);
  }

  public static empty(data) {

  }

  public static pushAll(mainArray: Array<any>, subArray: Array<any>) {
    if (mainArray.length === 0) {
      return subArray;
    }
    if (subArray.length === 0) {
      return mainArray;
    }
    subArray.forEach((el) => mainArray.push(el));
    return mainArray;
  }
}
