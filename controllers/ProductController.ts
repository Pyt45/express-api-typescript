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
                res.status(404).json({
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
                msg: 'product updated successfully'
            });
        } catch(err) {
            res.status(500).send(err);
        }
    }

    deleteProduct = async (req: Request, res: Response) => {
        try {
            let product = await Product.findOne({ where: {id: req.params.id} });
            if (!product)
                res.status(404).json({
                    msg: 'product not found'
                });
            // Delete product
            await Product.destroy({
                where: { id: req.params.id }
            });
            res.status(200).json({
                msg: 'product successfully deleted'
            });
        } catch(err) {
            res.status(500).send(err);
        }
    }

    deleteAllProducts = async (req: Request, res: Response) => {
        try {
            // Delete all
            await Product.destroy({
                truncate: true,
            });
            res.status(200).json({
                msg: 'All products successfully deleted'
            });
        } catch(err) {
            res.status(500).send(err);
        }
    }

    getProductById = async (req: Request, res: Response) => {
        try {
            const product = await Product.findOne({ where: { id: req.params.id } });
            if (!product) {
                return res.status(404).json({
                    msg: 'Product not found'
                });
            } else
                res.status(200).json(product);
        } catch(err) {
            console.log(err);
            res.status(500).send(err);
        }
    }

    getProducts = async (req: Request, res: Response) => {
        try {
            const products = await Product.findAll();
            res.status(200).json(products);
        } catch(err) {
            console.log(err);
            res.status(500).send(err);
        }
    }

    addImageToProduct = async (req: Request, res: Response) => {
        try {
            let product = await Product.findOne({ where: { id: req.params.id } });
            if (!product) {
                return res.status(404).json({
                    msg: 'Product not found'
                });
            }
            if (product && req.file) {
                console.log(req.file);
                product.avatar = req.file.filename;
            }
            await product?.save();
            res.status(201).json({
                msg: 'product avatar successfully updated'
            });
        }catch(err) {
            res.status(500).send(err);
        }
    }
}