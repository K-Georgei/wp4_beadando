export interface Product {
    id?: number;
    title: string;
    description?: string;
    img?: string;
    price?: number;
    tags?: string[];
    ingredients?: string[]; // Ensure ingredients are part of the final product
}

export interface ProductVariant {
    name: string;
    ingredients: string[];
    img: string; // Make image required for consistency
    tags?: string[];
}


export interface MenuItem {
    name: string;
    price: number;
}

export interface DrinksGroup{
    flat: MenuItem[];
    carbonated: MenuItem[];
}

export interface Ingredients{
    meats: MenuItem[];
    vegetables: MenuItem[];
    sauces: MenuItem[];
    extras: MenuItem[];
}

export interface Menu{
    ingredients: Ingredients;
    serving: MenuItem[];
    drinks: DrinksGroup; // Use DrinksGroup directly
    sides: MenuItem[];
}
