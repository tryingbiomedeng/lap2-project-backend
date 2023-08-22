// CREATE TABLE items (
//   item_id INT GENERATED ALWAYS AS IDENTITY,
//   seller_id INT,
//   item_name VARCHAR(50) NOT NULL,
//   item_description VARCHAR(200) NOT NULL,
//   price MONEY DEFAULT 0,
//   available BOOLEAN DEFAULT TRUE,
//   PRIMARY KEY (item_id),
//   CONSTRAINT fk_customer
//     FOREIGN KEY (seller_id)
//     REFERENCES customers(customer_id)
// );
const db = require('../db/connect');

class Item {
  constructor(data) {
    this.itemId = data.item_id;
    this.sellerId = data.seller_id;
    this.itemName = data.item_name;
    this.itemDescription = data.item_description;
    this.price = data.price;
    this.available = data.available;
  }

  static async index(req, res) {
    try {
      const items = await db.query('SELECT * FROM items');
      return items.rows.map(i => new Item(i));
    } catch (error) {
      throw new Error('No items exist');
    }
  }
}

module.exports = Item;