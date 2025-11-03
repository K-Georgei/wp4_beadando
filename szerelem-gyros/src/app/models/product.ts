export interface Product {
    id?: number;
    title: string;
    description?: string;
    img?: string;
    price?: number;
}

export interface MenuItem {
    name: string;
    price: number;
}

export interface DrinksGroup{
    flat: MenuItem[];
    carbonated: MenuItem[];
}

export interface Drinks{
    non_alcoholic: DrinksGroup;
    alcoholic: DrinksGroup;
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
    drinks: Drinks;
    sides: MenuItem[];
}
