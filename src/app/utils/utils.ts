export class Utils {
  public static exists(data) {
    return data !== null && data !== undefined && data !== '';
  }

  public static missing(data) {
    return !this.exists(data);
  }

  public static empty(data) {

  }
}
