const fs = require('fs');
const path = require('path');

// Declare the arrays to hold items and categories
let items = [];
let categories = [];

// Function to initialize the data by reading the files
const initialize = () => {
  return new Promise((resolve, reject) => {
    // Read items.json file
    fs.readFile(path.join(__dirname, 'data', 'items.json'), 'utf8', (err, data) => {
      if (err) {
        reject('Unable to read items.json file');
      } else {
        items = JSON.parse(data); // Parse JSON data and assign to items array
        // Read categories.json file after items.json is read successfully
        fs.readFile(path.join(__dirname, 'data', 'categories.json'), 'utf8', (err, data) => {
          if (err) {
            reject('Unable to read categories.json file');
          } else {
            categories = JSON.parse(data); // Parse JSON data and assign to categories array
            resolve('Data successfully loaded'); // Both files loaded, resolve the promise
          }
        });
      }
    });
  });
};

// Function to get all items
const getAllItems = () => {
  return new Promise((resolve, reject) => {
    if (items.length > 0) {
      resolve(items); // Return all items if they exist
    } else {
      reject('No items found');
    }
  });
};

// Function to get all published items
const getPublishedItems = () => {
  return new Promise((resolve, reject) => {
    const publishedItems = items.filter(item => item.published === true);
    if (publishedItems.length > 0) {
      resolve(publishedItems); // Return only published items
    } else {
      reject('No published items found');
    }
  });
};

// Function to get all categories
const getCategories = () => {
  return new Promise((resolve, reject) => {
    if (categories.length > 0) {
      resolve(categories); // Return all categories if they exist
    } else {
      reject('No categories found');
    }
  });
};

// Export functions for use in other files
module.exports = {
  initialize,
  getAllItems,
  getPublishedItems,
  getCategories
};
