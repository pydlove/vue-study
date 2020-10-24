<template>
    <div>
        <el-dialog class="aiCloud-dialog tl"
                   :close-on-click-modal="false"
                   :visible.sync="dialogVisible"
                   width="800px"
                   title="查看对话"
                   :before-close="close">

            <el-card shadow="hover">
                <div class="comment-main">
                    <div class="comment-top">
                        <div>
                            <img class="comment-avatar" :src="rcomment.avatar" alt="">
                        </div>
                        <div class="etnd">
                            <span>{{rcomment.nickname}}</span>
                            <span>{{rcomment.introduction.length > 10 ? rcomment.introduction.substring(0, 10) + "......"  : rcomment.introduction}}</span>
                        </div>
                        <div class="etd">
                            <span class="etd-span lh-50">{{rcomment.justFmt != null && rcomment.justFmt != "" ? rcomment.justFmt:rcomment.createTime}} 发布</span>
                        </div>
                    </div>

                    <div class="cc-container">
                        <div @mouseover="roverCommentId = rcomment.id" @mouseout="roverCommentId = ''">
                            <div v-if="rcomment.status == '0'" class="mt-10 mb-10 cc" v-html="rcomment.content"></div>
                            <div v-else-if="rcomment.status == '3'" class="color-999 mt-10 mb-10 cc" >该评论已删除</div>
                            <div class="comment-content">
                                <div class="like-icon-main" v-show="rcomment.status != '3'">
                                    <span v-if="rcomment.like == 1" class="linke-icon mr-5" @click="cancelLike(rcomment)"></span>
                                    <span v-else class="unlinke-icon mr-5" @click="giveLike(rcomment)"></span>
                                    {{rcomment.likeCount == null || rcomment.likeCount.toString() == '0' ? '赞':rcomment.likeCount}}
                                </div>
                                <div v-show="rcomment.status != '3' && aioctoken != rcomment.fromUid && roverCommentId == rcomment.id" class="cc-icon-main" @click="rselectCommentId = rcomment.id; overCommentId=''">
                                    <span class="reply-blue-icon mt-2"></span>回复
                                </div>
                                <div v-show="rcomment.status != '3' && aioctoken != rcomment.fromUid && roverCommentId == rcomment.id" class="cc-icon-main">
                                    <span class="dislinke-blue-icon mt-3"></span>踩
                                </div>
                                <div v-show="rcomment.status != '3' && aioctoken != rcomment.fromUid && roverCommentId == rcomment.id" class="cc-icon-main">
                                    <span class="inform-blue-icon mt-3"></span>举报
                                </div>
                                <div v-show="rcomment.status != '3' && aioctoken == rcomment.fromUid && roverCommentId == rcomment.id" class="cc-icon-main" @click="deleteComment(rcomment.id)">
                                    <span class="delete-blue-icon mt-3 mr-2" ></span>删除
                                </div>
                            </div>

                            <div v-if="rselectCommentId == rcomment.id" class="reply-main">
                                <el-input class="textarea"
                                          type="textarea"
                                          :placeholder="'回复：' + rcomment.nickname"
                                          v-model="rtoCommentContent"
                                          :autosize="{ minRows: 3, maxRows: 5}"
                                          maxlength="1000"
                                          show-word-limit
                                >
                                </el-input>
                                <div class="reply-btn">
                                    <el-button type="primary" class="mti-10 mli-10 fr" size="mini" @click="replyToComment(rcomment)">确认回复</el-button>
                                    <el-button type="info" class="mti-10 fr" size="mini" @click="rselectCommentId = ''">取消回复</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-card>

            <el-card shadow="hover" class="mt-10">
                <div slot="header" class="clearfix">
                    <span class="fl" >
                        <span class="fb">{{rtotalReplyCount}}条回复</span>
                    </span>
                </div>
                <div v-for="(replyItem, replyIndex) in rcomment.replyList" :key="replyIndex">
                    <div class="reply-top pt-5">
                        <img class="reply-avatar" :src="replyItem.fromAvatar" alt="">
                        <div class="retnd">
                            <span>{{replyItem.fromNickname}} <span class="color-7dc5eb">回复</span> {{replyItem.toNickname}}</span>
                        </div>
                        <div class="etd">
                            <span class="retd-span lh-30">{{replyItem.justFmt != null && replyItem.justFmt != "" ? replyItem.justFmt:replyItem.createTime}} 回复</span>
                        </div>
                    </div>

                    <div class="rc-container">
                        <div :class="rcomment.replyList.length == (replyIndex + 1) ? '':'rc-main'"  @mouseover="roverReplyId = replyItem.id" @mouseout="roverReplyId = ''">
                            <div class="rc" v-html="replyItem.content"></div>
                            <div class="comment-content">
                                <div class="like-icon-main">
                                    <span v-if="replyItem.like == 1" class="linke-icon mr-5" @click="cancelLike(replyItem)"></span>
                                    <span v-else class="unlinke-icon mr-5" @click="giveLike(replyItem)"></span>
                                    {{replyItem.likeCount == null || replyItem.likeCount.toString() == '0' ? '赞':replyItem.likeCount}}
                                </div>
                                <div v-show="aioctoken != replyItem.fromUid && roverReplyId == replyItem.id" class="cc-icon-main" @click="rselectReplyId = replyItem.id; overReplyId=''">
                                    <span class="reply-blue-icon mt-2"></span>回复
                                </div>
                                <div v-show="aioctoken != replyItem.fromUid && roverReplyId == replyItem.id" class="cc-icon-main">
                                    <span class="dislinke-blue-icon mt-3"></span>踩
                                </div>
                                <div v-show="aioctoken != replyItem.fromUid && roverReplyId == replyItem.id" class="cc-icon-main">
                                    <span class="inform-blue-icon mt-3"></span>举报
                                </div>
                                <div v-show="aioctoken == replyItem.fromUid && roverReplyId == replyItem.id" class="cc-icon-main" @click="deleteReply(replyItem.id)">
                                    <span class="delete-blue-icon mt-3 mr-2"></span>删除
                                </div>
                            </div>

                            <div v-if="rselectReplyId == replyItem.id" class="reply-main mb-10">
                                <el-input class="textarea"
                                          type="textarea"
                                          :placeholder="'回复：' + replyItem.fromNickname"
                                          v-model="rtoReplyContent"
                                          :autosize="{ minRows: 3, maxRows: 5}"
                                          maxlength="1000"
                                          show-word-limit
                                >
                                </el-input>
                                <div class="reply-btn">
                                    <el-button type="primary" class="mti-10 mli-10 fr" size="mini" @click="replyToReply(rcomment, replyItem)">确认回复</el-button>
                                    <el-button type="info" class="mti-10 fr" size="mini" @click="rselectReplyId = ''">取消回复</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-card>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Reply",
        mounted() {
        },
        methods: {
            close() {
                this.dialogVisible = false;
            },
            open(commentObj, aioctoken) {
                this.dialogVisible = true;
                this.rcomment = commentObj;
                this.aioctoken = aioctoken;
                this.loadReplies(commentObj.id);
            },

            /**
             * 加载所有评论
             * @param {*} commentId 评论id
             * @author panyong
             */
            async loadReplies(commentId) {
                let params = new FormData();
                params.append("commentId", commentId);
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_cm_reply_comment_all, params, "POST");
                if (data.code === 200) {
                    this.rcomment.replyList = data.data;
                    this.rtotalReplyCount = data.totalCount;
                    return true;
                }
            },

            /**
             * 点赞
             * @param {*} commentObj 评论或者回复对象
             * @author panyong
             * type 0-赞 1-踩
             */
            async giveLike(commentObj) {
                commentObj.like = 1;
                commentObj.likeCount++;
                let params = {
                    "commentId": commentObj.id,
                    "type": "0",
                };
                await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_cm_zan_add, params, "POST");
            },

            /**
             * 取消赞
             * @param {*} commentObj 评论或者回复对象
             * @author panyong
             */
            async cancelLike(commentObj) {
                commentObj.like = 0;
                commentObj.likeCount--;
                let params = new FormData();
                params.append("commentId", commentObj.id);
                await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_cm_zan_delete_cu, params, "POST");
            },

            /**
             * 方法解释
             * @param {*} id 评论id
             * @author panyong
             */
            async deleteComment(id) {
                let params = new FormData();
                params.append("id", id);
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_cm_comment_delete, params, "POST");
                if (data.code === 200) {
                    this.requestComments();
                    this.$promptMsg(data.msg, "success");
                    return true;
                }
            },

            /**
             * 回复评论
             * @param {*} comment 评论对象
             * @author panyong
             */
            async replyToComment(comment) {
                let params = {
                    "commentId": comment.id,
                    "replyType": "0",
                    "toUid": comment.fromUid,
                    "toNickname": comment.nickname,
                    "content": this.rtoCommentContent.split("\n").join("<br />"),
                };
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_cm_reply_reply, params, "POST");
                if (data.code === 200) {
                    this.$emit("addReplyToComment", data.data, comment.id)
                    this.clearReply();
                    this.$promptMsg(data.msg, "success");
                    return true;
                }
            },

            /**
             * 清除回复
             * @author panyong
             */
            clearReply() {
                this.rtoCommentContent = "";
                this.roverReplyId = "";
                this.rselectCommentId = "";
                this.roverCommentId = "";
                this.rtoReplyContent = "";
                this.rselectReplyId = "";
            },

            /**
             * 方法解释
             * @param {*} id 回复id
             * @author panyong
             */
            async deleteReply(id) {
                let params = new FormData();
                params.append("id", id);
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_cm_reply_delete, params, "POST");
                if (data.code === 200) {
                    this.loadReplies(this.rcomment.id);
                    this.$emit("requestComments");
                    this.$promptMsg(data.msg, "success");
                    return true;
                }
            },

            /**
             * 回复回复
             * @param {*} comment 评论对象
             * @param {*} reply   回复对象
             * @author panyong
             */
            async replyToReply(comment, reply) {
                console.log(comment)
                console.log(reply)
                let params = {
                    "commentId": comment.id,
                    "replyId": reply.id,
                    "replyType": "1",
                    "toUid": reply.fromUid,
                    "toNickname": reply.fromNickname,
                    "content": this.rtoReplyContent.split("\n").join("<br />"),
                };
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_cm_reply_reply, params, "POST");
                if (data.code === 200) {
                    this.addReplyToReply(data.data, reply.id,);
                    this.clearReply();
                    this.$promptMsg(data.msg, "success");
                    return true;
                }
            },
            addReplyToReply(replyData, replyId) {
                var replyTemps = [];
                for(var i in this.rcomment.replyList) {
                    var replyDataObj = this.rcomment.replyList[i];
                    replyTemps.push(replyDataObj);
                    if(replyDataObj.id == replyId) {
                        replyTemps.push(replyData);
                    }
                }
                this.rcomment.replyList = replyTemps;
            },


        },
        data() {
            return {
                dialogVisible: false,

                // 当前用户id
                aioctoken: "",
                // 评论对象
                rcomment: {
                    avatar: "",
                    createTime: "",
                    content: "",
                    dislike: "",
                    dislikeCount: "",
                    fromUid: "",
                    id: "",
                    justFmt: "",
                    like: "",
                    likeCount: "",
                    replies: "",
                    replyList: [],
                    replyCount: "",
                    status: "",
                    topicId: "",
                    topicType: "",
                    nickname: "",
                    introduction: "",
                },
                // 当前停留的评论id
                roverCommentId: "",
                // 当前点击的评论id
                rselectCommentId: "",
                // 回复评论的内容
                rtoCommentContent: "",
                // 当前停留的回复id
                roverReplyId: "",
                // 回复数量
                rtotalReplyCount: 0,
                // 回复回复的内容
                rtoReplyContent: "",
                // 当前点击的回复id
                rselectReplyId: "",
            }
        }
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
        .comment-main:after {
            left: 0;
            right: 0;
            bottom: 0;
            display: block;
            margin-right: 40px;
            content: "";
        }
        .comment-top {
            display: flex;
            position: relative;
        }
        .comment-avatar {
            width: 50px;
            border: 1px solid #f6f6f6;
            border-radius: 25px;
        }
        .etnd {
            margin-left: 20px;
            line-height: 50px;
        }
        .etnd > span:nth-of-type(1) {
            font-size: 16px;
            display: block;
            height: 30px;
            line-height: 30px;
        }
        .etnd > span:nth-of-type(2) {
            display: block;
            font-size: 14px;
            color: #999999;
            height: 20px;
            line-height: 20px;
        }
        .etd {
            margin-left: 20px;
            position: absolute;
            right: 20px;
        }
        .etd-span {
            display: inline-block;
            font-size: 14px;
            color: #999999;
            margin-right: 20px;
        }
        .cc-container {
            margin: 10px 20px 0 70px;
            line-height: 30px;
            font-size: 14px;
            color: #303133;
        }
        .cc {
            margin-right: 20px;
        }
        .cc-main:after {
            left: 0;
            right: 0;
            bottom: 0;
            display: block;
            margin-right: 20px;
            border-bottom: 1px solid #f6f6f6;
            content: "";
        }
        .comment-content {
            display: flex;
            margin-bottom: 5px;
        }
        .like-icon-main {
            display: inline-flex;
            color: #707070;
            font-size: 14px;
            line-height: 24px;
            margin-right: 20px;
            padding: 5px;
        }
        .cc-icon-main {
            display: inline-flex;
            color: #7dc5eb;
            font-size: 14px;
            line-height: 22px;
            height: 25px;
            padding: 2px 10px 2px 10px;
        }
        .cc-icon-main:hover {
            background: #DCDFE6;
        }
        .reply-main {
            margin-top: 20px;
        }
        .reply-btn {
            height: 40px;
        }
        .reply-top {
            display: flex;
            position: relative;
        }
        .reply-avatar {
            width: 30px;
            height: 30px;
            border: 1px solid #f6f6f6;
            border-radius: 15px;
        }
        .retnd {
            margin-left: 20px;
            line-height: 30px;
        }
        .retnd span:nth-of-type(1) {
            font-size: 14px;
        }
        .retd-span {
            display: inline-block;
            font-size: 14px;
            color: #999999;
        }
        .rc-container {
            margin: 10px 20px 0 50px;
            line-height: 30px;
            font-size: 14px;
            color: #303133;
        }
        .rc-main:after {
            left: 0;
            right: 0;
            bottom: 0;
            display: block;
            border-bottom: 1px solid #f6f6f6;
            content: "";
        }
        .unlinke-icon {
            width: 18px !important;
            height: 19px !important;
        }
    }

    /*媒体查询（平板）*/
    @media screen and (min-width: 769px) and (max-width: 996px) {


    }

    /*媒体查询（手机）*/
    @media screen and (max-width: 768px) {


    }
</style>

<style>
</style>