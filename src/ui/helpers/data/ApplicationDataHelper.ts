/**
 * generic class to read data which is passed from server
 * @author ssinha
 */
export class ApplicationDataHelper {

	private data: Object;

	private static instance: ApplicationDataHelper;

	/**
	 * function to get an instance of this class
	 * @return {ApplicationDataHelper}
	 */
	static getInstance(): ApplicationDataHelper {
		ApplicationDataHelper.instance = ApplicationDataHelper.instance || new ApplicationDataHelper();
		return ApplicationDataHelper.instance;
	}

	constructor() {
		this.data = this.parseData();
	}

	/**
	 * function to get data for a specific page
	 * @param page {String} id
	 * @return {Object}
	 */
	getPageData(page: String) {
		return this.data[page];
	}

	/**
	 * function to get localised string
	 * @param key {String}
	 * @return {String}
	 */
	getLabel(key: String): String {

		if (this.data.labels == null || this.data.labels[key] == null) {
			return "??" + key + "??";
		}

		return this.data.labels[key];
	}

	/**
	 * function to get global configuration
	 * @param key {String}
	 * @return {Object}
	 */
	getGlobalConfig(key: String): Object {
		if (this.data.global) {
			return this.data.global[key];
		}

		return null;
	}

	/**
	 * function to set data inside cached data object
	 * @param args {Object}
	 */
	setData(args: Object) {
		if (args.type === "global") {
			this.data.global[args.key] = args.data;
		} else if (args.type === "page") {
			this.data[args.page] = args.data;
		}
	}

	/**
	 * function to parse data from HTML
	 * @return {Object}
	 */
	private parseData() {

		let blogEl = document.getElementsByTagName("blog")[0];
		if (blogEl) {
			return JSON.parse(blogEl.getAttribute("init-data"));
		}

		return {};
	}
}