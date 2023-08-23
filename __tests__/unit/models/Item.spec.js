const Item = require('../../../models/Item');
const db = require('../../../db/connect');

describe('Item', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('class', () => {
    it('exists', () => {
      expect(Item).toBeDefined();
    })

    it('should be an instance of Item', () => {
      const data = { item_id: 1 }
      const item = new Item(data);
      expect(item).toBeInstanceOf(Item);
    })

    it('should contain the correct values', () => {
      const data = { item_id: 1, seller_id: 2, item_name: "Headphones", item_description: "Cool wired headphones", price: 10.0, available: true }
      const item = new Item(data);
      console.log(item);
      expect(item.itemId).toBe(1);
      expect(item.sellerId).toBe(2);
      expect(item.itemName).toBe('Headphones');
      expect(item.itemDescription).toBe('Cool wired headphones');
      expect(item.price).toBe(10.0);
      expect(item.available).toBe(true);
    })
  })
})