/**
 * apiurl list
 */
export default {
    cpcmAddress: "localhost:8080",

    example: '/example', // example

    // portal 测试请求
    portal_service_v1_test : "/portal-service/v1/test/",

    // 梧桐圈 cpcm-service 请求
    cpcm_service_v1_register_mail : "/cpcm-service/v1/register/mail",
    cpcm_service_v1_register_phone : "/cpcm-service/v1/register/phone",
    cpcm_service_v1_register_mail_sendVerificationCode : "/cpcm-service/v1/register/mail/sendVerificationCode",
    cpcm_service_v1_register_phone_sendVerificationCode : "/cpcm-service/v1/register/phone/sendVerificationCode",
    cpcm_service_v1_forget_mail : "/cpcm-service/v1/forget/mail",
    cpcm_service_v1_forget_phone : "/cpcm-service/v1/forget/phone",
    cpcm_service_v1_forget_mail_sendVerificationCode : "/cpcm-service/v1/forget/mail/sendVerificationCode",
    cpcm_service_v1_forget_phone_sendVerificationCode : "/cpcm-service/v1/forget/phone/sendVerificationCode",
    cpcm_service_v1_login : "/cpcm-service/v1/login/",
    cpcm_service_v1_login_intercept_nologin : "/cpcm-service/v1/login/intercept/nologin",
    cpcm_service_v1_login_logout : "/cpcm-service/v1/login/logout",
    cpcm_service_v1_login_captcha : "/cpcm-service/v1/login/captcha.jpg",
    cpcm_service_v1_login_currentuser : "/cpcm-service/v1/login/currentuser",

    // 个人中心
    cpcm_service_v1_sys_user_update: "/cpcm-service/v1/sys_user/update",
    cpcm_service_v1_sys_user_edu_save: "/cpcm-service/v1/sys_user/edu/save",
    cpcm_service_v1_sys_user_edu_update: "/cpcm-service/v1/sys_user/edu/update",
    cpcm_service_v1_sys_user_edu_delete: "/cpcm-service/v1/sys_user/edu/delete",
    cpcm_service_v1_sys_user_resume_save: "/cpcm-service/v1/sys_user/resume/save",
    cpcm_service_v1_sys_user_resume_update: "/cpcm-service/v1/sys_user/resume/update",
    cpcm_service_v1_sys_user_resume_delete: "/cpcm-service/v1/sys_user/resume/delete",

    // 人才政策
    cpcm_service_v1_cm_talent_policy_page_list: "/cpcm-service/v1/cm_talent_policy/page/list",
    cpcm_service_v1_cm_talent_policy_info: "/cpcm-service/v1/cm_talent_policy/info",
    cpcm_service_v1_cm_talent_policy_matchinfo: "/cpcm-service/v1/cm_talent_policy/matchinfo",
    cpcm_service_v1_cm_talent_policy_exact_match_area: "/cpcm-service/v1/cm_talent_policy/exact/match/area",
    cpcm_service_v1_cm_talent_policy_exact_match_treatment: "/cpcm-service/v1/cm_talent_policy/exact/match/treatment",
    cpcm_service_v1_cm_talent_policy_match_country_list: "/cpcm-service/v1/cm_talent_policy/match/country/list",
    cpcm_service_v1_cm_talent_policy_match_province_list: "/cpcm-service/v1/cm_talent_policy/match/province/list",
    cpcm_service_v1_cm_talent_policy_match_city_list: "/cpcm-service/v1/cm_talent_policy/match/city/list",
    cpcm_service_v1_cm_talent_policy_match_county_list: "/cpcm-service/v1/cm_talent_policy/match/county/list",
    cpcm_service_v1_cm_talent_policy_match_treatment_list: "/cpcm-service/v1/cm_talent_policy/match/treatment/list",

    // 评论
    cpcm_service_v1_cm_comment_id: "/cpcm-service/v1/cm_comment/id",
    cpcm_service_v1_cm_comment_page_list: "/cpcm-service/v1/cm_comment/page/list",
    cpcm_service_v1_cm_comment_publish: "/cpcm-service/v1/cm_comment/publish",
    cpcm_service_v1_cm_comment_delete: "/cpcm-service/v1/cm_comment/delete",

    // 回复
    cpcm_service_v1_cm_reply_unread: "/cpcm-service/v1/cm_reply/unread",
    cpcm_service_v1_cm_reply_comment_all: "/cpcm-service/v1/cm_reply/comment/all",
    cpcm_service_v1_cm_reply_reply: "/cpcm-service/v1/cm_reply/reply",
    cpcm_service_v1_cm_reply_delete: "/cpcm-service/v1/cm_reply/delete",
    cpcm_service_v1_cm_reply_readReply: "/cpcm-service/v1/cm_reply/readReply",
    cpcm_service_v1_cm_reply_readAll: "/cpcm-service/v1/cm_reply/readAll",

    // 赞或踩
    cpcm_service_v1_cm_zan_add: "/cpcm-service/v1/cm_zan/add",
    cpcm_service_v1_cm_zan_delete_cu: "/cpcm-service/v1/cm_zan/delete/cu",

    // 用户标签
    cpcm_service_v1_cm_user_tag_generate: "/cpcm-service/v1/cm_user_tag/generate",

    // 地图数据
    china : "/cpcm-service/json/china.json",
    geometryCouties : "/cpcm-service/json/geometryCouties/",
    geometryProvince : "/cpcm-service/json/geometryProvince/",
    geoinfo_all : "/cpcm-service/json/geoinfo-all.json",
    city_json : "/cpcm-service/json/city.json",
}
