const Account = require('../../../models/cafeAccount')
const db = require('../../../db/connect')

describe('Account', () => {
  beforeEach(() => jest.clearAllMocks())
  describe('class', () => {
    it('exists', () => {
      expect(Account).toBeDefined()
    })
    it('should be an instance of an Account', () => {
      const accountData = {
        account_id: 1,
        email: 'test@example.com',
        user_name: 'testuser',
        user_password: 'password123',
      }
      const account = new Account(accountData)
      expect(account).toBeInstanceOf(Account)
    })
  })

  describe('getAll', () => {
    it('resolves with accounts on successful db query', async () => {
      const mockResponse = {
        rows: [
          {
            account_id: 1,
            email: 'test1@example.com',
            user_name: 'user1',
            user_password: 'password1',
          },
          {
            account_id: 2,
            email: 'test2@example.com',
            user_name: 'user2',
            user_password: 'password2',
          },
        ],
      }
      jest.spyOn(db, 'query').mockResolvedValueOnce(mockResponse)
      const accounts = await Account.getAll()
      expect(accounts).toHaveLength(2)
    })
    it('should throw an Error on empty result', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] })
      try {
        await Account.getAll()
      } catch (err) {
        expect(err).toBeDefined()
        expect(err.message).toBe('No accounts available')
      }
    })
    it('should throw an Error on db query error', async () => {
      jest.spyOn(db, 'query').mockRejectedValueOnce(new Error('oh no'))
      try {
        await Account.getAll()
      } catch (err) {
        expect(err).toBeDefined()
        expect(err.message).toBe('oh no')
      }
    })
  })

  describe('findById', () => {
    it('resolves with account on successful db query', async () => {
      const mockResponse = {
        rows: [
          {
            account_id: 1,
            email: 'test@example.com',
            user_name: 'testuser',
            user_password: 'password123',
          },
        ],
      }
      jest.spyOn(db, 'query').mockResolvedValueOnce(mockResponse)
      const account = await Account.findById(1)
      expect(account).toBeInstanceOf(Account)
    })
    it('should throw an Error when account not found', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] })
      try {
        await Account.findById(1)
      } catch (err) {
        expect(err).toBeDefined()
        expect(err.message).toBe('Unable to locate account')
      }
    })
    it('should throw an Error on db query error', async () => {
      jest.spyOn(db, 'query').mockRejectedValueOnce(new Error('not found'))
      try {
        await Account.findById(1)
      } catch (err) {
        expect(err).toBeDefined()
        expect(err.message).toBe('not found')
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
        email: 'test@example.com',
        user_name: 'testuser',
        user_password: 'password123'
      }
      const account = await Account.create(data)
      expect(account).toBeInstanceOf(Account)
      expect(account.account_id).toBe(1)
    })
    it('throws error if data is invalid', async () => {
      const invalidData = {
        email: 'test@example.com'
      }
      await expect(Account.create(invalidData))
        .rejects.toThrow('Invalid user data.')
    })
  })

  describe('findByUserName', () => {
    it('resolves with account on successful db query', async () => {
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({
          rows: [{account_id: 1, email: 'test@example.com'}]
        })
      const account = await Account.findByUserName('testuser')
      expect(account).toEqual({account_id: 1, email: 'test@example.com'})
    })
  })
})
