const storeService = require('./store-service');

/**
WEB322 - Assignment 2
I declare that this assignment is my own work in accordance with Seneca Academic Policy.
No part of this assignment has been copied manually or electronically from any other source
(including web sites, friends, GPT, or otherwise) or distributed to other students.
I understand that if caught doing so, I will receive zero on this assignment and possibly
fail the entire course.
Name: Nidhi Mistry
Student ID: 147155196
Date: Saturday 8 February 2025
Vercel Web App URL:https://web-322-assign-two.vercel.app/about
GitHub Repository URL: https://github.com/nmistry13/web322-app.git
**/

const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080; // Listen on either the environment port or 8080

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Route to redirect "/" to "/about"
app.get('/', (req, res) => {
  res.redirect('/about');
});

// Route to serve the "about.html" file from the views folder
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/about.html')); // Serving the about.html file
});

// Route to get categories
app.get('/categories', (req, res) => {
  storeService.getCategories()
    .then(categories => {
      res.json(categories);  // Send categories as JSON response
    })
    .catch(error => {
      res.status(500).json({ message: 'Error retrieving categories', error });
    });
});

// Route to get all items
app.get('/items', (req, res) => {
  storeService.getAllItems()
    .then(items => {
      res.json(items);  // Send all items as JSON response
    })
    .catch(error => {
      res.status(500).json({ message: 'Error retrieving items', error });
    });
});

// Route to get published items (filter items by published==true)
app.get('/shop', (req, res) => {
  storeService.getPublishedItems()
    .then(publishedItems => {
      res.json(publishedItems);  // Send filtered published items as JSON response
    })
    .catch(error => {
      res.status(500).json({ message: 'Error retrieving published items for shop', error });
    });
});

// Custom route for unknown paths (404 Not Found)
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// Initialize the data before starting the server
storeService.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started successfully. Listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(`Failed to initialize data: ${err}`);
  });

// Export app for Vercel
module.exports = app;
