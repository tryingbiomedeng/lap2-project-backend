const Customer = require('../../../models/cafeCustomer')
const db = require('../../../db/connect')

describe('Customer', () => {
  beforeEach(() => jest.clearAllMocks())
  describe('class', () => {
    it('exists', () => {
      expect(Customer).toBeDefined()
    })
    it('should be an instance of an Customer', () => {
      const customerData = {
        customer_id: 1,
        account_id: 1,
        active_requests: 0,
        items_for_sale: 0,
      }
      const customer = new Customer(customerData)
      expect(customer).toBeInstanceOf(Customer)
    })
  })

  describe('getAll', () => {
    it('resolves with all customers on successful db query', async () => {
      const mockResponse = {
        rows: [
          {
            customer_id: 1,
            account_id: 2,
            active_requests: 2,
            items_for_sale: 1,
          },
          {
            customer_id: 2,
            account_id: 1,
            active_requests: 3,
            items_for_sale: 0,
          },
        ],
      }
      jest.spyOn(db, 'query').mockResolvedValueOnce(mockResponse)
      const customers = await Customer.getAll()
      expect(customers).toHaveLength(2)
    })
  })

  describe('findById', () => {
    it('resolves with an customer on successful db query', async () => {
      const mockResponse = {
        rows: [
          {
            customer_id: 1,
            account_id: 1,
            active_requests: 2,
            items_for_sale: 1,
          },
        ],
      }
      jest.spyOn(db, 'query').mockResolvedValueOnce(mockResponse)
      const customer = await Customer.findById(1)
      expect(customer).toBeInstanceOf(Customer)
    })

    it('should throw an Error when customer not found', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] })
      try {
        await Customer.findById(1)
      } catch (err) {
        expect(err).toBeDefined()
        expect(err.message).toBe('Unable to locate customer')
      }
    })
  })

  describe('create', () => {
    it('creates account on successful db query', async () => {
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({
          rows: [{account_id: 1, email: 'test@example.com'}]
        })
      const data = {
        customer_id: 1,
        account_id: 1,
        active_requests: 3,
        items_for_sale: 0,
      }
      const customer = await Customer.create(data)
      expect(customer).toBeInstanceOf(Customer)
      expect(customer.account_id).toBe(1)
    })

    it('throws error if data is invalid', async () => {
      const invalidData = {
        email: 'test@example.com'
      }
      await expect(Customer.create(invalidData))
        .rejects.toThrow('Error creating customer')
    })
  })

  describe('destroy', () => {
    it('deletes a customer and associated jobs on successful db query', async () => {
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({})
      const customer = new Customer({ customer_id: 1 })
      const result = await customer.destroy()
      expect(db.query).toHaveBeenCalledWith('DELETE FROM jobs WHERE customer_id = $1', [1])
      expect(db.query).toHaveBeenCalledWith('DELETE FROM customers WHERE customer_id = $1', [1])
      expect(result).toBe('Customer deleted')
    })
  })
})
 