import { Product, ProductVariant, Menu, MenuItem } from '@models/product';

// Helper to find an item's price from the menu
function findPrice(name: string, menu: Menu): number {
  const allItems: MenuItem[] = [
    ...menu.ingredients.meats,
    ...menu.ingredients.vegetables,
    ...menu.ingredients.sauces,
    ...menu.ingredients.extras,
    ...menu.serving,
    ...menu.sides,
  ];
  const item = allItems.find(i => i.name === name);
  return item ? item.price : 0;
}

export function generateGyros(
  baseName: string,
  variants: ProductVariant[],
  menu: Menu
): Product[] {
  if (!menu) return [];

  return variants.map((variant, index) => {
    const title = `${variant.name} ${baseName}`;
    const price = variant.ingredients.reduce(
      (sum, ingName) => sum + findPrice(ingName, menu),
      0
    );

    // --- NEW LOGIC FOR COMBINING TAGS ---
    // Use a Set to automatically handle duplicates
    const combinedTags = new Set<string>();

    // 1. Add all ingredients to the tags
    variant.ingredients.forEach(ing => combinedTags.add(ing));

    // 2. Add all custom-defined tags
    if (variant.tags) {
      variant.tags.forEach(tag => combinedTags.add(tag));
    }
    // --- END OF NEW LOGIC ---

    return {
      id: index + 1, // Simple ID generation
      title: title,
      description: `Összetevők: ${variant.ingredients.join(', ')}.`,
      price: price,
      img: variant.img,
      ingredients: variant.ingredients,
      // Convert the Set back to an array for the final product
      tags: Array.from(combinedTags),
    };
  });
}