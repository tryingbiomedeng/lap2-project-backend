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
    it('resolves with all accounts on successful db query', async () => {
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
  })

  describe('findById', () => {
    it('resolves with an account on successful db query', async () => {
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
    it('resolves with an account by username on successful db query', async () => {
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({
          rows: [{account_id: 1, email: 'test@example.com'}]
        })
      const account = await Account.findByUserName('testuser')
      expect(account).toEqual({account_id: 1, email: 'test@example.com'})
    })
  })
})
