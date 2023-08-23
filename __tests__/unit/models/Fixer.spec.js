const Fixer = require('../../../models/cafeFixer')
const db = require('../../../db/connect')

describe('Fixer', () => {
  beforeEach(() => jest.clearAllMocks())
  describe('class', () => {
    it('exists', () => {
      expect(Fixer).toBeDefined()
    })
    it('should be an instance of an Fixer', () => {
      const fixerData = {
        fixer_id: 1,
        account_id: 1,
        bio: 'I am an example',
        experience: 'Testing for experince',
        jobs_done: 0,
        rating: 2,
      }
      const fixer = new Fixer(fixerData)
      expect(fixer).toBeInstanceOf(Fixer)
    })
  })

  describe('getAll', () => {
    it('resolves with all fixers on successful db query', async () => {
      const mockResponse = {
        rows: [
          {
            fixer_id: 1,
            account_id: 1,
            bio: 'I am an example',
            experience: 'Testing for experience',
            jobs_done: 0,
            rating: 2,
          },
          {
            fixer_id: 2,
            account_id: 2,
            bio: 'I am an example 2',
            experience: 'Testing for experience 2',
            jobs_done: 2,
            rating: 0,
          },
        ],
      }
      jest.spyOn(db, 'query').mockResolvedValueOnce(mockResponse)
      const fixers = await Fixer.getAll()
      expect(fixers).toHaveLength(2)
    })
  })

  describe('findById', () => {
    it('resolves with an fixer on successful db query', async () => {
      const mockResponse = {
        rows: [
          {
            fixer_id: 1,
            account_id: 1,
            bio: 'I am an example',
            experience: 'Testing for experience',
            jobs_done: 0,
            rating: 2,
          },
        ],
      }
      jest.spyOn(db, 'query').mockResolvedValueOnce(mockResponse)
      const fixer = await Fixer.findById(1)
      expect(fixer).toBeInstanceOf(Fixer)
    })

    it('should throw an Error when fixer not found', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] })
      try {
        await Fixer.findById(1)
      } catch (err) {
        expect(err).toBeDefined()
        expect(err.message).toBe('Unable to locate fixer')
      }
    })
  })

  describe('create', () => {
    it('creates account on successful db query', async () => {
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({
          rows: [{account_id: 1, user_name: 'test example'}]
        })
      const data = {
        fixer_id: 1,
        account_id: 1,
        active_requests: 3,
        items_for_sale: 0,
      }
      const fixer = await Fixer.create(data)
      expect(fixer).toBeInstanceOf(Fixer)
      expect(fixer.account_id).toBe(1)
    })

    it('throws error if data is invalid', async () => {
      const invalidData = {
        email: 'test@example.com'
      }
      await expect(Fixer.create(invalidData))
        .rejects.toThrow('Error creating fixer')
    })
  })

  describe('update', () => {
    it('updates fixer profile and returns updated fixer', async () => {
        const updates = {
          bio: 'new test bio',
          experience: 'new test experience',
        }
    
        jest.spyOn(db, 'query')
          .mockResolvedValueOnce({
            rows: [{
              fixer_id: 1, 
              bio: 'new test bio',
              experience: 'new test experience',
            }]  
          })
    
        const updatedFixer = await Fixer.update(1, updates)
    
        expect(updatedFixer).toBeInstanceOf(Fixer)
        expect(updatedFixer.bio).toBe('new test bio')
        expect(updatedFixer.experience).toBe('new test experience')
    })
      
    it('throws error if fixer cannot be found', async () => {
        const updates = {
          bio: 'new bio' 
        }
    
        jest.spyOn(db, 'query')
          .mockResolvedValueOnce({rows: []})
    
        await expect(Fixer.update(1, updates))
          .rejects.toThrow('Fixer not found') 
    })
  })

  describe('destroy', () => {
    it('deletes a fixer on successful db query', async () => {
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({})
      const fixer = new Fixer({ fixer_id: 1 })
      const result = await fixer.destroy()
      expect(db.query).toHaveBeenCalledWith('DELETE FROM fixers WHERE fixer_id = $1', [1])
      expect(result).toBe('Fixer deleted')
    })
  })
})
 