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
    this.item_id = data.item_id;
    this.seller_id = data.seller_id;
    this.item_name = data.item_name;
    this.item_description = data.item_description;
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

  static async create(data) {
    try {
      console.log(data.sellerId, data.itemName, data.itemDescription, data.price);
      const response = await db.query("        INSERT INTO items (seller_id, item_name, item_description, price) VALUES ($1, $2, $3, $4) RETURNING *",
      [data.sellerId, data.itemName, data.itemDescription, data.price]);
      const item = new Item(response.rows[0]);
      console.log(item);

      await db.query('UPDATE customers SET items_for_sale = items_for_sale + 1 WHERE customer_id = $1', [data.seller_id])

      return item;

    } catch (error) {
      throw new Error({message: 'Error creating item'});
    }
  }
}

module.exports = Item;