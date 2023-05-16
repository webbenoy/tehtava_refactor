import React from "react";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "src/components/elements/productCard";
import { IProduct } from "src/interfaces/product";


describe('Product listing', () => {
    it ('Check if product card renders a non favorited product', () => {
        const mockProduct: IProduct = {
            title: 'Test Product Not Fav',
            price: 80,
            description: 'This is a test product...',
            isFav: false,
        };

        const toggleFav = jest.fn();

        render(<ProductCard product={mockProduct} toggleFav={toggleFav} />);

        expect(screen.getByText('Add to favorites')).toBeTruthy();
    });

    it ('Check if product card renders a favorited product', () => {
        const mockProduct: IProduct = {
            title: 'Test Product Fav',
            price: 180,
            description: 'This is a test product...',
            isFav: true,
        };

        const toggleFav = jest.fn();

        render(<ProductCard product={mockProduct} toggleFav={toggleFav} />);

        expect(screen.getByText('Remove from favorites')).toBeTruthy();
    });
})