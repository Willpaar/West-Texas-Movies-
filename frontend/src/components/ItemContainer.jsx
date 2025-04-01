import React from "react";
import ItemCard from "./ItemCard.jsx";
import styles from "./ItemCard.module.css";

const items = [
    {
        "id": 1,
        "name": "iPhone 15 Pro",
        "brand": "Apple",
        "price": 999.99,
        "description": "Apple iPhone 15 Pro with A17 Bionic chip, 6.1-inch OLED display, and a titanium frame.",
        "storage": "128GB",
        "ram": "8GB",
        "camera": "48MP + 12MP + 12MP",
        "battery": "3274mAh"
      },
      {
        "id": 2,
        "name": "Samsung Galaxy S23 Ultra",
        "brand": "Samsung",
        "price": 1199.99,
        "description": "Samsung's premium flagship with a 200MP camera, Snapdragon 8 Gen 2, and a 6.8-inch AMOLED display.",
        "storage": "256GB",
        "ram": "12GB",
        "camera": "200MP + 12MP + 10MP + 10MP",
        "battery": "5000mAh"
      },
      {
        "id": 3,
        "name": "Google Pixel 8 Pro",
        "brand": "Google",
        "price": 999.99,
        "description": "Google Pixel 8 Pro with AI-powered Tensor G3 chip and best-in-class computational photography.",
        "storage": "128GB",
        "ram": "12GB",
        "camera": "50MP + 48MP + 48MP",
        "battery": "5050mAh"
      },
      {
        "id": 4,
        "name": "OnePlus 11",
        "brand": "OnePlus",
        "price": 699.99,
        "description": "OnePlus 11 with Snapdragon 8 Gen 2, Hasselblad-tuned camera, and 80W fast charging.",
        "storage": "256GB",
        "ram": "16GB",
        "camera": "50MP + 48MP + 32MP",
        "battery": "5000mAh"
      },
      {
        "id": 5,
        "name": "Xiaomi 13 Pro",
        "brand": "Xiaomi",
        "price": 899.99,
        "description": "Xiaomi 13 Pro featuring a 1-inch 50MP sensor, Snapdragon 8 Gen 2, and 120W fast charging.",
        "storage": "256GB",
        "ram": "12GB",
        "camera": "50MP + 50MP + 50MP",
        "battery": "4820mAh"
      },
      {
        "id": 6,
        "name": "Sony Xperia 1 V",
        "brand": "Sony",
        "price": 1299.99,
        "description": "Sony Xperia 1 V with a 4K OLED display, Snapdragon 8 Gen 2, and pro-level camera setup.",
        "storage": "256GB",
        "ram": "12GB",
        "camera": "48MP + 12MP + 12MP",
        "battery": "5000mAh"
      },
      {
        "id": 7,
        "name": "iPhone 14",
        "brand": "Apple",
        "price": 799.99,
        "description": "Apple iPhone 14 with A15 Bionic chip, 6.1-inch OLED display, and improved battery life.",
        "storage": "128GB",
        "ram": "6GB",
        "camera": "12MP + 12MP",
        "battery": "3279mAh"
      },
      {
        "id": 8,
        "name": "Samsung Galaxy Z Flip 5",
        "brand": "Samsung",
        "price": 999.99,
        "description": "Samsung Galaxy Z Flip 5 with a new hinge design, 6.7-inch foldable AMOLED display, and improved cameras.",
        "storage": "256GB",
        "ram": "8GB",
        "camera": "12MP + 12MP",
        "battery": "3700mAh"
      },
      {
        "id": 9,
        "name": "Nothing Phone (2)",
        "brand": "Nothing",
        "price": 599.99,
        "description": "Nothing Phone (2) with a transparent design, Snapdragon 8+ Gen 1, and a 6.7-inch AMOLED display.",
        "storage": "256GB",
        "ram": "12GB",
        "camera": "50MP + 50MP",
        "battery": "4700mAh"
      },
      {
        "id": 10,
        "name": "Asus ROG Phone 7",
        "brand": "Asus",
        "price": 1099.99,
        "description": "Gaming beast with Snapdragon 8 Gen 2, 165Hz AMOLED display, and a massive 6000mAh battery.",
        "storage": "512GB",
        "ram": "16GB",
        "camera": "50MP + 13MP + 5MP",
        "battery": "6000mAh"
      },
      {
        "id": 11,
        "name": "iPhone SE (2022)",
        "brand": "Apple",
        "price": 429.99,
        "description": "Affordable iPhone with A15 Bionic chip, 4.7-inch Retina display, and Touch ID.",
        "storage": "128GB",
        "ram": "4GB",
        "camera": "12MP",
        "battery": "2018mAh"
      },
      {
        "id": 12,
        "name": "Samsung Galaxy A54",
        "brand": "Samsung",
        "price": 449.99,
        "description": "Mid-range Samsung phone with a 6.4-inch AMOLED display, Exynos 1380, and 50MP camera.",
        "storage": "128GB",
        "ram": "6GB",
        "camera": "50MP + 12MP + 5MP",
        "battery": "5000mAh"
      },
      {
        "id": 13,
        "name": "Google Pixel 7a",
        "brand": "Google",
        "price": 499.99,
        "description": "Affordable Pixel phone with Tensor G2 chip and exceptional camera capabilities.",
        "storage": "128GB",
        "ram": "8GB",
        "camera": "64MP + 13MP",
        "battery": "4385mAh"
      },
      {
        "id": 14,
        "name": "Motorola Edge 40 Pro",
        "brand": "Motorola",
        "price": 799.99,
        "description": "Flagship Motorola phone with Snapdragon 8 Gen 2 and a 165Hz pOLED display.",
        "storage": "256GB",
        "ram": "12GB",
        "camera": "50MP + 50MP + 12MP",
        "battery": "4600mAh"
      },
      {
        "id": 15,
        "name": "Realme GT 3",
        "brand": "Realme",
        "price": 649.99,
        "description": "Realme GT 3 with 240W fast charging and Snapdragon 8+ Gen 1 for ultimate speed.",
        "storage": "256GB",
        "ram": "16GB",
        "camera": "50MP + 8MP + 2MP",
        "battery": "4600mAh"
      }
    ]

const ItemContainer = () =>{
    return(
        <div className="itemContainer">
            {items.map((item)=>(
                <ItemCard key={item.id} item={item}/>
            ))}
        </div>
    )
}

export default ItemContainer;