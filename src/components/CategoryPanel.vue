<template>
    <div class="category-panel">
        <div class="categories">
            <label v-for="(category, index) in categories" :key="index" class="category-label">
                <input type="checkbox" v-model="selectedCategories" :value="category" @change="updatePosts" />
                {{ category }}
            </label>
        </div>
        <button @click="updatePosts" class="update-button">更新</button>
    </div>
</template>
 
<script>
export default {
    data() {
        return {
            categories: ['Category 1', 'Category 2', 'Category 3'], // Add your categories
            selectedCategories: [],
        };
    },
    methods: {
        // Update posts based on selected categories
        updatePosts() {
            // Add your logic to fetch posts based on selected categories
            // Update the posts in the PostGrid component
            this.$emit('update-posts', this.selectedCategories);
        },
    },
};
</script>
<style scoped>
/* Category panel styles */
.category-panel {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.categories {
    display: flex;
    flex-wrap: wrap;
}

.category-label {
    margin-right: 10px;
    margin-bottom: 10px;
    font-size: 16px;
    color: #333;
}

.update-button {
    margin-top: 10px;
    padding: 10px;
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.update-button:hover {
    background-color: #45a049;
}
</style>