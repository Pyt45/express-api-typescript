import { Request, Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { UserController } from "../controllers/UserController";
import { auth } from "../middlewares/auth";
import  multer from "multer";
export const handleRouter = Router();

const userController = new UserController();
const productController = new ProductController();

handleRouter.get('/user/:id', auth, userController.findUser);
handleRouter.post('/user/add', userController.createUser);
handleRouter.post('/user/login', userController.login);
handleRouter.post('/user/logout', auth, userController.logout);

const storage = multer.diskStorage({
    destination: function(req: Request, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req: Request, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        console.log(file);
        cb(null, file.fieldname + uniqueSuffix + '.' + file.originalname.split('.')[1]);
    }
});

const fileFilter = (req: Request, file: any, cb: any) => {
    if (file.mimetype === 'image/png'
        || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/jpeg') {
            cb(null, true);
        }
    else {
        cb(new Error("file must be a valid image"), false);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

handleRouter.post('/product/add', auth, productController.addProduct);
handleRouter.put('/product/:id', auth, productController.updateProduct);
handleRouter.delete('/product/:id', auth, productController.deleteProduct);
handleRouter.delete('/products', auth, productController.deleteAllProducts);
handleRouter.get('/product/:id', auth, productController.getProductById);
handleRouter.get('/products', auth, productController.getProducts);
handleRouter.patch('/product/addimage/:id', auth, upload.single('avatar'), productController.addImageToProduct);