import { Request, Response } from "express";
import { Product } from "../models/Product";

export class ProductController {
    addProduct = async (req: Request, res: Response) => {
        try {
            const { name, type, reference, price, description } = req.body;
            const product = await Product.create({
                name,
                type,
                reference,
                price,
                description
            });
            res.status(201).json({
                product: product,
                msg: 'product created successfully'
            });
        } catch(err) {
            res.status(500).send(err);
        }
    }

    updateProduct = async (req: Request, res: Response) => {
        try {
            let product = await Product.findOne({ where: {id: req.params.id} });
            if (!product)
                res.status(401).json({
                    msg: 'product not found'
                });
            const { name, type, reference, price, description } = req.body;
            await Product.update({
                name,
                reference,
                type,
                price,
                description
            }, { where: {id: req.params.id} });
            res.status(201).json({
                product: product,
                msg: 'product created successfully'
            });
        } catch(err) {
            res.status(500).send(err);
        }
    }

    deleteProduct = async (req: Request, res: Response) => {
        try {
            let product = await Product.findOne({ where: {id: req.params.id} });
            if (!product)
                res.status(401).json({
                    msg: 'product not found'
                });
            // Delete product
        } catch(err) {
            res.status(500).send(err);
        }
    }

    deleteAllProducts = (req: Request, res: Response) => {
        try {
            // Delete all
        } catch(err) {
            res.status(500).send(err);
        }
    }

    getProductById = async (req: Request, res: Response) => {
        try {
            const product = await Product.findOne({ where: { id: req.params.id } });
            if (!product)
                res.status(401).json({
                    msg: 'Product not found'
                });
        } catch(err) {
            res.status(500).send(err);
        }
    }

    getProducts = async (req: Request, res: Response) => {
        try {
            const products = await Product.findAll();
            return products;
        } catch(err) {
            res.status(500).send(err);
        }
    }

    addImageToProduct = async (req: Request, res: Response) => {
        try {
            let product = await Product.findOne({ where: { id: req.params.id } });
            if (!product)
                res.status(401).json({
                    msg: 'Product not found'
                });
            if (product && req.file)
                product.avatar = req.file.filename;
            await product?.save();
        }catch(err) {
            res.status(500).send(err);
        }
    }
}