const express= require("express");
const mysql=require("mysql2");
const cors=require("cors");
const e = require("express");
const app=express();
app.use(cors());
app.use(express.json());
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"amazon"
});


db.connect((err)=>{
    if(err){
        console.log("database Connection failed");
        console.log(err);
        
    }
    else{
        console.log("MYSQL connected");
        
    }
})

//signup 

app.post("/signup",(req,res)=>{

    const {
        username,
        email,
        phone,
        dob,
        address,
        password
    } = req.body;

    const sql = `
    INSERT INTO users
    (
        username,
        email,
        phone,
        dob,
        address,
        password
    )
    VALUES (?,?,?,?,?,?)
    `;

    db.query(
        sql,
        [
            username,
            email,
            phone,
            dob,
            address,
            password
        ],
        (err,result)=>{

            if(err){
                console.log(err);

                return res.json({
                    success:false,
                    message:"Signup Failed"
                });
            }

            res.json({
                success:true,
                message:"Account Created Successfully"
            });

        }
    );

});




//get all users

app.get("/users",(req,res)=>{
    db.query("select id,username,email,phone,dob,password from users",(err,result)=>{
        if(err){
            return res.json({
                success:false
            })
        }
        res.json(result);
    })
})

app.delete("/users/:id",(req,res)=>{
    const id=req.params.id;
    db.query("delete  from users where id=?",[id],(err,result)=>{
        if(err){
            return res.json({
                success:false,
                message:"Delete Failed"
            })
        }
        if(result.affectedRows===0){
            return res.json({
                success:false,
                exists:false
            })
        }
        res.json({
            success:true,
            message:"User Deleted"
        })
    })
})


app.put("/users/:id",(req,res)=>{
    const id=req.params.id;
    const {username,email,phone,dob,password}=req.body;
    const sql="update users set username=?,email=?,phone=?,dob=? where id=?"

    db.query(sql,[username,email,phone,dob,id],(err,result)=>{
        if(err){
            return res.json({
                success:false,
                message:"Update Failed"
            })
        }
        res.json({
            success:true,
            message:"User Update"
        })
    })
})



//single user
app.get("/users/:id",(req,res)=>{
    const id=req.params.id;
    db.query("select * from users where id=?",[id],(err,result)=>{
        if(err){
            return res.json({
                success:false,
                message:"Database Error"
            })
        }
        if(result.length===0){
            return res.json({
                success:false,
                exists:false
            })
        }
        res.json(
            {
                success:true,
                exists:true,
                user:result[0]
            }
        )
    })
})




app.get("/products",(req,res)=>{
    db.query("select * from products",(err,result)=>{
        if(err){
            return res.status(500).json(err);
        }
        res.json(result);
    })
})





//products
app.get("/product/:id",(req,res)=>{

    const id = req.params.id;

    db.query(
        "SELECT * FROM products WHERE id=?",
        [id],
        (err,result)=>{

            if(err){
                return res.status(500).json(err);
            }

            if(result.length===0){
                return res.status(404).json({
                    message:"Product Not Found"
                });
            }

            res.json(result[0]);
        }
    );

});





app.post("/cart",(req,res)=>{

    const { user_id, product_id } = req.body;

    db.query(
        "SELECT stock FROM products WHERE id=?",
        [product_id],
        (err,result)=>{

            if(err){
                return res.json({
                    success:false,
                    message:"Database Error"
                });
            }

            if(result.length === 0){
                return res.json({
                    success:false,
                    message:"Product Not Found"
                });
            }

            if(result[0].stock <= 0){
                return res.json({
                    success:false,
                    message:"Out Of Stock"
                });
            }

            db.query(
                "INSERT INTO cart(user_id,product_id,quantity) VALUES(?,?,1)",
                [user_id,product_id],
                (err)=>{

                    if(err){
                        return res.json({
                            success:false,
                            message:"Database Error"
                        });
                    }

                    res.json({
                        success:true,
                        message:"Added To Cart"
                    });

                }
            );

        }
    );

});



app.post("/checkout",(req,res)=>{

    const { userId, paymentMethod } = req.body;
     console.log("Checkout Body:", req.body);

    db.query(
        "SELECT username FROM users WHERE id=?",
        [userId],
        (err,userResult)=>{

            if(err){
                return res.status(500).json({
                    success:false,
                    message:"Database Error"
                });
            }

            if(userResult.length === 0){
                return res.json({
                    success:false,
                    message:"User Not Found"
                });
            }

            const username =
            userResult[0].username;

            const sql = `
            SELECT
                c.*,
                p.name,
                p.price,
                p.stock
            FROM cart c
            JOIN products p
            ON c.product_id = p.id
            WHERE c.user_id = ?
            `;

            db.query(sql,[userId],(err,cartItems)=>{

                if(err){
                    return res.status(500).json({
                        success:false,
                        message:"Database Error"
                    });
                }

                if(cartItems.length === 0){

                    return res.json({
                        success:false,
                        message:"Cart is Empty"
                    });

                }

                for(let item of cartItems){

                    if(item.stock <= 0){

                        return res.json({
                            success:false,
                            message:`${item.name} is Out Of Stock`
                        });

                    }

                    if(item.quantity > item.stock){

                        return res.json({
                            success:false,
                            message:`Only ${item.stock} items available for ${item.name}`
                        });

                    }

                }

                let completed = 0;

                cartItems.forEach(item=>{

                    db.query(
                        `INSERT INTO orders
                        (
                            user_id,
                            username,
                            productname,
                            quantity,
                            price,
                            paymentmethod,
                            order_date,
                            status
                        )
                        VALUES(?,?,?,?,?,?,NOW(),?)`,
                        [
                            userId,
                            username,
                            item.name,
                            item.quantity,
                            item.price * item.quantity,
                            paymentMethod,
                            "Pending"
                        ],
                        (err)=>{

                            if(err){
                                console.log(err);
                                return res.status(500).json({
                                    success:false,
                                    message:"Order Insert Failed"
                                });
                            }

                            db.query(
                                `UPDATE products
                                 SET stock = stock - ?
                                 WHERE id = ?`,
                                [
                                    item.quantity,
                                    item.product_id
                                ],
                                (err)=>{

                                    if(err){
                                        console.log(err);
                                        return;
                                    }

                                    completed++;

                                    if(completed === cartItems.length){

                                        db.query(
                                            "DELETE FROM cart WHERE user_id=?",
                                            [userId],
                                            (err)=>{

                                                if(err){
                                                    console.log(err);
                                                }

                                                res.json({
                                                    success:true,
                                                    message:"Order Placed Successfully"
                                                });

                                            }
                                        );

                                    }

                                }
                            );

                        }
                    );

                });

            });

        }
    );

});

app.get("/cart/:userId",(req,res)=>{

    const userId =
    req.params.userId;

    const sql = `
    SELECT
        c.*,
        p.name,
        p.price
        
    FROM cart c
    JOIN products p
    ON c.product_id = p.id
    WHERE c.user_id = ?
    `;

    db.query(sql,[userId],
    (err,result)=>{

        if(err) {
            console.log(err);
            
            return res.json({
                success:false,
                error:err.message
            });
        }
        res.json(result);
    });
});
//put cart


app.put("/cart/update/:id",(req,res)=>{

    const cartId = req.params.id;
    const change = req.body.change;

    const sql = `
    SELECT cart.quantity,
           products.stock
    FROM cart
    JOIN products
    ON cart.product_id = products.id
    WHERE cart.id = ?
    `;

    db.query(sql,[cartId],(err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        const currentQty = result[0].quantity;
        const stock = result[0].stock;

        const newQty = currentQty + change;

        if(newQty > stock){

            return res.json({
                success:false,
                message:"Out Of Stock"
            });

        }

        if(newQty < 1){

            return res.json({
                success:false,
                message:"Minimum quantity is 1"
            });

        }

        db.query(
            "UPDATE cart SET quantity=? WHERE id=?",
            [newQty,cartId],
            (err2)=>{

                if(err2){
                    return res.status(500).json(err2);
                }

                res.json({
                    success:true,
                    message:"Quantity Updated"
                });

            }
        );

    });

});


//delete cart

app.delete("/cart/:id",(req,res)=>{

    db.query(
    "DELETE FROM cart WHERE id=?",
    [req.params.id],
    (err,result)=>{

        if(err) return res.json(err);

        res.json({
            success:true
        });
    });
});



//increase
app.put("/cart/increase/:id",(req,res)=>{

    db.query(
    `UPDATE cart
     SET quantity = quantity + 1
     WHERE id=?`,
    [req.params.id],
    (err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.json({
            success:true
        });
    });
});



app.put("/cart/decrease/:id",(req,res)=>{

    db.query(
    `UPDATE cart
     SET quantity =
     CASE
        WHEN quantity > 1
        THEN quantity - 1
        ELSE 1
     END
     WHERE id=?`,
    [req.params.id],
    (err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.json({
            success:true
        });
    });
});

//post checkout








app.get("/checkout/:userId",(req,res)=>{

    const userId = req.params.userId;

    const sql = `
    SELECT
        c.quantity,
        p.id,
        p.name,
        p.price,
        p.image
    FROM cart c
    JOIN products p
    ON c.product_id = p.id
    WHERE c.user_id = ?
    `;

    db.query(sql,[userId],(err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.json(result);
    });

});




app.post("/place-order",(req,res)=>{

    const { user_id, product_id, quantity } =
    req.body;

    db.query(
        "SELECT stock,name,price FROM products WHERE id=?",
        [product_id],
        (err,result)=>{

            if(err){
                return res.json({
                    success:false,
                    message:"Database Error"
                });
            }

            if(result.length === 0){
                return res.json({
                    success:false,
                    message:"Product Not Found"
                });
            }

            if(result[0].stock < quantity){

                return res.json({
                    success:false,
                    message:"Out Of Stock"
                });
            }


        }
    );

});
//orders

// app.get("/orders/:userId",(req,res)=>{

//     const userId = req.params.userId;

//     const sql = `
//     SELECT
//         o.id,
//         p.name AS product_name,
//         o.quantity,
//         o.order_date,
//         o.status
//     FROM orders o
//     JOIN products p
//     ON o.product_id = p.id
//     WHERE o.user_id = ?
//     ORDER BY o.order_date DESC
//     `;

//     db.query(sql,[userId],(err,result)=>{

//         if(err){
//             console.log(err);
//             return res.status(500).json({
//                 message:"Server Error"
//             });
//         }

//         res.json(result);
//     });
// });

// app.get("/orders/:userId", (req, res) => {

//     const userId = req.params.userId;

//     const sql = `
//         SELECT *
//         FROM orders
//         WHERE user_id = ?
//         ORDER BY order_date DESC
//     `;

//     db.query(sql, [userId], (err, result) => {

//         if (err) {
//             console.log("MYSQL ERROR:", err);
//             return res.status(500).json({
//                 success: false,
//                 message: err.message
//             });
//         }

//         res.json(result);
//     });

// });


// app.get("/orders/:userId",(req,res)=>{

//     const userId = req.params.userId;

//     const sql = `
//     SELECT
//         order_id,
//         productname,
//         quantity,
//         price,
//         paymentmethod,
//         order_date,
//         status
//     FROM orders
//     WHERE user_id = ?
//     ORDER BY order_id DESC
//     `;

//     db.query(sql,[userId],(err,result)=>{

//         if(err){
//             console.log(err);
//             return res.status(500).json(err);
//         }

//         res.json(result);

//     });

// });


app.get("/orders/:userId",(req,res)=>{

    const userId = req.params.userId;

    const sql = `
    SELECT
        o.*,
        u.username
    FROM orders o
    JOIN users u
    ON o.user_id = u.id
    WHERE o.user_id = ?
    `;

    db.query(sql,[userId],(err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.json(result);

    });

});


app.get("/profile/:id",(req,res)=>{

    const id = req.params.id;

    const sql =
    "SELECT username,email,phone,address FROM users WHERE id=?";

    db.query(sql,[id],(err,result)=>{

        if(err){
            console.log(err);
            return res.status(500).json({
                message:"Server Error"
            });
        }

        if(result.length === 0){
            return res.status(404).json({
                message:"User Not Found"
            });
        }

        res.json(result[0]);
    });

});


app.get("/featured-products",(req,res)=>{

    const sql =
    "SELECT * FROM products LIMIT 4";

    db.query(sql,(err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

app.get("/best-sellers",(req,res)=>{

    const sql =
    "SELECT * FROM products ORDER BY id DESC LIMIT 4";

    db.query(sql,(err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.json(result);
    });
});


app.get("/admin/orders", (req, res) => {

    const sql = "SELECT * FROM orders";

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);

    });

});



app.get("/search-products",(req,res)=>{

    const keyword =
    req.query.keyword;

    const sql =
    "SELECT * FROM products WHERE name LIKE ?";

    db.query(
        sql,
        [`%${keyword}%`],
        (err,result)=>{

            if(err){

                return res.status(500)
                .json(err);

            }

            res.json(result);

        }
    );

});
// app.get("/search-products",(req,res)=>{

//     const keyword = req.query.keyword;

//     const sql =
//     "SELECT * FROM products WHERE name LIKE ?";

//     db.query(
//         sql,
//         [`%${keyword}%`],
//         (err,result)=>{

//             if(err){
//                 return res.status(500).json(err);
//             }

//             res.json(result);
//         }
//     );
// });


app.get("/admin/users", (req,res)=>{
    db.query(
        "SELECT id,username,email,phone,address FROM users",
        (err,result)=>{
            if(err) return res.status(500).json(err);
            res.json(result);
        }
    );
});

app.delete("/admin/user/:id",(req,res)=>{

    db.query(
        "DELETE FROM users WHERE id=?",
        [req.params.id],
        (err,result)=>{
            if(err) return res.status(500).json(err);

            res.json({
                success:true,
                message:"User Deleted"
            });
        }
    );
});

app.get("/admin/products",(req,res)=>{

    db.query(
        "SELECT * FROM products",
        (err,result)=>{
            if(err) return res.status(500).json(err);

            res.json(result);
        }
    );
});

app.post("/admin/products",(req,res)=>{

    const {
        name,
        price,
        image,stock,
        description
    } = req.body;

    db.query(
        `INSERT INTO products
        (name,price,image,stock,description)
        VALUES(?,?,?,?,?)`,
        [
            name,
            price,
            image,
            stock,
            description
        ],
        (err,result)=>{
            if(err) return res.status(500).json(err);

            res.json({
                success:true,
                message:"Product Added"
            });
        }
    );
});


app.put("/admin/product/:id", (req, res) => {

    console.log("BODY:", req.body);
    console.log("ID:", req.params.id);

    const { name, price, image,stock, description } = req.body;

    const sql = `
        UPDATE products
        SET name=?,
            price=?,
            image=?,
            stock=?,
            description=?
        WHERE id=?
    `;

    db.query(
        sql,
        [name, price, image,stock, description, req.params.id],
        (err, result) => {

            if (err) {
                console.log("MYSQL ERROR:", err);
                return res.status(500).json(err);
            }

            res.json({ success: true });
        }
    );
});

app.delete("/admin/product/:id",(req,res)=>{

    db.query(
        "DELETE FROM products WHERE id=?",
        [req.params.id],
        (err,result)=>{
            if(err) return res.status(500).json(err);

            res.json({
                success:true,
                message:"Product Deleted"
            });
        }
    );
});


app.put("/admin/order/:id",(req,res)=>{

    const orderId = req.params.id;
    const status = req.body.status;

    const sql =
    "UPDATE orders SET status=? WHERE order_id=?";

    db.query(sql,[status,orderId],(err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.json({
            success:true,
            message:"Order Status Updated Successfully"
        });

    });

});


app.post("/login",(req,res)=>{

    const { email, password } = req.body;

    if(
        email === "admin@gmail.com" &&
        password === "admin123"
    ){
        return res.json({
            success:true,
            role:"admin"
        });
    }

    const sql =
    "SELECT * FROM users WHERE email=? AND password=?";

    db.query(sql,[email,password],(err,result)=>{

        if(err){
            return res.status(500).json({
                success:false
            });
        }

        if(result.length > 0){

            res.json({
                success:true,
                role:"user",
                userId:result[0].id
            });

        }else{

            res.json({
                success:false,
                message:"Invalid Credentials"
            });

        }

    });

});




app.listen(5000,()=>{
    console.log("server Running on http://localhost:5000");
    
})