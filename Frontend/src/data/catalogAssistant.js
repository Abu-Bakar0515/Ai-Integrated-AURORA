import {
  formatPrice,
  productCatalog,
  productCategories,
} from "./products.js";

const categoryAliases = {
  clothing: ["clothing", "clothes", "apparel"],
  handbags: ["handbags", "handbag", "bags", "bag"],
  shoes: [
    "shoes",
    "shoe",
    "footwear",
    "sneakers",
    "boots",
    "heels",
    "sandals",
    "loafers",
    "flats",
    "pumps",
  ],
  accessories: [
    "accessories",
    "accessory",
    "jewelry",
    "jewellery",
    "sunglasses",
    "scarf",
    "belt",
    "watch",
    "necklace",
    "bracelet",
    "earrings",
    "ring",
  ],
};

const ignoredTerms = new Set([
  "a",
  "about",
  "any",
  "are",
  "can",
  "details",
  "do",
  "for",
  "find",
  "give",
  "have",
  "help",
  "i",
  "is",
  "looking",
  "me",
  "much",
  "of",
  "on",
  "or",
  "pkr",
  "price",
  "product",
  "products",
  "please",
  "rs",
  "show",
  "tell",
  "the",
  "to",
  "what",
  "which",
  "you",
]);

const statusTerms = new Set([
  "available",
  "discount",
  "new",
  "offer",
  "out",
  "sale",
  "stock",
  "under",
  "unavailable",
  "up",
]);

function normalize(value) {
  return value.toLocaleLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function getPriceLimit(query) {
  const match = query.match(
    /\b(?:under|below|less than|up to)\s+(?:pkr\s+|rs\s+)?([\d ]+)/,
  );
  if (!match) return null;

  const limit = Number(match[1].replace(/\s/g, ""));
  return Number.isFinite(limit) ? limit : null;
}

function formatProduct(product) {
  const price = product.salePrice
    ? `Sale price ${formatPrice(product.salePrice)} (regularly ${formatPrice(product.price)})`
    : `Price ${formatPrice(product.price)}`;
  const availability = product.isInStock ? "In Stock" : "Out of Stock";

  return `${product.name} (${product.category}) — ${product.description} ${price}. ${availability}.`;
}

export function getCatalogAssistantAnswer(question) {
  const query = normalize(question);
  const words = query.split(" ").filter(Boolean);
  const categories = productCategories.filter(({ slug }) =>
    categoryAliases[slug].some((alias) => words.includes(alias)),
  );
  const categorySlugs = new Set(categories.map(({ slug }) => slug));
  const wantsSale = /\b(?:sale|discount|offer)\b/.test(query);
  const wantsNew = /\b(?:new|arrival|arrivals)\b/.test(query);
  const wantsOutOfStock = /\b(?:out of stock|unavailable)\b/.test(query);
  const wantsInStock =
    !wantsOutOfStock && /\b(?:in stock|available)\b/.test(query);
  const priceLimit = getPriceLimit(query);
  const categoryWords = new Set(
    Object.values(categoryAliases).flat(),
  );
  const keywords = words.filter(
    (word) =>
      word.length > 1 &&
      !/^\d+$/.test(word) &&
      !ignoredTerms.has(word) &&
      !statusTerms.has(word) &&
      !categoryWords.has(word),
  );

  const matches = productCatalog
    .map((product) => {
      const searchableText = normalize(
        `${product.name} ${product.category} ${product.description}`,
      );
      const keywordMatches = keywords.filter((keyword) =>
        searchableText.includes(keyword),
      ).length;

      return { product, keywordMatches };
    })
    .filter(({ product, keywordMatches }) => {
      const currentPrice = product.salePrice || product.price;
      return (
        (!categorySlugs.size || categorySlugs.has(product.categorySlug)) &&
        (!wantsSale || Boolean(product.salePrice)) &&
        (!wantsNew || product.isNew) &&
        (!wantsOutOfStock || !product.isInStock) &&
        (!wantsInStock || product.isInStock) &&
        (priceLimit === null || currentPrice <= priceLimit) &&
        (!keywords.length || keywordMatches > 0)
      );
    })
    .sort((first, second) => second.keywordMatches - first.keywordMatches)
    .slice(0, 4)
    .map(({ product }) => product);

  if (!matches.length) {
    return "I couldn't find a matching item in the catalog. Try a product name, category, or a detail such as “on sale” or “under PKR 20,000”.";
  }

  const heading = wantsSale
    ? "These catalog items are currently on sale:"
    : wantsOutOfStock
      ? "These matching items are currently out of stock:"
      : `I found ${matches.length === 1 ? "this item" : "these items"}:`;

  return `${heading}\n\n${matches.map(formatProduct).join("\n\n")}`;
}
