/**
 * apiurl list
 */
export default {
    cpcmAddress: "localhost:8080",

    example: '/example', // example

    // 学生端
    blsh_service_v1_login_register: "/blsh-service/v1/login/register",
    blsh_service_v1_login_check_phone: "/blsh-service/v1/login/check/phone",
    blsh_service_v1_login_captcha : "/blsh-service/v1/login/captcha.jpg",
    blsh_service_v1_login : "/blsh-service/v1/login/",
    blsh_service_v1_login_judgeIsLogin : "/blsh-service/v1/login/judgeIsLogin",

    // 注册学科
    blsh_service_v1_bl_user_photo_upload: "/blsh-service/v1/bl_user/photo/upload",
    blsh_service_v1_bl_user_photo_delete: "/blsh-service/v1/bl_user/photo/delete",
    blsh_service_v1_bl_user_update: "/blsh-service/v1/bl_user/update",
    blsh_service_v1_bl_main_subject_sub: "/blsh-service/v1/bl_main_subject/sub",
    blsh_service_v1_bl_class_list: "/blsh-service/v1/bl_class/list",
    blsh_service_v1_bl_commodity_list: "/blsh-service/v1/bl_commodity/list",
    blsh_service_v1_bl_class_check_peopleLimit: "/blsh-service/v1/bl_class/check/peopleLimit",
    blsh_service_v1_bl_class_submitInfo: "/blsh-service/v1/bl_class/submitInfo",
    blsh_service_v1_bl_class_remove_submitInfo: "/blsh-service/v1/bl_class/remove/submitInfo",
    blsh_service_v1_bl_student_commodity_add: "/blsh-service/v1/bl_student_commodity/add",

    //首页
    blsh_service_v1_bl_activity_top: "/blsh-service/v1/bl_activity/top",
    blsh_service_v1_bl_class_active: "/blsh-service/v1/bl_class/active",
    blsh_service_v1_bl_class_end: "/blsh-service/v1/bl_class/end",
    blsh_service_v1_bl_certificate_my: "/blsh-service/v1/bl_certificate/my",
    blsh_service_v1_bl_order_my: "/blsh-service/v1/bl_order/my",

    // 活动中心
    blsh_service_v1_bl_activity_center_list: "/blsh-service/v1/bl_activity/center/list",
    blsh_service_v1_cond: "/blsh-service/v1/cond/",
    blsh_service_v1_bl_user_signup_info: "/blsh-service/v1/bl_user/signup/info",
    blsh_service_v1_bl_activity_sign: "/blsh-service/v1/bl_activity/sign",
    blsh_service_v1_bl_score_activity_set: "/blsh-service/v1/bl_score/activity/set",

    //学籍信息
    blsh_service_v1_bl_score_student_score: "/blsh-service/v1/bl_score/student/score",
    blsh_service_v1_bl_class_my_list: "/blsh-service/v1/bl_class/my/list",
    blsh_service_v1_bl_activity_my_list: "/blsh-service/v1/bl_activity/my/list",
    blsh_service_v1_bl_certificate_my_list: "/blsh-service/v1/bl_certificate/my/list",
    blsh_service_v1_bl_certificate_my_page_list: "/blsh-service/v1/bl_certificate/my/page/list",
    blsh_service_v1_bl_order_my_list: "/blsh-service/v1/bl_order/my/list",

    // 支付
    blsh_service_v1_pay_to: "/blsh-service/v1/pay/to",
    // blsh_service_v1_pay_first_return_url: "http://localhost:9092/blsh-service/v1/pay/first/return_url",
    // blsh_service_v1_pay_first_notify_url: "http://localhost:9092/blsh-service/v1/pay/first/notify_url",
    // blsh_service_v1_pay_first_wx_notify_url: "http://localhost:9092/blsh-service/v1/pay/first/wx/notify_url",
    // blsh_service_v1_pay_activity_return_url: "http://localhost:9092/blsh-service/v1/pay/activity/return_url",
    // blsh_service_v1_pay_activity_notify_url: "http://localhost:9092/blsh-service/v1/pay/activity/notify_url",
    blsh_service_v1_pay_first_return_url: "http://121.196.160.142:8083/blsh-service/v1/pay/first/return_url",
    blsh_service_v1_pay_first_notify_url: "http://121.196.160.142:8083/blsh-service/v1/pay/first/notify_url",
    blsh_service_v1_pay_first_wx_notify_url: "http://121.196.160.142:8083/blsh-service/v1/pay/first/wx/notify_url",
    blsh_service_v1_pay_activity_return_url: "http://121.196.160.142:8083/blsh-service/v1/pay/activity/return_url",
    blsh_service_v1_pay_activity_notify_url: "http://121.196.160.142:8083/blsh-service/v1/pay/activity/notify_url",
    blsh_service_v1_wx_pay_activity_notify_url: "http://121.196.160.142:8083/blsh-service/v1/wx_pay/activity/notify_url",
    blsh_service_v1_wx_pay_check: "/blsh-service/v1/wx_pay/check",
    blsh_service_v1_wx_pay_check2: "/blsh-service/v1/wx_pay/check2",

    // 订单
    blsh_service_v1_bl_order_create: "/blsh-service/v1/bl_order/create",
    blsh_service_v1_bl_order_create_activity: "/blsh-service/v1/bl_order/create/activity",
    blsh_service_v1_bl_order_check_first: "/blsh-service/v1/bl_order/check/first",
    blsh_service_v1_bl_order_check_activity: "/blsh-service/v1/bl_order/check/activity",
    blsh_service_v1_bl_order_destroy: "/blsh-service/v1/bl_order/destroy",

    //个人中心
    blsh_service_v1_bl_teacher_comment_add: "/blsh-service/v1/bl_teacher_comment/add",
    blsh_service_v1_bl_user_check_pwd: "/blsh-service/v1/bl_user/check/pwd",
    blsh_service_v1_bl_user_update_pwd: "/blsh-service/v1/bl_user/update/pwd",

    // 需注册
    blsh_service_v1_bl_semester_check_registerAgain: "/blsh-service/v1/bl_semester/check/registerAgain",


    // 控制台
    console_service_v1_login_captcha : "/console-service/v1/login/captcha.jpg",
    console_service_v1_login : "/console-service/v1/login/",
    console_service_v1_login_judgeIsLogin : "/console-service/v1/login/judgeIsLogin",
    console_service_v1_login_logout : "/console-service/v1/login/logout",
    console_service_v1_login_user_authority: "/console-service/v1/login/user/authority",
    console_service_v1_login_role_authority: "/console-service/v1/login/role/authority",
    console_service_v1_login_indexData: "/console-service/v1/login/indexData",

    // 注册学员管理
    console_service_v1_bl_user_list: "/console-service/v1/bl_user/list",
    console_service_v1_bl_user_class_list: "/console-service/v1/bl_user/class/list",
    console_service_v1_bl_user_signup_list: "/console-service/v1/bl_user/signup/list",
    console_service_v1_bl_user_signup_info: "/console-service/v1/bl_user/signup/info",
    console_service_v1_bl_user_setStatus: "/console-service/v1/bl_user/setStatus",
    console_service_v1_bl_user_export: "/console-service/v1/bl_user/export",
    console_service_v1_bl_user_score_remark_update: "/console-service/v1/bl_user/score/remark/update",

    // 学分
    console_service_v1_bl_score_teacher_set: "/console-service/v1/bl_score/teacher/set",

    // 班级管理
    console_service_v1_bl_class_list: "/console-service/v1/bl_class/list",
    console_service_v1_bl_class_student_list: "/console-service/v1/bl_class/student/list",
    console_service_v1_bl_class_teacher_list: "/console-service/v1/bl_class/teacher/list",
    console_service_v1_bl_class_add: "/console-service/v1/bl_class/add",
    console_service_v1_bl_class_edit: "/console-service/v1/bl_class/edit",
    console_service_v1_bl_class_delete: "/console-service/v1/bl_class/delete",
    console_service_v1_bl_class_end: "/console-service/v1/bl_class/end",
    console_service_v1_bl_semester_list: "/console-service/v1/bl_semester/list",
    console_service_v1_bl_semester_add: "/console-service/v1/bl_semester/add",
    console_service_v1_bl_semester_delete: "/console-service/v1/bl_semester/delete",

    // 商品
    console_service_v1_bl_commodity_list: "/console-service/v1/bl_commodity/list",

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
    console_service_v1_bl_certificate_student_bind_list: "/console-service/v1/bl_certificate/student/bind/list",
    console_service_v1_bl_certificate_notRelated_list: "/console-service/v1/bl_certificate/notRelated/list",
    console_service_v1_bl_certificate_add: "/console-service/v1/bl_certificate/add",
    console_service_v1_bl_certificate_edit: "/console-service/v1/bl_certificate/edit",
    console_service_v1_bl_certificate_delete: "/console-service/v1/bl_certificate/delete",

    // 活动
    console_service_v1_bl_activity_poster_upload: "/console-service/v1/bl_activity/poster/upload",
    console_service_v1_bl_activity_poster_delete: "/console-service/v1/bl_activity/poster/delete",
    console_service_v1_bl_activity_page_list: "/console-service/v1/bl_activity/page/list",
    console_service_v1_bl_activity_list: "/console-service/v1/bl_activity/list",
    console_service_v1_bl_activity_teacher_list: "/console-service/v1/bl_activity/teacher/list",
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
    console_service_v1_bl_teacher_comment_list: "/console-service/v1/bl_teacher_comment/list",

    // 收支明细
    console_service_v1_bl_order_flow_list: "/console-service/v1/bl_order/flow/list",

    // 账户配置
    console_service_v1_bl_pay: "/console-service/v1/bl_pay/",
    console_service_v1_bl_pay_edit: "/console-service/v1/bl_pay/edit",

    // 审批
    console_service_v1_bl_approve_list: "/console-service/v1/bl_approve/list",
    console_service_v1_bl_approve_master_list: "/console-service/v1/bl_approve/master/list",
    console_service_v1_bl_approve_add: "/console-service/v1/bl_approve/add",
    console_service_v1_bl_approve_edit: "/console-service/v1/bl_approve/edit",
    console_service_v1_bl_approve_delete: "/console-service/v1/bl_approve/delete",
    console_service_v1_bl_approve_circulation: "/console-service/v1/bl_approve/circulation",
    console_service_v1_bl_approve_review: "/console-service/v1/bl_approve/review",

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
    console_service_v1_con_user_approver: "/console-service/v1/con_user/approver",

    // 角色管理
    console_service_v1_con_role_list: "/console-service/v1/con_role/list",
    console_service_v1_con_role_add: "/console-service/v1/con_role/add",
    console_service_v1_con_role_edit: "/console-service/v1/con_role/edit",
    console_service_v1_con_role_delete: "/console-service/v1/con_role/delete",
    console_service_v1_con_role_related_user: "/console-service/v1/con_role/relatedUser",
    console_service_v1_con_role_authorize_fun: "/console-service/v1/con_role/authorizeFun",
    console_service_v1_con_role_related_fun: "/console-service/v1/con_role/relatedFun",

    // 日志
    console_service_v1_con_log_list: "/console-service/v1/con_log/list",

}
