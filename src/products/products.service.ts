import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(@InjectModel('Product') private readonly ProductModel: Model<Product>,
  ) {
  }

  async insertProduct(title: string, description: string, price: number) {
    const newProduct = new this.ProductModel({ title, description, price });
    const res = await newProduct.save();
    console.log(res);
    return res.id;
  }

  async getProducts() {
    return await this.ProductModel.find();
  }

  async getSingleProduct(productId: string) {
    return await this.findProduct(productId);
  }

  async updateProduct(productId: string, title: string, desc: string, price: number) {
    const updatedProduct = await this.findProduct(productId);
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    await updatedProduct.save();
  }

  async deleteProduct(prodId: string) {
    const index = await this.findProduct(prodId);
    await index.remove();
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.ProductModel.findById(id);
    } catch (e) {
      throw new NotFoundException('Could not find product.');
    }
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }
}
