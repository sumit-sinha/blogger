/**
 * generic class to read data which is passed from server
 * @author ssinha
 */
export class ApplicationDataHelper {

  private static instance: ApplicationDataHelper;

  private data: any;

  private globalDataEvents: any;

  private pageDataEvents: any;

  /**
   * function to get an instance of this class
   * @return {ApplicationDataHelper}
   */
  static getInstance(): ApplicationDataHelper {
    ApplicationDataHelper.instance = ApplicationDataHelper.instance || new ApplicationDataHelper();
    return ApplicationDataHelper.instance;
  }

  constructor() {
    this.pageDataEvents = [];
    this.globalDataEvents = [];
    this.data = this.parseData();
  }

  /**
   * function to get data for a specific page
   * @param page {String} id
   * @return {Object}
   */
  getPageData(page: string) {
    return this.data[page];
  }

  /**
   * function to get localised string
   * @param key {String}
   * @return {String}
   */
  getLabel(key: string): string {

    if (this.data.labels == null || this.data.labels[key] == null) {
      return '??' + key + '??';
    }

    return this.data.labels[key];
  }

  /**
   * function to get global configuration
   * @param key {String}
   * @return {Object}
   */
  getGlobalConfig(key: string): any {
    if (this.data.global) {
      return this.data.global[key];
    }

    return null;
  }

  /**
   * function to set data inside cached data object
   * @param args {Object}
   */
  setData(args: any) {
    if (args.type === 'global') {
      this.data.global[args.key] = args.data;

      const length = this.globalDataEvents.length;
      for (let i = 0; i < length; i++) {
        const callback = this.globalDataEvents[i];
        if (callback && typeof callback.fn === 'function') {
          callback.fn(this.data.global, callback.args);
        }
      }
    } else if (args.type === 'page') {
      this.data[args.page] = args.data;

      const length = this.pageDataEvents.length;
      for (let i = 0; i < length; i++) {
        const callback = this.pageDataEvents[i];
        if (callback && args.page === callback.page && typeof callback.fn === 'function') {
          callback.fn(this.data[args.page], callback.args);
        }
      }
    }
  }

  /**
   * function to get an event call whenever there is change in data
   * @param args {Object}
   */
  subscribeDataChange(args: any) {
    if (args.type === 'global') {
      this.globalDataEvents.push(args.callback);
    } else if (args.type === 'page') {
      this.pageDataEvents.push(args.callback);
    }
  }

  /**
   * function to parse data from HTML
   * @return {Object}
   */
  private parseData(): any {

    const blogEl = document.getElementsByTagName('blog')[0];
    if (blogEl) {
      return JSON.parse(blogEl.getAttribute('init-data'));
    }

    return {};
  }
}
