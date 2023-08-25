const Job = require('../../../models/Job');
const db = require('../../../db/connect');

describe('Job', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('class', () => {
    it('exists', () => {
      expect(Job).toBeDefined();
    })

    it('should be an instance of Job', () => {
      const data = { job_id: 1 }
      const job = new Job(data);
      expect(job).toBeInstanceOf(Job);
    })

    it('should contain the correct values', () => {
      const data = { job_id: 1, customer_id: 2, job_name: "Headphones", job_description: "Wire is broken", post_date: '2023-08-25', available: true, completed: false }
      const job = new Job(data);

      expect(job.job_id).toBe(1);
      expect(job.customer_id).toBe(2);
      expect(job.job_name).toBe('Headphones');
      expect(job.job_description).toBe('Wire is broken');
      expect(job.post_date).toBe('2023-08-25');
      expect(job.available).toBe(true);
      expect(job.completed).toBe(false)
    })
  })

  describe('index', () => {
    it('resolves with Jobs when successful', async () => {
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({
          rows: [{job_name: 'Toaster Fix'}, {job_name: 'Microwave Fix'}]
        })

      const jobs = await Job.index();
      expect(jobs).toHaveLength(2);
    })

    it('should throw an error on db query error', async () => {
      jest.spyOn(db, 'query').mockRejectedValue(new Error())

      try {
        await Job.index()
      } catch (error) {
        expect(error).toBeDefined()
        expect(error.message).toBe("No jobs exist")
      }
    })
  })

  describe('showById', () => {
    it('resolves with a job on successful db query', async () => {
      let jobData = { job_id: 1, customer_id: 2}

      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [jobData] })

      const result = await Job.showById(1)
      expect(result).toBeInstanceOf(Job)
      expect(result.job_id).toBe(1)
      expect(result.customer_id).toBe(2)
    })

    it('should throw an error on db query error', async () => {
      jest.spyOn(db, 'query').mockRejectedValue()

      try {
        await Job.showById(10)
      } catch (error) {
        expect(error).toBeTruthy()
        expect(error.message).toBe('Job not found.')
      }
    })
  })

  describe('create', () => {
    it('resolves with an job on successful db query', async () => {
      let jobData = { customer_id: 2, job_name: 'Plate fix', job_description: 'Plastic plate fix'}
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({rows: [{...jobData, job_id: 1, available: true, completed: false, post_date: '2023-08-24'}]})

      const result = await Job.create(jobData)
      expect(result).toHaveProperty('job_id')
      expect(result).toHaveProperty('customer_id')
      expect(result).toHaveProperty('job_name')
      expect(result).toHaveProperty('job_description')
      expect(result).toHaveProperty('completed')
      expect(result).toHaveProperty('available')
      expect(result).toHaveProperty('post_date')
    })

    it('should throw an error on db query error', async () => {
      jest.spyOn(db, 'query').mockRejectedValue(new Error())

      try {
        await Job.create({})
      } catch (error) {
        expect(error).toBeTruthy()
        expect(error.message).toBe('Error creating job.')
      }
    })
  })
})