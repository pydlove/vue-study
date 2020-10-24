<template>
    <div>
        <el-card shadow="always" class="comment-card mt-20">
            <div slot="header" class="comment-title">
                <span>全部评论（{{totalCount}}条）</span>
            </div>
            <div id="publishEvaluation" class="publish">
                <el-input class="textarea"
                          type="textarea"
                          placeholder="请输入评论内容，优质的评论将帮助政策更好的宣传"
                          v-model="comment.content"
                          :autosize="{ minRows: 6, maxRows: 8}"
                          maxlength="3000"
                          show-word-limit
                >
                </el-input>
                <el-button type="primary" class="fr mti-20" size="medium" @click="publishComment">发表评论</el-button>
            </div>

            <div class="comment-main" v-for="(item, index) in comments" :key="index">
                <div class="comment-top">
                    <div>
                        <img class="comment-avatar" :src="item.avatar" alt="">
                    </div>
                    <div class="etnd">
                        <span>{{item.nickname}}</span>
                        <span>{{item.introduction.length > 10 ? item.introduction.substring(0, 10) + "......"  : item.introduction}}</span>
                    </div>
                    <div class="etd">
                        <span class="etd-span lh-50">{{item.justFmt != null && item.justFmt != "" ? item.justFmt:item.createTime}} 发布</span>
                    </div>
                </div>

                <div class="cc-container">
                    <div :class=" item.replyList == null || item.replyList.length == 0 ? '':'cc-main'" @mouseover="overCommentId = item.id" @mouseout="overCommentId = ''">
                        <div v-if="item.status == '0'" class="mt-10 mb-10 cc" v-html="item.content"></div>
                        <div v-else-if="item.status == '3'" class="color-999 mt-10 mb-10 cc" >该评论已删除</div>
                        <div class="comment-content">
                            <div class="like-icon-main" v-show="item.status != '3'">
                                <span v-if="item.like == 1" class="linke-icon mr-5" @click="cancelLike(item)"></span>
                                <span v-else class="unlinke-icon mr-5" @click="giveLike(item)"></span>
                                {{item.likeCount == null || item.likeCount.toString() == '0' ? '赞':item.likeCount}}
                            </div>
                            <div v-show="item.status != '3' && aioctoken != item.fromUid && overCommentId == item.id" class="cc-icon-main" @click="selectCommentId = item.id; overCommentId=''">
                                <span class="reply-blue-icon mt-2"></span>回复
                            </div>
                            <div v-show="item.status != '3' && aioctoken != item.fromUid && overCommentId == item.id" class="cc-icon-main">
                                <span class="dislinke-blue-icon mt-3"></span>踩
                            </div>
                            <div v-show="item.status != '3' && aioctoken != item.fromUid && overCommentId == item.id" class="cc-icon-main" @click="complain(item.id, 'comment')">
                                <span class="inform-blue-icon mt-3"></span>举报
                            </div>
                            <div v-show="item.status != '3' && aioctoken == item.fromUid && overCommentId == item.id" class="cc-icon-main" @click="deleteComment(item.id)">
                                <span class="delete-blue-icon mt-3 mr-2" ></span>删除
                            </div>
                        </div>

                        <div v-if="selectCommentId == item.id" class="reply-main">
                            <el-input class="textarea"
                                      type="textarea"
                                      :placeholder="'回复：' + item.nickname"
                                      v-model="toCommentContent"
                                      :autosize="{ minRows: 3, maxRows: 5}"
                                      maxlength="1000"
                                      show-word-limit
                            >
                            </el-input>
                            <div class="reply-btn">
                                <el-button type="primary" class="mti-10 mli-10 fr" size="mini" @click="replyToComment(item)">确认回复</el-button>
                                <el-button type="info" class="mti-10 fr" size="mini" @click="selectCommentId = ''">取消回复</el-button>
                            </div>
                        </div>
                    </div>

                    <div v-for="(replyItem, replyIndex) in item.replyList" :key="replyIndex" v-show="replyIndex < showReplyCount ? true:false">
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
                            <div :class="item.replyList.length == (replyIndex + 1) && item.replyCount <= 2 ? '':'rc-main'"  @mouseover="overReplyId = replyItem.id" @mouseout="overReplyId = ''">
                                <div class="rc" v-html="replyItem.content"></div>
                                <div class="comment-content">
                                    <div class="like-icon-main">
                                        <span v-if="replyItem.like == 1" class="linke-icon mr-5" @click="cancelLike(replyItem)"></span>
                                        <span v-else class="unlinke-icon mr-5" @click="giveLike(replyItem)"></span>
                                        {{replyItem.likeCount == null || replyItem.likeCount.toString() == '0' ? '赞':replyItem.likeCount}}
                                    </div>
                                    <div v-show="aioctoken != replyItem.fromUid && overReplyId == replyItem.id" class="cc-icon-main" @click="selectReplyId = replyItem.id; overReplyId=''">
                                        <span class="reply-blue-icon mt-2"></span>回复
                                    </div>
                                    <div v-show="aioctoken != replyItem.fromUid && overReplyId == replyItem.id" class="cc-icon-main">
                                        <span class="dislinke-blue-icon mt-3"></span>踩
                                    </div>
                                    <div v-show="aioctoken != replyItem.fromUid && overReplyId == replyItem.id" class="cc-icon-main" @click="complain(replyItem.id, 'reply')">
                                        <span class="inform-blue-icon mt-3"></span>举报
                                    </div>
                                    <div v-show="aioctoken == replyItem.fromUid && overReplyId == replyItem.id" class="cc-icon-main" @click="deleteReply(replyItem.id)">
                                        <span class="delete-blue-icon mt-3 mr-2"></span>删除
                                    </div>
                                </div>

                                <div v-if="selectReplyId == replyItem.id" class="reply-main mb-10">
                                    <el-input class="textarea"
                                              type="textarea"
                                              :placeholder="'回复：' + replyItem.fromNickname"
                                              v-model="toReplyContent"
                                              :autosize="{ minRows: 3, maxRows: 5}"
                                              maxlength="1000"
                                              show-word-limit
                                    >
                                    </el-input>
                                    <div class="reply-btn">
                                        <el-button type="primary" class="mti-10 mli-10 fr" size="mini" @click="replyToReply(item, replyItem)">确认回复</el-button>
                                        <el-button type="info" class="mti-10 fr" size="mini" @click="selectReplyId = ''">取消回复</el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ml-50 mt-5 mb-5">
                        <a class="color-F56C6C" v-if="item.replyCount > showReplyCount && item.replyCount <= 5" @click="showReplyCount = item.replyCount">展开其他 {{item.replyCount - 2}} 条回复</a>
                        <a class="color-F56C6C" v-if="item.replyCount > 5" @click="seeAllReply(item)">查看所有 {{item.replyCount}} 条回复</a>
                    </div>
                </div>
            </div> <!--循环结束-->
            <div class="block">
                <Pagination ref="pageRef" @search="search"></Pagination>
            </div>
        </el-card>

        <Reply ref="replyRef" @addReplyToComment="addReplyToComment" @requestComments="requestComments"></Reply>
        <Complain ref="complainRef" ></Complain>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination.vue"
    import Reply from "@/components/Reply.vue"
    import Complain from "@/components/Complain.vue"

    export default {
        name: "Comment",
        components: {Pagination, Reply, Complain},
        mounted() {
            this.aioctoken = this.$utils.getCookie("aioctoken");
        },
        methods: {

            /**
             * 投诉
             * @param {*} id 评论或者回复id type
             * @param {*} type 表示id是回复还是评论
             * @author panyong
             */
            complain(id, type) {
                console.log(id + type)
                // 打开弹出框 @TODO 需要设计投诉表，编写投诉逻辑
                this.$refs.complainRef.open();
            },

            /**
             * 查看所有回复
             * @param {*} commentObj 评论
             * @author panyong
             */
            seeAllReply(commentObj) {
                this.$refs.replyRef.open(commentObj, this.aioctoken);
            },

            /**
             * 点击翻页查询
             * @param {*} currentPage 页码
             * @param {*} pageSize    页长
             * @author panyong
             */
            search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                this.requestComments();
            },

            /**
             * 初始化评论
             * @author panyong
             */
            initComments(topicId) {
                this.topicId = topicId;
                this.requestComments();
            },
            async requestComments() {
                let params = new FormData();
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                params.append("topicId", this.topicId);
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_cm_comment_page_list, params, "POST");
                if (data.code === 200) {
                    this.comments = data.data;
                    this.totalCount = data.totalCount;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    if(this.$refs.pageRef.totalCount < this.pageSize) {
                        this.$refs.pageRef.pageshow = true;
                    } else {
                        this.$refs.pageRef.pageshow = false;
                    }
                    return true;
                }
            },

            /**
             * 发表评论
             * @author panyong
             *
             * topicType 0-人才政策
             */
            async publishComment() {
                let params = {
                    "topicId": this.topicId,
                    "topicType": "0",
                    "content": this.comment.content.split("\n").join("<br />"),
                };
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_cm_comment_publish, params, "POST");
                if (data.code === 200) {
                    this.$promptMsg(data.msg, "success");
                    this.addComment(data.data);
                    this.clearComment();
                    return true;
                }
            },
            addComment(comment) {
                this.comments.unshift(comment);
                this.$refs.pageRef.totalCount = this.$refs.pageRef.totalCount + 1;
                if(this.$refs.pageRef.totalCount < this.pageSize) {
                    this.$refs.pageRef.pageshow = true;
                } else {
                    this.$refs.pageRef.pageshow = false;
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
                    "content": this.toCommentContent.split("\n").join("<br />"),
                };
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_cm_reply_reply, params, "POST");
                if (data.code === 200) {
                    this.addReplyToComment(data.data, comment.id);
                    this.clearReply();
                    this.$promptMsg(data.msg, "success");
                    return true;
                }
            },
            addReplyToComment(replyData, commentId) {
                var conmmentTemps = [];
                for(var i in this.comments) {
                    var commentData = this.comments[i];
                    if(commentData.id == commentId) {
                        commentData.replyList.unshift(replyData);
                        commentData.replyCount++;
                    }
                    conmmentTemps.push(commentData);
                }
                this.comments = conmmentTemps;
            },

            /**
             * 回复回复
             * @param {*} comment 评论对象
             * @param {*} reply   回复对象
             * @author panyong
             */
            async replyToReply(comment, reply) {
                let params = {
                    "commentId": comment.id,
                    "replyId": reply.id,
                    "replyType": "1",
                    "toUid": reply.fromUid,
                    "toNickname": reply.fromNickname,
                    "content": this.toReplyContent.split("\n").join("<br />"),
                };
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_cm_reply_reply, params, "POST");
                if (data.code === 200) {
                    this.addReplyToComment(data.data, comment.id);
                    this.clearReply();
                    this.$promptMsg(data.msg, "success");
                    return true;
                }
            },

            /**
             * 清除评论
             * @author panyong
             */
            clearComment() {
                this.comment = {
                    content: "",
                };
            },

            /**
             * 清除回复
             * @author panyong
             */
            clearReply() {
                this.toCommentContent = "";
                this.toReplyContent = "";
                this.selectReplyId = "";
                this.overReplyId = "";
                this.selectCommentId = "";
                this.overCommentId = "";
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
             * 方法解释
             * @param {*} id 回复id
             * @author panyong
             */
            async deleteReply(id) {
                let params = new FormData();
                params.append("id", id);
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_cm_reply_delete, params, "POST");
                if (data.code === 200) {
                    this.requestComments();
                    this.$promptMsg(data.msg, "success");
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

        },
        data() {
            return {
                // 当前用户id
                aioctoken: "",
                // 政策id
                topicId: "",
                // 是否回复
                isReply: false,
                // 评论对象
                comment: {
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
                    replyList: "",
                    replyCount: "",
                    status: "",
                    topicId: "",
                    topicType: "",
                    nickname: "",
                    introduction: "",
                },
                // 回复对象
                reply: {
                    content: "",
                },
                // 评论数据集
                comments:[],
                // 评论总数量
                totalCount: 0,
                /* 评论分页参数 */
                currentPage: 1,
                pageSize: 10,
                //是否隐藏分页 false 显示 true 隐藏
                isHide: false,
                // 当前停留的评论id
                overCommentId: "",
                // 当前停留的回复id
                overReplyId: "",
                // 当前点击的评论id
                selectCommentId: "",
                // 当前点击的回复id
                selectReplyId: "",
                // 回复评论的内容
                toCommentContent: "",
                // 回复回复的内容
                toReplyContent: "",
                // 回复显示数量
                showReplyCount: 2,
            }
        }
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {

        .comment-title {
            text-align: left;
        }
        .publish {
            margin-bottom: 20px;
            padding-left: 20px;
            padding-right: 20px;
            height: 188px;
        }
        .comment-main {
            text-align: left;
            margin-bottom: 10px;
        }
        .comment-main:after {
            left: 0;
            right: 0;
            bottom: 0;
            display: block;
            margin-right: 40px;
            border-bottom: 1px solid #f6f6f6;
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
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
        .comment-card {
            padding: 0px;
        }
        .textarea textarea{
            font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        }
    }
</style>