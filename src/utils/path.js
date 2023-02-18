import mimeTypes from "mime-types"
export default class MyPath {

    /**
     * @property
     * @description 请求的全路径
     */
    fullPath = "";

    /**
     * @property
     * @description 协议类型
     */
    protocol = "";

    /**
     * @property
     * @description 源
     */
    origin = "";

    /**
     * @property
     * @description 端口
     */
    port = 80;

    /**
     * @property
     * @description 请求路径
     */
    pathName = "";

    /**
     * @property
     * @description 路径中的文件名称
     */
    fileName = "";

    /**
     * @property
     * @description 请求路径中文件的类型
     */
    extension = "";

    /**
     * @property 
     * @description 请求的主机
     */
    host = '';

    /**
     * @property
     * @description 请求的参数对象
     */
    searchParams = null;

    /**
     * @property 
     * @description 请求参数字符串格式
     */
    search = '';

    /**
     * @property
     * @description 请求中的锚点信息
     */
    hash = "";

    /**
     * 判断是不是绝对路径
     * @returns {Boolean}
     */
    static isAbsolute() {
        return /^([a-z]{3,}):\/\//.test(path);
    }

    constructor(path) {
        let newPath = path;
        if (!Path.isAbsolute(path)) {
            if (path[0] !== "/") {
                newPath = location.origin + "/" + path;
            } else {
                newPath = location.origin + path;
            }
        }
        this.parse(newPath)
    }

    parse(path) {
        const reg = /^([a-z]{3,}):\/\/([^/]+)([\S]*)$/
        if (reg.test(path)) {
            this.fullPath = path;
            const res = reg.exec(path);
            this.protocol = res[1];
            if (res[2].includes(":")) {
                this.host = res[2].split(":")[0]
                this.port = +res[2].split(":")[1]
            } else {
                this.host = res[2];
                this.port = this.protocol === 'https' ? 443 : 80
            }
            if (res[3].includes("?")) {
                const temp = res[3].split("?")
                this.pathName = temp[1];
                const tempSearch = temp[2].filter((el, index) => index !== 0).join("?");
                if (tempSearch.includes("#")) {
                    const tempArr = tempSearch.split("#");
                    this.search = tempArr[0];
                    this.hash = tempArr.filter((el, index) => index !== 0).join("#")
                } else {
                    this.search = tempSearch;
                    this.hash = ""
                }
            } else if (res[3].includes("#")) {
                this.search = "";
                this.pathName = res[3].split("#")[0];
                this.hash = res[3].split("#").filter((el, index) => index !== 0).join("#")
            }
            this.parseSearch();
        } else {
            throw `[url parse error] ${path}`
        }
    }

    parseSearch() {
        this.searchParams = {};
        if (this.search) {
            this.search.split("&").forEach(el => {
                const kv = el.split("=");
                this.searchParams[kv[0]] = kv[1]
            });
        }
    }

    parsePath() {
        if (this.pathName && this.pathName !== "/") {
            const pathArr = this.pathName.split("/");
            const fileName = pathArr.slice(-1)[0]
            if (fileName.includes(".")) {
                this.fileName = fileName;
                this.extension = mimeTypes.lookup(this.fileName)
            }
        }
    }

    getFullPath() {
        return `${this.origin}/${this.pathName}`
    }
}