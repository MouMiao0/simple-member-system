export default interface IPage<T>{
    /**
     * 数据
     */
    record: T[]

    /**
     * 当前页序
     */
    currentPage: number

    /**
     * 每页个数
     */
    pageSize: number
    
    /**
     * 页面数量
     */
    pageCounts: number

    /**
     * 总条数
     */
    total: number
}