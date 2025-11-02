import { Product } from '../../models/product';

export interface GeneratorOptions{
    basePrice?: number;
    img?: string
}

export function generateGyros(category: string, variants: string[], opts: GeneratorOptions={}): Product[]{
    const basePrice = opts.basePrice ?? 1500;
    const img = opts.img ?? 'assets/images/placeholder.jpg';

    return variants.map((v, i) => ({
    id: Date.now() + i,
    title: `${category} - ${v}`,
    description: v,
    img,
    price: basePrice + i * 100,
    category
  }));
}