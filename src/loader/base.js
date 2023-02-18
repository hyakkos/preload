import { NETCLASSIFY, RESOURCECLASSIFY } from "../common/constants";

export default class BaseLoader {
    /**
     * @property
     * @description 资源是否加载完成
     */
    loaded = false;

    /**
     * @property
     * @description 资源加载的进度
     */
    progress = 0;

    /**
     * @property
     * @description 资源是否被取消加载
     */
    canceled = false;

    /**
     * @property 
     * @description 加载的资源类型
     */
    type = RESOURCECLASSIFY.NONE;

    /**
     * @property
     * @description 是否采用标签加载
     */
    netClassify = NETCLASSIFY.NONE;

    constructor(resrouce, netClassify = NETCLASSIFY.NONE, type = RESOURCECLASSIFY.NONE) {
        this.netClassify = netClassify || false;
        this.type = type;
        this.resrouce = resrouce;
    }
}