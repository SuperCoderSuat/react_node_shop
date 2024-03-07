import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import multer from 'multer';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = 3000; // .env Eintrag fehlt

app.use(express.json());
app.use(cors());

// DB-Connection
mongoose.connect("mongodb+srv://supercodesuat:SuperCodeSuat!@cluster0.lqkhlgw.mongodb.net/e-commerce");

// API-GET
app.get('/', (req, res) => {
    res.send("Express App is running");
});

// Multer
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
});


// Upload Endpoint
app.use('/images', express.static('upload/images'));
app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${PORT}/images/${req.file.filename}`
    });
});

// Schema Creating Products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    });
});

// DELETE ENDPOINT
app.post("/removeproduct", async (req, res) => {
    await Product.findOneAndDelete({id: req.body.id});
    console.log("removed");
    res.json({
        success: true,
        name: req.body.name
    });
});

// GET all products ENDPOINT
app.get("/allproducts", async (req, res) => {
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);
});

// Shema for user model
const Users = mongoose.model('Users', {
    name: { type: String, },
    email: { type: String, },
    password: { type: String, unique: true, },
    cartData: { type: Object, },
    date: { type: Date, default: Date.now, },
});

// ENDPOINT regestrierung
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email })
    if (check) {
        return res.status(400).json({ success: false, errors: "existing user found with same email adress"})
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });
    await user.save();

    const data = {
        user: { id: user.id },
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token, })
});

// ENDPOINT LOGIN
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email })
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom')
            res.json({ success: true, token });
        } else {
            res.json({ success: false, errors: "Wrong Password" });
        }
    }
    else {
        res.json({ success: false, errors: "Wrong Email Id" })
    }
});

// App.listen
app.listen(PORT, (err) => {
    if (!err) {
        console.log("Server is running on port " + PORT);
    } else {
        console.log("Error: " + err);
    }
});
