export const productCategories = [
  { slug: "clothing", label: "Clothing" },
  { slug: "handbags", label: "Handbags" },
  { slug: "shoes", label: "Shoes" },
  { slug: "accessories", label: "Accessories" },
];

const catalogSections = [
  {
    slug: "clothing",
    label: "Clothing",
    products: [
      {
        name: "Classic Beige Trench Coat",
        price: 12900,
        image: "/assets/products/clothing/classic-beige-trench-coat.jpg",
        description: "A timeless double-breasted layer in a soft beige tone.",
        isNew: true,
        newArrivalOrder: 1,
        isFeatured: true,
      },
      {
        name: "Oversized White Shirt",
        price: 7900,
        image: "/assets/products/clothing/oversized-white-shirt.jpg",
        description: "An easy, relaxed-fit essential for polished everyday looks.",
        isFeatured: true,
      },
      {
        name: "Premium Black Blazer",
        price: 18900,
        image: "/assets/products/clothing/premium-black-blazer.jpg",
        description: "A structured blazer with clean, considered tailoring.",
        isInStock: false,
        isFeatured: true,
      },
      {
        name: "Cashmere Knit Sweater",
        price: 12500,
        image: "/assets/products/clothing/cashmere-knit-sweater.jpg",
        description: "A soft rib-knit layer made for effortless comfort.",
        isNew: true,
        newArrivalOrder: 2,
        salePrice: 10600,
      },
      {
        name: "Tailored Black Trousers",
        price: 8900,
        image: "/assets/products/clothing/tailored-black-trousers.jpg",
        description: "A refined straight-leg silhouette with a tailored finish.",
      },
      {
        name: "Cream Linen Dress",
        price: 14500,
        image: "/assets/products/clothing/cream-linen-dress.jpg",
        description: "A light, graceful dress in a soft cream shade.",
        isInStock: false,
      },
      {
        name: "Brown Leather Jacket",
        price: 22900,
        image: "/assets/products/clothing/brown-leather-jacket.jpg",
        description: "A richly toned leather layer with a relaxed profile.",
      },
      {
        name: "Beige Wide-Leg Pants",
        price: 9500,
        image: "/assets/products/clothing/beige-wide-leg-pants.jpg",
        description: "Fluid wide legs and a neutral palette for easy styling.",
      },
      {
        name: "White Cotton T-Shirt",
        price: 3900,
        image: "/assets/products/clothing/white-cotton-t-shirt.jpg",
        description: "A breathable cotton staple with a clean crew neckline.",
        isNew: true,
      },
      {
        name: "Elegant Satin Skirt",
        price: 8500,
        image: "/assets/products/clothing/elegant-satin-skirt.jpg",
        description: "A softly draped skirt with a subtle satin sheen.",
      },
    ],
  },
  {
    slug: "handbags",
    label: "Handbags",
    products: [
      {
        name: "Classic Black Leather Tote",
        price: 18900,
        image: "/assets/products/handbags/classic-black-leather-tote.jpg",
        description: "A spacious everyday tote in smooth, structured leather.",
        isFeatured: true,
      },
      {
        name: "Beige Shoulder Bag",
        price: 16500,
        image: "/assets/products/handbags/beige-shoulder-bag.jpg",
        description: "A softly structured shoulder bag in a versatile neutral.",
        isFeatured: true,
      },
      {
        name: "Mini Brown Crossbody Bag",
        price: 12500,
        image: "/assets/products/handbags/mini-brown-crossbody-bag.jpg",
        description: "A compact crossbody with warm brown leather detailing.",
        isInStock: false,
      },
      {
        name: "Premium Leather Handbag",
        price: 21500,
        image: "/assets/products/handbags/premium-leather-handbag.jpg",
        description: "A polished leather carryall with a timeless silhouette.",
        isFeatured: true,
      },
      {
        name: "Quilted Black Bag",
        price: 18500,
        image: "/assets/products/handbags/quilted-black-bag.jpg",
        description: "A quilted finish and a versatile shape for day or evening.",
        isNew: true,
        newArrivalOrder: 3,
      },
      {
        name: "Cream Bucket Bag",
        price: 14500,
        image: "/assets/products/handbags/cream-bucket-bag.jpg",
        description: "A relaxed bucket shape in a light cream colorway.",
        salePrice: 12300,
      },
      {
        name: "Vintage Brown Handbag",
        price: 19500,
        image: "/assets/products/handbags/vintage-brown-handbag.jpg",
        description: "A classic brown handbag with a softly lived-in finish.",
      },
      {
        name: "Minimalist Evening Clutch",
        price: 8500,
        image: "/assets/products/handbags/minimalist-evening-clutch.jpg",
        description: "A compact clutch made for elegant evenings out.",
      },
      {
        name: "Structured Beige Tote",
        price: 22500,
        image: "/assets/products/handbags/structured-beige-tote.jpg",
        description: "A structured tote with generous space and clean lines.",
      },
      {
        name: "Everyday Crossbody Bag",
        price: 11500,
        image: "/assets/products/handbags/everyday-crossbody-bag.jpg",
        description: "A hands-free everyday bag with an adjustable strap.",
        isInStock: false,
      },
    ],
  },
  {
    slug: "shoes",
    label: "Shoes",
    products: [
      {
        name: "Classic White Sneakers",
        price: 8500,
        image: "/assets/products/shoes/classic-white-sneakers.jpg",
        description: "A clean, versatile sneaker for everyday wear.",
        isFeatured: true,
      },
      {
        name: "Black Leather Loafers",
        price: 15500,
        image: "/assets/products/shoes/black-leather-loafers.jpg",
        description: "A refined leather loafer with a timeless profile.",
        isFeatured: true,
      },
      {
        name: "Beige High Heels",
        price: 17500,
        image: "/assets/products/shoes/beige-high-heels.jpg",
        description: "An elegant neutral heel with a softly sculpted shape.",
        isFeatured: true,
      },
      {
        name: "Brown Leather Boots",
        price: 21500,
        image: "/assets/products/shoes/brown-leather-boots.jpg",
        description: "A durable leather boot in a rich brown finish.",
      },
      {
        name: "Minimalist Ballet Flats",
        price: 10500,
        image: "/assets/products/shoes/minimalist-ballet-flats.jpg",
        description: "A delicate flat designed for comfortable all-day wear.",
      },
      {
        name: "Cream Sneakers",
        price: 9500,
        image: "/assets/products/shoes/cream-sneakers.jpg",
        description: "A soft cream sneaker that pairs easily with every look.",
        isNew: true,
        newArrivalOrder: 4,
      },
      {
        name: "Elegant Black Pumps",
        price: 18500,
        image: "/assets/products/shoes/elegant-black-pumps.jpg",
        description: "A sleek pump with an elevated, evening-ready finish.",
        salePrice: 15700,
      },
      {
        name: "Tan Leather Sandals",
        price: 7500,
        image: "/assets/products/shoes/tan-leather-sandals.jpg",
        description: "Lightweight leather sandals in a warm tan shade.",
      },
      {
        name: "Classic Ankle Boots",
        price: 19500,
        image: "/assets/products/shoes/classic-ankle-boots.jpg",
        description: "A versatile ankle boot with a clean classic shape.",
        isInStock: false,
      },
      {
        name: "Premium Flat Sandals",
        price: 8500,
        image: "/assets/products/shoes/premium-flat-sandals.jpg",
        description: "An understated flat sandal with refined detailing.",
      },
    ],
  },
  {
    slug: "accessories",
    label: "Accessories",
    products: [
      {
        name: "Minimalist Gold Necklace",
        price: 5500,
        image: "/assets/products/accessories/minimalist-gold-necklace.jpg",
        description: "A delicate gold-tone chain for effortless layering.",
        isFeatured: true,
      },
      {
        name: "Classic Sunglasses",
        price: 7500,
        image: "/assets/products/accessories/classic-sunglasses.jpg",
        description: "A timeless frame that adds polish to everyday looks.",
        isFeatured: true,
      },
      {
        name: "Elegant Gold Bracelet",
        price: 5500,
        image: "/assets/products/accessories/elegant-gold-bracelet.jpg",
        description: "A graceful bracelet with a warm gold finish.",
        isFeatured: true,
      },
      {
        name: "Premium Leather Belt",
        price: 6500,
        image: "/assets/products/accessories/premium-leather-belt.jpg",
        description: "A polished leather belt with a classic metal buckle.",
      },
      {
        name: "Minimalist Wrist Watch",
        price: 19500,
        image: "/assets/products/accessories/minimalist-wrist-watch.jpg",
        description: "A refined timepiece with a clean, understated dial.",
      },
      {
        name: "Silk Scarf",
        price: 4800,
        image: "/assets/products/accessories/silk-scarf.jpg",
        description: "A lightweight scarf in a soft, easy-to-style finish.",
      },
      {
        name: "Gold Hoop Earrings",
        price: 4500,
        image: "/assets/products/accessories/gold-hoop-earrings.jpg",
        description: "A polished pair of hoops for day-to-evening wear.",
      },
      {
        name: "Classic Leather Wallet",
        price: 6500,
        image: "/assets/products/accessories/classic-leather-wallet.jpg",
        description: "A compact wallet crafted for everyday essentials.",
        isInStock: false,
      },
      {
        name: "Elegant Hair Clip",
        price: 2500,
        image: "/assets/products/accessories/elegant-hair-clip.jpg",
        description: "A refined accent to finish a simple hairstyle.",
      },
      {
        name: "Premium Fashion Ring",
        price: 4500,
        image: "/assets/products/accessories/premium-fashion-ring.jpg",
        description: "A minimal ring with a polished, elegant silhouette.",
      },
    ],
  },
];

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export const productCatalog = catalogSections.flatMap(
  ({ slug, label, products }, categoryIndex) =>
    products.map((product, index) => ({
      id: `${slug}-${slugify(product.name)}`,
      name: product.name,
      category: label,
      categorySlug: slug,
      price: product.price,
      salePrice: product.salePrice ?? null,
      image: product.image,
      alt: product.name,
      description: product.description,
      isNew: product.isNew ?? false,
      isFeatured: product.isFeatured ?? false,
      isInStock: product.isInStock ?? true,
      newestRank: categoryIndex * 100 + index,
      newArrivalOrder: product.newArrivalOrder ?? null,
    })),
);

export const newArrivalProducts = productCatalog
  .filter((product) => product.newArrivalOrder !== null)
  .sort((first, second) => first.newArrivalOrder - second.newArrivalOrder);

export function formatPrice(price) {
  return `PKR ${new Intl.NumberFormat("en-PK").format(price)}`;
}
