<template>
    <div class="category-panel">
      <div class="categories">
        <label v-for="(category, index) in categories" :key="index" class="category-label">
          <input type="checkbox" v-model="selectedCategories" :value="category" @change="updatePosts" />
          <span class="checkmark"></span>
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
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
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
    position: relative;
  }
  
  .category-label input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #eee;
    border-radius: 50%;
  }
  
  .category-label input:checked ~ .checkmark {
    background-color: #4CAF50;
  }
  
  .update-button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }
  
  .update-button:hover {
    background-color: #45a049;
  }
  </style>
  