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

    // 评论
    cpcm_service_v1_cm_comment_page_list: "/cpcm-service/v1/cm_comment/page/list",
    cpcm_service_v1_cm_comment_publish: "/cpcm-service/v1/cm_comment/publish",
    cpcm_service_v1_cm_comment_delete: "/cpcm-service/v1/cm_comment/delete",

    // 回复
    cpcm_service_v1_cm_reply_reply: "/cpcm-service/v1/cm_reply/reply",
    cpcm_service_v1_cm_reply_delete: "/cpcm-service/v1/cm_reply/delete",

    // 赞或踩
    cpcm_service_v1_cm_zan_add: "/cpcm-service/v1/cm_zan/add",
    cpcm_service_v1_cm_zan_delete_cu: "/cpcm-service/v1/cm_zan/delete/cu",
}
