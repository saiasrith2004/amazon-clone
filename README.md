# Amazon Clone - MySQL Workbench Setup

## Prerequisites
- MySQL Server
- MySQL Workbench
- Node.js
- npm

## Database Setup

Open MySQL Workbench and connect to your local server.

Run:

```sql
SOURCE amazon_clone.sql;
```

Or:
1. File → Open SQL Script
2. Select amazon_clone.sql
3. Click Execute

## Database Name

```sql
amazon_clone
```

## Tables

### users
- id
- username
- email
- phone
- dob
- password
- address

### products
- id
- name
- price
- image
- stock
- description

### cart
- id
- user_id
- product_id
- quantity

### orders
- order_id
- user_id
- username
- productname
- quantity
- price
- paymentmethod
- order_date
- status

## Verify Tables

```sql
SHOW TABLES;
```

## Run Project

```bash

npm install express mysql2 cors

node server.js
```

Expected Output:

```text
MYSQL connected
server Running on http://localhost:5000
```

## Features

- User Registration
- Login
- Products
- Product Details
- Add To Cart
- Buy Now
- Checkout
- Orders
- Profile
- Admin Product Management
- Stock Management

## Common Errors

### Unknown column 'username'
Check:

```sql
DESCRIBE orders;
```

### Cart Empty

```sql
SELECT * FROM cart;
```

### Check Products

```sql
SELECT * FROM products;
```
