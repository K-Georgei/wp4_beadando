export interface Product {
    id?: number;
    title: string;
    description?: string;
    img?: string;
    price?: number;
}

export interface DrinksGroup{
    flat: string[];
    carbonated: string[];
}

export interface Drinks{
    non_alcoholic: DrinksGroup;
    alcoholic: DrinksGroup;
}

export interface Ingredients{
    meats: string[];
    vegetables: string[];
    sauces: string[];
    extras: string[];
}

export interface Menu{
    ingredients: Ingredients;
    serving: string[];
    drinks: Drinks;
    sides: string[];
}