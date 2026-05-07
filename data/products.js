/* Product data */
const products = [
  { id: 1, name: "Baby Onesie", price: 18.99, category: "baby", age: "0-12m", color: "white", material: "cotton", size: ["S","M"], image: "img/baby1.jpg" },
  { id: 2, name: "Baby Romper", price: 21.99, category: "baby", age: "0-12m", color: "blue", material: "cotton", size: ["S","M"], image: "img/baby2.jpg" },
  { id: 3, name: "Baby Hat", price: 9.99, category: "baby", age: "0-12m", color: "pink", material: "wool", size: ["S"], image: "img/baby3.jpg" },
  { id: 4, name: "Baby Socks", price: 6.99, category: "baby", age: "0-12m", color: "gray", material: "cotton", size: ["S"], image: "img/baby4.jpg" },
  { id: 5, name: "Baby Jacket", price: 29.99, category: "baby", age: "6-12m", color: "yellow", material: "polyester", size: ["M"], image: "img/baby5.jpg" },

  { id: 6, name: "Baby Pajamas", price: 24.99, category: "baby", age: "0-12m", color: "green", material: "cotton", size: ["S","M"], image: "img/baby6.jpg" },
  { id: 7, name: "Baby Bib", price: 7.99, category: "baby", age: "0-12m", color: "white", material: "cotton", size: ["S"], image: "img/baby7.jpg" },
  { id: 8, name: "Baby Blanket", price: 19.99, category: "baby", age: "0-12m", color: "beige", material: "wool", size: ["M"], image: "img/baby8.jpg" },
  { id: 9, name: "Baby Shoes", price: 22.99, category: "baby", age: "6-12m", color: "brown", material: "leather", size: ["S","M"], image: "img/baby9.jpg" },
  { id: 10, name: "Baby T-Shirt", price: 12.99, category: "baby", age: "6-12m", color: "red", material: "cotton", size: ["S","M"], image: "img/baby10.jpg" },

  { id: 11, name: "Baby Hoodie", price: 26.99, category: "baby", age: "6-12m", color: "blue", material: "fleece", size: ["M"], image: "img/baby11.jpg" },
  { id: 12, name: "Baby Pants", price: 17.99, category: "baby", age: "6-12m", color: "black", material: "cotton", size: ["M"], image: "img/baby12.jpg" },
  { id: 13, name: "Baby Dress", price: 23.99, category: "baby", age: "6-12m", color: "pink", material: "linen", size: ["M"], image: "img/baby13.jpg" },
  { id: 14, name: "Baby Swaddle", price: 20.99, category: "baby", age: "0-6m", color: "white", material: "muslin", size: ["S"], image: "img/baby14.jpg" },
  { id: 15, name: "Baby Gloves", price: 8.99, category: "baby", age: "0-6m", color: "gray", material: "cotton", size: ["S"], image: "img/baby15.jpg" },

  { id: 16, name: "Kids T-Shirt", price: 14.99, category: "kid", age: "3-5y", color: "blue", material: "cotton", size: ["S","M","L"], image: "img/kids1.jpg" },
  { id: 17, name: "Kids Hoodie", price: 29.99, category: "kid", age: "5-8y", color: "black", material: "fleece", size: ["M","L"], image: "img/kids2.jpg" },
  { id: 18, name: "Kids Jeans", price: 34.99, category: "kid", age: "5-8y", color: "blue", material: "denim", size: ["M","L"], image: "img/kids3.jpg" },
  { id: 19, name: "Kids Jacket", price: 39.99, category: "kid", age: "6-10y", color: "green", material: "polyester", size: ["L"], image: "img/kids4.jpg" },
  { id: 20, name: "Kids Shorts", price: 19.99, category: "kid", age: "3-6y", color: "gray", material: "cotton", size: ["S","M"], image: "img/kids5.jpg" },

  { id: 21, name: "Kids Dress", price: 27.99, category: "kid", age: "4-7y", color: "pink", material: "linen", size: ["S","M"], image: "img/kids6.jpg" },
  { id: 22, name: "Kids Pajamas", price: 22.99, category: "kid", age: "3-6y", color: "yellow", material: "cotton", size: ["S","M"], image: "img/kids7.jpg" },
  { id: 23, name: "Kids Socks", price: 9.99, category: "kid", age: "3-8y", color: "white", material: "cotton", size: ["S","M"], image: "img/kids8.jpg" },
  { id: 24, name: "Kids Cap", price: 11.99, category: "kid", age: "4-8y", color: "red", material: "polyester", size: ["M"], image: "img/kids9.jpg" },
  { id: 25, name: "Kids Shoes", price: 44.99, category: "kid", age: "5-10y", color: "black", material: "leather", size: ["M","L"], image: "img/kids10.jpg" },

  { id: 26, name: "Kids Sweater", price: 31.99, category: "kid", age: "6-10y", color: "brown", material: "wool", size: ["L"], image: "img/kids11.jpg" },
  { id: 27, name: "Kids Leggings", price: 18.99, category: "kid", age: "4-8y", color: "purple", material: "cotton", size: ["S","M"], image: "img/kids12.jpg" },
  { id: 28, name: "Kids Raincoat", price: 35.99, category: "kid", age: "5-9y", color: "yellow", material: "polyester", size: ["M","L"], image: "img/kids13.jpg" },
  { id: 29, name: "Kids Gloves", price: 12.99, category: "kid", age: "5-9y", color: "gray", material: "wool", size: ["M"], image: "img/kids14.jpg" },
  { id: 30, name: "Kids Scarf", price: 13.99, category: "kid", age: "5-10y", color: "blue", material: "wool", size: ["M"], image: "img/kids15.jpg" },

  { id: 31, name: "Kids Tank Top", price: 15.99, category: "kid", age: "6-10y", color: "white", material: "cotton", size: ["M","L"], image: "img/kids16.jpg" },
  { id: 32, name: "Kids Tracksuit", price: 49.99, category: "kid", age: "7-12y", color: "black", material: "polyester", size: ["L"], image: "img/kids17.jpg" },
  { id: 33, name: "Kids Blazer", price: 54.99, category: "kid", age: "8-12y", color: "navy", material: "linen", size: ["L"], image: "img/kids18.jpg" },
  { id: 34, name: "Kids Skirt", price: 21.99, category: "kid", age: "4-7y", color: "pink", material: "cotton", size: ["S","M"], image: "img/kids19.jpg" },
  { id: 35, name: "Kids Sandals", price: 27.99, category: "kid", age: "5-9y", color: "brown", material: "leather", size: ["M","L"], image: "img/kids20.jpg" },

  { id: 36, name: "Kids Backpack", price: 25.99, category: "kid", age: "6-10y", color: "blue", material: "polyester", size: ["M"], image: "img/kids21.jpg" },
  { id: 37, name: "Kids Winter Coat", price: 59.99, category: "kid", age: "7-12y", color: "black", material: "polyester", size: ["L"], image: "img/kids22.jpg" },
  { id: 38, name: "Kids Slippers", price: 16.99, category: "kid", age: "4-8y", color: "gray", material: "cotton", size: ["S","M"], image: "img/kids23.jpg" },
  { id: 39, name: "Kids Swimwear", price: 23.99, category: "kid", age: "5-10y", color: "blue", material: "nylon", size: ["M","L"], image: "img/kids24.jpg" },
  { id: 40, name: "Kids Belt", price: 10.99, category: "kid", age: "6-10y", color: "black", material: "leather", size: ["M"], image: "img/kids25.jpg" },

  { id: 41, name: "Baby Winter Suit", price: 34.99, category: "baby", age: "6-12m", color: "blue", material: "polyester", size: ["M"], image: "img/baby16.jpg" },
  { id: 42, name: "Baby Cardigan", price: 22.99, category: "baby", age: "6-12m", color: "cream", material: "wool", size: ["M"], image: "img/baby17.jpg" },
  { id: 43, name: "Baby Leggings", price: 15.99, category: "baby", age: "0-12m", color: "gray", material: "cotton", size: ["S","M"], image: "img/baby18.jpg" },
  { id: 44, name: "Baby Summer Set", price: 19.99, category: "baby", age: "3-9m", color: "yellow", material: "cotton", size: ["S"], image: "img/baby19.jpg" },
  { id: 45, name: "Baby Booties", price: 11.99, category: "baby", age: "0-6m", color: "white", material: "wool", size: ["S"], image: "img/baby20.jpg" },

  { id: 46, name: "Kids Polo Shirt", price: 18.99, category: "kid", age: "6-10y", color: "green", material: "cotton", size: ["M","L"], image: "img/kids26.jpg" },
  { id: 47, name: "Kids Formal Pants", price: 32.99, category: "kid", age: "7-12y", color: "black", material: "linen", size: ["L"], image: "img/kids27.jpg" },
  { id: 48, name: "Kids Denim Jacket", price: 41.99, category: "kid", age: "6-10y", color: "blue", material: "denim", size: ["M","L"], image: "img/kids28.jpg" },
  { id: 49, name: "Kids Graphic Tee", price: 16.99, category: "kid", age: "5-9y", color: "white", material: "cotton", size: ["S","M"], image: "img/kids29.jpg" },
  { id: 50, name: "Kids Pajama Set", price: 24.99, category: "kid", age: "4-8y", color: "purple", material: "cotton", size: ["S","M"], image: "img/kids30.jpg" }
];

export default products;