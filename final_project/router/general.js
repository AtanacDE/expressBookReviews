const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if(username && password){
    if(users.some(user => user.username === username)){
        return res.status(409).json({message: "User already exists"});
    }
    else{
        users.push({"username": username, "password": password});
        return res.status(200).json({message: "User successfully registered"});
    }
  }
  else{
    return res.status(400).json({message: "Username and or password not provided"});
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(books)
    }, 3000);
  });

  myPromise.then((data) => {
    res.send(JSON.stringify(data, null, 4));
  });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(books)
    }, 3000);
  })

  myPromise.then((data) => {
    res.send(data[isbn]);
  })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;

  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(books)
    }, 3000);
  })

  myPromise.then((data) => {
    let booksByAuthor = Object.values(data).filter(book => book.author.toLowerCase() === author.toLowerCase());
    res.send(booksByAuthor);
  })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;

  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(books)
    }, 3000);
  })

  myPromise.then((data) => {
    let booksByTitle = Object.values(data).filter(book => book.title.toLowerCase() === title.toLowerCase());
    res.send(booksByTitle);
  })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

module.exports.general = public_users;
