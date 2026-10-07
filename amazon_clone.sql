--use mysql workbench


CREATE DATABASE IF NOT EXISTS amazon;
USE amazon;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(10) UNIQUE,
    dob DATE,
    password VARCHAR(255),
    address VARCHAR(255)
);

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(500),
    stock INT DEFAULT 0,
    description TEXT
);

CREATE TABLE cart (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    username VARCHAR(100) NOT NULL,
    productname VARCHAR(255) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    paymentmethod VARCHAR(50) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'Pending'
);


INSERT INTO users(
username,
email,
password
)
VALUES(
'Admin',
'admin@gmail.com',
'admin123'
); 


insert into products (name,price,image,stock,description
) values
("Hp Laptop",45000,"images/hplaptop.png",10,"Hp Laptop with 8GB RAM,512GB SSD and windows 11"),
("Dell Laptop",55000,"images/dell.png",10,"Dell laptop with intel i5 processor and 16GB RAm"),
("iphone 15",79999,"images/i.png",10,"iphone 15 with A16 Bionic chip and 128GB Storae"),
("Samsung Galaxy S24",69999,"images/s.png",10,"Samsung Galaxy S24 with AMOLED Display and Snapdragon Processor"),
("Boat Headphones",1999,"images/b.png",10,"Boat Headphones with Deep Basse and 16hours playback "),
("Sony Headphones",4999,"images/so.png",10,"Sony Headphones with Anti Noise Cancelling Bluetooth Headphones"),
("apple Smart Watch",29999,"images/a.png",10,"apple Smart Watch with Heat Rate and Fitness tracking and nfc activating and contact less payement"),
("hp Keyboard",899,"images/h.png",10,"hp Keyboard with USB Wired keyboard with Multimedia Keys"),
("dell Mouse",499,"images/d.png",10,"dell Mouse with wireless optical Mouse"),
("Asus Gaming Monitor",14999,"images/asus.png",10,"24-inch Full HD Gamming Mointer with 144Hz Refresh Rate"),
("hp Printer",7999,"images/pr.png",10,"hp Printer  with color printer and ALL-in-One ink Tank  Printer"),
("Redmi Power Bank",1599,"images/r.png",10,"Redmi Power Bank with 20000mAh fast charging power bank");

