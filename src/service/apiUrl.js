/**
 * apiurl list
 */
export default {
    rootUrl: "http://192.168.1.5:8080/",

    example: '/example', // example

    // 活动管理
    blsh_h5_service_v1_bh_activity_list : "/blsh-h5-service/v1/bh_activity/list",
    blsh_h5_service_v1_bh_activity_statistics : "/blsh-h5-service/v1/bh_activity/statistics",
    blsh_h5_service_v1_bh_activity_info : "/blsh-h5-service/v1/bh_activity/info",
    blsh_h5_service_v1_bh_activity_add : "/blsh-h5-service/v1/bh_activity/add",
    blsh_h5_service_v1_bh_activity_edit : "/blsh-h5-service/v1/bh_activity/edit",
    blsh_h5_service_v1_bh_activity_delete : "/blsh-h5-service/v1/bh_activity/delete",
    blsh_h5_service_v1_bh_activity_top_upload: "/blsh-h5-service/v1/bh_activity/top/upload",
    blsh_h5_service_v1_bh_activity_top_delete: "/blsh-h5-service/v1/bh_activity/top/delete",
    blsh_h5_service_v1_bh_sign_list: "/blsh-h5-service/v1/bh_sign/list",
    blsh_h5_service_v1_bh_vote_check: "/blsh-h5-service/v1/bh_vote/check",
    blsh_h5_service_v1_bh_vote_giveVote: "/blsh-h5-service/v1/bh_vote/giveVote",
    blsh_h5_service_v1_bh_sign_upload: "/blsh-h5-service/v1/bh_sign/upload",
    blsh_h5_service_v1_bh_sign_works_delete: "/blsh-h5-service/v1/bh_sign/works/delete",
    blsh_h5_service_v1_bh_sign_sign: "/blsh-h5-service/v1/bh_sign/sign",
    blsh_h5_service_v1_bh_sign_rank: "/blsh-h5-service/v1/bh_sign/rank",
    blsh_h5_service_v1_bh_sign_player: "/blsh-h5-service/v1/bh_sign/player",

    blsh_h5_service_v1_bh_wx_token: "/blsh-h5-service/v1/bh_wx/token",
    blsh_h5_service_v1_bh_wx_openId: "/blsh-h5-service/v1/bh_wx/openId",

    blsh_h5_service_v1_bh_vote_create: "/blsh-h5-service/v1/bh_vote/create",
    blsh_h5_service_v1_bh_activity_add_access: "/blsh-h5-service/v1/bh_activity/add/access",

    blsh_h5_service_v1_bh_wx_to: "/blsh-h5-service/v1/bh_wx/to",
    blsh_h5_service_v1_bh_vote_list: "/blsh-h5-service/v1/bh_vote/list",
    blsh_h5_service_v1_bh_gift_list: "/blsh-h5-service/v1/bh_gift_order/list",
    blsh_h5_service_v1_bh_vote_voteTicket: "/blsh-h5-service/v1/bh_vote/voteTicket",

    blsh_h5_service_v1_bh_gift_census: "/blsh-h5-service/v1/bh_gift_order/giftList",

    // 控制台
    console_service_v1_login_captcha : "/blsh-h5-service/v1/login/captcha.jpg",
    console_service_v1_login : "/blsh-h5-service/v1/login/",
    console_service_v1_login_judgeIsLogin : "/blsh-h5-service/v1/login/judgeIsLogin",
    console_service_v1_login_logout : "/blsh-h5-service/v1/login/logout",
    console_service_v1_login_user_authority: "/blsh-h5-service/v1/login/user/authority",
    console_service_v1_login_role_authority: "/blsh-h5-service/v1/login/role/authority",
    console_service_v1_login_indexData: "/blsh-h5-service/v1/login/indexData",

    //菜单
    console_service_v1_con_functions_list: "/blsh-h5-service/v1/con_functions/list",
    console_service_v1_con_functions_tree: "/blsh-h5-service/v1/con_functions/tree",
    console_service_v1_con_functions_treeTable: "/blsh-h5-service/v1/con_functions/treeTable",
    console_service_v1_con_functions_add: "/blsh-h5-service/v1/con_functions/add",
    console_service_v1_con_functions_edit: "/blsh-h5-service/v1/con_functions/edit",
    console_service_v1_con_functions_delete: "/blsh-h5-service/v1/con_functions/delete",
    console_service_v1_con_functions_logo_upload: "/blsh-h5-service/v1/con_functions/logo/upload",
    console_service_v1_con_functions_logo_delete: "/blsh-h5-service/v1/con_functions/logo/delete",

    // 用户管理
    console_service_v1_con_user_photo_upload: "/blsh-h5-service/v1/con_user/photo/upload",
    console_service_v1_con_user_photo_delete: "/blsh-h5-service/v1/con_user/photo/delete",
    console_service_v1_con_user_list: "/blsh-h5-service/v1/con_user/list",
    console_service_v1_con_user_add: "/blsh-h5-service/v1/con_user/add",
    console_service_v1_con_user_edit: "/blsh-h5-service/v1/con_user/edit",
    console_service_v1_con_user_delete: "/blsh-h5-service/v1/con_user/delete",
    console_service_v1_con_user_role_related: "/blsh-h5-service/v1/con_user/role/related",
    console_service_v1_con_user_approver: "/blsh-h5-service/v1/con_user/approver",

    // 角色管理
    console_service_v1_con_role_list: "/blsh-h5-service/v1/con_role/list",
    console_service_v1_con_role_add: "/blsh-h5-service/v1/con_role/add",
    console_service_v1_con_role_edit: "/blsh-h5-service/v1/con_role/edit",
    console_service_v1_con_role_delete: "/blsh-h5-service/v1/con_role/delete",
    console_service_v1_con_role_related_user: "/blsh-h5-service/v1/con_role/relatedUser",
    console_service_v1_con_role_authorize_fun: "/blsh-h5-service/v1/con_role/authorizeFun",
    console_service_v1_con_role_related_fun: "/blsh-h5-service/v1/con_role/relatedFun",

    // 日志
    console_service_v1_con_log_list: "/blsh-h5-service/v1/con_log/list",

    // 工作日志
    console_service_v1_bl_work_log_add: "/blsh-h5-service/v1/bl_work_log/add",
    console_service_v1_bl_work_log_edit: "/blsh-h5-service/v1/bl_work_log/edit",
    console_service_v1_bl_work_log_delete: "/blsh-h5-service/v1/bl_work_log/delete",
    console_service_v1_bl_work_log_list: "/blsh-h5-service/v1/bl_work_log/list",
    console_service_v1_bl_work_log_leader: "/blsh-h5-service/v1/bl_work_log/leader",
}
