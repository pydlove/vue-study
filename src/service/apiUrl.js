/**
 * apiurl list
 */
export default {
    cpcmAddress: "localhost:8080",

    example: '/example', // example

    // 控制台
    console_service_v1_login_captcha : "/console-service/v1/login/captcha.jpg",
    console_service_v1_login : "/console-service/v1/login/",
    console_service_v1_login_judgeIsLogin : "/console-service/v1/login/judgeIsLogin",
    console_service_v1_login_logout : "/console-service/v1/login/logout",

    console_service_v1_login_user_authority: "/console-service/v1/login/user/authority",
    console_service_v1_login_role_authority: "/console-service/v1/login/role/authority",

    // 注册学员管理
    console_service_v1_bl_user_list: "/console-service/v1/bl_user/list",
    console_service_v1_bl_user_setStatus: "/console-service/v1/bl_user/setStatus",

    // 班级管理
    console_service_v1_bl_class_list: "/console-service/v1/bl_class/list",
    console_service_v1_bl_class_add: "/console-service/v1/bl_class/add",
    console_service_v1_bl_class_edit: "/console-service/v1/bl_class/edit",
    console_service_v1_bl_class_delete: "/console-service/v1/bl_class/delete",

    // 课程大类
    console_service_v1_bl_main_subject_list: "/console-service/v1/bl_main_subject/list",
    console_service_v1_bl_main_subject_all: "/console-service/v1/bl_main_subject/all",
    console_service_v1_bl_main_subject_sub: "/console-service/v1/bl_main_subject/sub",
    console_service_v1_bl_main_subject_add: "/console-service/v1/bl_main_subject/add",
    console_service_v1_bl_main_subject_edit: "/console-service/v1/bl_main_subject/edit",
    console_service_v1_bl_main_subject_delete: "/console-service/v1/bl_main_subject/delete",

    // 课程小类
    console_service_v1_bl_sub_subject_list: "/console-service/v1/bl_sub_subject/list",
    console_service_v1_bl_sub_subject_add: "/console-service/v1/bl_sub_subject/add",
    console_service_v1_bl_sub_subject_edit: "/console-service/v1/bl_sub_subject/edit",
    console_service_v1_bl_sub_subject_delete: "/console-service/v1/bl_sub_subject/delete",

    // 证书
    console_service_v1_bl_certificate_certificate_upload: "/console-service/v1/bl_certificate/certificate/upload",
    console_service_v1_bl_certificate_certificate_delete: "/console-service/v1/bl_certificate/certificate/delete",
    console_service_v1_bl_certificate_list: "/console-service/v1/bl_certificate/list",
    console_service_v1_bl_certificate_add: "/console-service/v1/bl_certificate/add",
    console_service_v1_bl_certificate_edit: "/console-service/v1/bl_certificate/edit",
    console_service_v1_bl_certificate_delete: "/console-service/v1/bl_certificate/delete",

    // 活动
    console_service_v1_bl_activity_poster_upload: "/console-service/v1/bl_activity/poster/upload",
    console_service_v1_bl_activity_poster_delete: "/console-service/v1/bl_activity/poster/delete",
    console_service_v1_bl_activity_list: "/console-service/v1/bl_activity/list",
    console_service_v1_bl_activity_add: "/console-service/v1/bl_activity/add",
    console_service_v1_bl_activity_edit: "/console-service/v1/bl_activity/edit",
    console_service_v1_bl_activity_delete: "/console-service/v1/bl_activity/delete",

    // 注册码
    console_service_v1_bl_code_list: "/console-service/v1/bl_code/list",
    console_service_v1_bl_code_add: "/console-service/v1/bl_code/add",
    console_service_v1_bl_code_delete: "/console-service/v1/bl_code/delete",

    // 教师管理
    console_service_v1_teacher_list: "/console-service/v1/teacher/list",
    console_service_v1_teacher_active: "/console-service/v1/teacher/active",
    console_service_v1_teacher_add: "/console-service/v1/teacher/add",
    console_service_v1_teacher_delete: "/console-service/v1/teacher/delete",

    //菜单
    console_service_v1_con_functions_list: "/console-service/v1/con_functions/list",
    console_service_v1_con_functions_tree: "/console-service/v1/con_functions/tree",
    console_service_v1_con_functions_treeTable: "/console-service/v1/con_functions/treeTable",
    console_service_v1_con_functions_add: "/console-service/v1/con_functions/add",
    console_service_v1_con_functions_edit: "/console-service/v1/con_functions/edit",
    console_service_v1_con_functions_delete: "/console-service/v1/con_functions/delete",
    console_service_v1_con_functions_logo_upload: "/console-service/v1/con_functions/logo/upload",
    console_service_v1_con_functions_logo_delete: "/console-service/v1/con_functions/logo/delete",

    // 用户管理
    console_service_v1_con_user_photo_upload: "/console-service/v1/con_user/photo/upload",
    console_service_v1_con_user_photo_delete: "/console-service/v1/con_user/photo/delete",
    console_service_v1_con_user_list: "/console-service/v1/con_user/list",
    console_service_v1_con_user_add: "/console-service/v1/con_user/add",
    console_service_v1_con_user_edit: "/console-service/v1/con_user/edit",
    console_service_v1_con_user_delete: "/console-service/v1/con_user/delete",
    console_service_v1_con_user_role_related: "/console-service/v1/con_user/role/related",

    // 角色管理
    console_service_v1_con_role_list: "/console-service/v1/con_role/list",
    console_service_v1_con_role_add: "/console-service/v1/con_role/add",
    console_service_v1_con_role_edit: "/console-service/v1/con_role/edit",
    console_service_v1_con_role_delete: "/console-service/v1/con_role/delete",
    console_service_v1_con_role_related_user: "/console-service/v1/con_role/relatedUser",
    console_service_v1_con_role_authorize_fun: "/console-service/v1/con_role/authorizeFun",
    console_service_v1_con_role_related_fun: "/console-service/v1/con_role/relatedFun",

    // 地图数据
    china : "/cpcm-service/json/china.json",
    geometryCouties : "/cpcm-service/json/geometryCouties/",
    geometryProvince : "/cpcm-service/json/geometryProvince/",
    geoinfo_all : "/cpcm-service/json/geoinfo-all.json",
    city_json : "/cpcm-service/json/city.json",
}
