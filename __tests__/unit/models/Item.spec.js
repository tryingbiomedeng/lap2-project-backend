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

      expect(item.item_id).toBe(1);
      expect(item.seller_id).toBe(2);
      expect(item.item_name).toBe('Headphones');
      expect(item.item_description).toBe('Cool wired headphones');
      expect(item.price).toBe(10.0);
      expect(item.available).toBe(true);
    })
  })

  describe('index', () => {
    it('resolves with Items when successful', async () => {
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({
          rows: [{item_name: 'Toaster'}, {item_name: 'Microwave'}]
        })

      const items = await Item.index();
      expect(items).toHaveLength(2);
    })

    it('should throw an error on db query error', async () => {
      jest.spyOn(db, 'query').mockRejectedValue(new Error())

      try {
        await Item.index()
      } catch (error) {
        expect(error).toBeDefined()
        expect(error.message).toBe("No items exist")
      }
    })
  })

  describe('showById', () => {
    it('resolves with an item on successful db query', async () => {
      let itemData = { item_id: 1, seller_id: 2}

      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [itemData] })

      const result = await Item.showById(1)
      expect(result).toBeInstanceOf(Item)
      expect(result.item_id).toBe(1)
      expect(result.seller_id).toBe(2)
    })

    it('should throw an error on db query error', async () => {
      jest.spyOn(db, 'query').mockRejectedValue()

      try {
        await Item.showById(10)
      } catch (error) {
        expect(error).toBeTruthy()
        expect(error.message).toBe('Item not found.')
      }
    })
  })

  describe('create', () => {
    it('resolves with an an item on successful db query', async () => {
      let itemData = { seller_id: 2, item_name: 'Plate', item_description: 'Plastic plate', price: 5.0}
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({rows: [{...itemData, item_id: 1, available: true}]})

      const result = await Item.create(itemData)
      expect(result).toHaveProperty('item_id')
      expect(result).toHaveProperty('seller_id')
      expect(result).toHaveProperty('item_name')
      expect(result).toHaveProperty('item_description')
      expect(result).toHaveProperty('price')
      expect(result).toHaveProperty('available')
    })
  })
})