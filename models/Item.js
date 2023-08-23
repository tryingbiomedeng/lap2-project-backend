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

  static async showById(id) {
    const response = await db.query('SELECT * FROM items WHERE item_id = $1', [id]);
    if (response.rows.length != 1) {
      throw new Error('Item not found.');
    }
    return new Item(response.rows[0])
  }

  static async create(data) {
    try {
      console.log(data.sellerId, data.itemName, data.itemDescription, data.price);
      const response = await db.query("INSERT INTO items (seller_id, item_name, item_description, price) VALUES ($1, $2, $3, $4) RETURNING *",
      [data.sellerId, data.itemName, data.itemDescription, data.price]);
      const item = new Item(response.rows[0]);
      console.log(item);

      await db.query('UPDATE customers SET items_for_sale = items_for_sale + 1 WHERE customer_id = $1', [data.sellerId])

      return item;

    } catch (error) {
      throw new Error({message: 'Error creating item'});
    }
  }

  async update(data) {
    const response = await db.query("UPDATE items SET item_name = $1, item_description = $2, price = $3, available = $4 WHERE item_id = $5 RETURNING *", [data.itemName, data.itemDescription, data.price, data.available, this.itemId]);

    if (response.rows.length != 1) {
      throw new Error("Unable to update item.");
    }

    return new Item(response.rows[0]);
  }

  async destroy() {
    const response = await db.query("DELETE FROM items WHERE item_id = $1 RETURNING *", [this.itemId]);
    if (response.rows.length != 1) {
      throw new Error("Unable to delete item.");
    }
    await db.query('UPDATE customers SET items_for_sale = items_for_sale + 1 WHERE customer_id = $1', [this.sellerId])
    return new Item(response.rows[0]);
  }
}

module.exports = Item;