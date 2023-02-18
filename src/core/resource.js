import { LOADTIMEOUTDEFAULT } from "../common/constants";
import MyPath from "../utils/path";

export default class Resource {

    /**
     * @property
     * 资源的路径
     */
    src = "";

    /**
     * @property
     * 资源的唯一标识
     */
    id = "";

    /**
     * @property
     * 文件名称
     */
    fileName = "";

    /**
     * 文件后缀
     */
    extension = ""

    /**
     * 文件的绝对路径
     */
    fullPath = ""

    /**
     * 文件类型
     */
    mimeType = ''

    /**
     * @property
     * 文件加载超时时间
     */
    loadTimeout = LOADTIMEOUTDEFAULT;

    /**
     * 创建一个资源对象
     * @param {String} id
     * @param {String} src 
     */
    constructor(id, src, attr = null) {
        this.id = id;
        this.src = src;
        this.parseSrc(attr);
    }

    parseSrc() {
        const pathInfo = new MyPath(this.src);
        this.fileName = attr && attr.fileName ? attr.fileName : pathInfo.fileName;
        this.extension = attr && attr.extension ? attr.extension : pathInfo.extension;
        this.fullPath = pathInfo.fullPath;
    }
}