/**
 * generic class to read/write data from local storage
 * @author ssinha
 */
export class LocalStorageHelper {

  private static instance: LocalStorageHelper;

  private static storage_key_name = 'application_data';

  private data: Object;

  /**
   * function to get an instance of this class
   * @return {LocalStorageHelper}
   */
  static getInstance(): LocalStorageHelper {
    LocalStorageHelper.instance = LocalStorageHelper.instance || new LocalStorageHelper();
    return LocalStorageHelper.instance;
  }

  constructor() {
    this.parseData();
  }

  /**
   * function to get data from local storage
   * @param key {String} id
   * @return {any}
   */
  getData(key: string): any {
    return this.data[key];
  }

  /**
   * function to set data inside local storage
   * @param args {Object}
   */
  setData(args: any) {
    this.data[args.key] = args.data;
    localStorage.setItem(LocalStorageHelper.storage_key_name, JSON.stringify(this.data));
  }

  /**
   * function to parse data from local storage
   */
  private parseData() {

    const parsedData = localStorage.getItem(LocalStorageHelper.storage_key_name);
    if (parsedData) {
      try {
        this.data = JSON.parse(parsedData);
      } catch (e) {
        this.data = {};
      }
    } else {
      this.data = {};
    }
  }
}
