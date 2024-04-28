<template>
  <div class="comment-section">
    <div v-if="comments.length > 0" class="comments">
      <div v-for="(comment) in comments.slice(0,limit)" :key="comment.id" class="comment">
        <div class="comment-header">
          <img :src="comment.authorAvatar" alt="Avatar" class="avatar">
          <span class="author-name">{{ comment.authorNickname }}</span>
        </div>
        <div class="comment-content">
          {{ comment.content }}
          <div class="comment-footer">
            <span class="comment-icon" @click="togglecomment(comment,null)">💬</span>
          </div>
        </div>

        <div v-if="comment.children.length > 0" class="sub-comments">
          <div v-for="(subComment,subIndex) in comment.children.slice(0,sublimit)" :key="subComment.id" class="sub-comment" >
            <div class="sub-comment-header">
              <img :src="subComment.authorAvatar" alt="Avatar" class="avatar">
              <span class="author-name">{{ subComment.authorNickname }}</span>
            </div>
            <div class="sub-comment-content">
              <div v-if="subComment.repalyId" >
                回复
                <span style="color:#007bff;">{{ subComment.repalyName }}:</span>
              </div>
              {{ subComment.content }}
              <div class="comment-footer">
                <span class="comment-icon" @click="togglecomment(comment,subComment)">💬</span>
              </div>
            </div>
            <span class="expand-subbtn" v-if="subIndex === sublimit-1 && comment.children.length > sublimit" @click="expandSubComments">展开</span>
            <span v-if="sublimit != 2 && (subIndex ===sublimit-1||subIndex === comment.children.length-1 )" @click="colseSubComment" class="expand-subbtn">收起</span>
          </div>
        </div>
      </div>
      <button v-if="limit < comments.length" @click="expandComments" class="expand-btn">展开更多评论</button>
      <button v-if="limit != 2" @click="colseComment" class="expand-btn">收起评论</button>
    </div>
    <div v-else class="no-comments">暂时还没有评论</div>
    <button  @click="togglecomment(null,null)" class="expand-btn">评论文章</button>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      visibleComments: [],
      visibleSubComments: [],
      postComment:{
        comment:null,
        replay:null
      },
      limit:2,
      sublimit:2,
    };
  },
  methods: {
    expandComments() {
      this.limit +=5;
    },
    expandSubComments() {
      this.sublimit +=5;
    },
    colseComment(){
      this.limit =2
    },
    colseSubComment(){
      this.sublimit = 2
    },
    togglecomment(comment,replay){
      this.postComment.comment = comment
      this.postComment.replay = replay
      this.$emit('commentPosted', this.postComment);
    }
  },
  mounted() {
    // this.expandComments();
    // console.log("子组件获取");
    // console.log(this.visibleComments);
  },
  
};
</script>
<style scoped>
.comment-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
}

.comment-icon {
  cursor: pointer;
  margin-right: 10px;
}

.comment-section {
  height: 90vh;
  overflow-y: auto;
  background-color: #f9f9f9;
  padding: 20px;
}

.comments {
  margin-bottom: 20px;
}

.comment {
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #fff;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.author-name {
  font-weight: bold;
  color: black;
}

.comment-content {
  margin-bottom: 10px;
}

.sub-comments {
  margin-top: 10px;
}

.sub-comment {
  border-left: 2px solid #ccc;
  padding-left: 10px;
  margin-top: 10px;
}

.sub-comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.sub-comment-content {
  margin-bottom: 5px;
}

.expand-btn {
  background-color: #007bff;
  color: #fff;
  border: none;
  top :auto;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  bottom: 10px;
}
.expand-subbtn {
  color: #007bff;
  
}

.expand-btn:hover {
  background-color: #0056b3;
}

.no-comments {
  padding: 20px;
  text-align: center;
  color: #999;
}
/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
</style>
