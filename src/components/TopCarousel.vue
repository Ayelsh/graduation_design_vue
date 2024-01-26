<template>
  <div class="top-carousel">
    <van-swipe :autoplay="3000" :loop="true">
      <van-swipe-item v-for="(post, index) in topPosts" :key="index" class="carousel-item">
        <div class="post-content">
          <div class="post-thumbnail" :style="{ backgroundImage: 'url(' + post.image + ')' }"></div>
          <div class="post-title">{{ post.title }}</div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';

export default {
  components: {
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem,
  },
  data() {
    return {
      topPosts: [
        { title: 'Post 1', image: 'path/to/image1.jpg' },
        { title: 'Post 2', image: 'path/to/image2.jpg' },
        // Add more top posts as needed
      ],
    };
  },
};
</script>

<style scoped>
/* Top carousel styles */
.top-carousel {
  max-height: 300px;
  overflow: hidden;
}

.carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.post-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.post-thumbnail {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.post-title {
  padding: 10px;
  font-size: 18px;
  color: #333;
}
</style>
