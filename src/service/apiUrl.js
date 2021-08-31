/**
 * apiurl list
 */
export default {
    // rootUrl: "http://www.aiocloud.ltd:8071/",
    // baseUrl: "http://www.aiocloud.ltd",

   // rootUrl: "http://192.168.1.3:8080/",
    baseUrl: "http://localhost:8080",

    // rootUrl: "http://ahbfi.org.cn/",
    // baseUrl: "http://ahbfi.org.cn",

    // 新闻与资源
    web_service_v1_new_and_resource_searchAll: "/web-service/v1/nd_news_resource/searchAll",
    web_service_v1_new_and_resource_search: "/web-service/v1/nd_news_resource/searchList",

    // 观测设备
    web_service_v1_nd_observation_equipment_searchAll: "/web-service/v1/nd_observation_equipment/searchListByType",

    // 图片与成果
    web_service_v1_nd_gallery_video_searchList: "/web-service/v1/nd_gallery_video/searchList",
    web_service_v1_nd_gallery_achievement_searchList: "/web-service/v1/nd_gallery_achievement/searchList",

    // 快速浏览
    web_service_v1_cl_observation_log_date: "/web-service/v1/cl_observation_log/date",
    web_service_v1_cl_observation_log_detail: "/web-service/v1/cl_observation_log/detail",

    // 最新数据
    web_service_v1_cl_observation_data_searchNewData: "/web-service/v1/cl_observation_data/newData",

    // 注册
    web_service_v1_email_send: "/web-service/v1/email/send",
    web_service_v1_login_check_email: "/web-service/v1/login/check/email",
}
