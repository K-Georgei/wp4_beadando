import { Product, Menu, MenuItem } from '@models/product';

export interface GeneratorOptions {
    img?: string;
}

export interface GyrosVariant {
    name: string;
    ingredients: string[]; // List of ingredient names
    img?: string; // Add image property to the variant
}

// Helper function to find an item and its price from the menu
function findMenuItem(name: string, menu: Menu): MenuItem | undefined {
    const allItems: MenuItem[] = [
        ...menu.ingredients.meats,
        ...menu.ingredients.vegetables,
        ...menu.ingredients.sauces,
        ...menu.ingredients.extras,
        ...menu.serving,
        ...menu.sides
    ];
    return allItems.find(item => name.toLowerCase() === item.name.toLowerCase());
}

export function generateGyros(category: string, variants: GyrosVariant[], menu: Menu, opts: GeneratorOptions = {}): Product[] {
    const defaultImg = opts.img ?? 'assets/images/placeholder.jpg';

    return variants.map((variant, i) => {
        let price = 0;
        const descriptionItems: string[] = [];

        variant.ingredients.forEach(ingredientName => {
            const menuItem = findMenuItem(ingredientName, menu);
            if (menuItem) {
                price += menuItem.price;
                descriptionItems.push(menuItem.name);
            }
        });

        // Use the variant's specific image, or fall back to the default.
        const img = variant.img ?? defaultImg;

        return {
            id: Date.now() + i,
            title: `${category} - ${variant.name}`,
            description: descriptionItems.join(', '),
            img, // Use the determined image
            price,
            category
        };
    });
}