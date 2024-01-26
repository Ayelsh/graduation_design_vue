<template>
    <div class="post-grid">
        <div class="post" v-for="(post, index) in posts" :key="index">
            <div class="post-thumbnail" :style="{ backgroundImage: 'url(' + post.image + ')' }"></div>
            <div class="post-details">
                <div class="post-title">{{ post.title }}</div>
                <div class="post-description">{{ post.description }}</div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            posts: [
                // Posts data with image and description fields
                { title: 'Post 1', image: 'src/assets/touxiang.jpg', description: 'Description for post 1' },
                { title: 'Post 2', image: 'path/to/image2.jpg', description: 'Description for post 2' },
                { title: 'Post 3', image: 'path/to/image1.jpg', description: 'Description for post 1' },
                { title: 'Post 4', image: 'path/to/image2.jpg', description: 'Description for post 2' },
                { title: 'Post 5', image: 'path/to/image1.jpg', description: 'Description for post 1' },
                { title: 'Post 6', image: 'path/to/image2.jpg', description: 'Description for post 2' },
                { title: 'Post 7', image: 'path/to/image1.jpg', description: 'Description for post 1' },
                { title: 'Post 8', image: 'path/to/image2.jpg', description: 'Description for post 2' },
                { title: 'Post 9', image: 'path/to/image1.jpg', description: 'Description for post 1' },
                { title: 'Post 10', image: 'path/to/image2.jpg', description: 'Description for post 2' },
                { title: 'Post 11', image: 'path/to/image1.jpg', description: 'Description for post 1' },
                { title: 'Post 12', image: 'path/to/image2.jpg', description: 'Description for post 2' },
                // Add more posts as needed
            ],
        };
    },
};
</script>
  
<style scoped>
/* Post grid styles */
.post-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    flex: 1;
}

.post {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.post-thumbnail {
    width: 100%;
    height: 150px;
    background-size: cover;
    background-position: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.post-details {
    padding: 15px;
}

.post-title {
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
}

.post-description {
    font-size: 14px;
    color: #666;
}
</style>
  