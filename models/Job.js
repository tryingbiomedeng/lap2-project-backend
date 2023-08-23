const db = require('../db/connect');

class Job {
  constructor(data) {
    this.job_id = data.job_id;
    this.customer_id = data.customer_id;
    this.job_name = data.job_name;
    this.job_description = data.job_description;
    this.post_date = data.post_date;
    this.available = data.available;
    this.completed = data.completed;
  }

  static async index(req, res) {
    try {
      const jobs = await db.query('SELECT * FROM jobs');
      return jobs.rows.map(j => new Job(j));
    } catch (error) {
      throw new Error('No jobs exist');
    }
  }

  static async showById(id) {
    const response = await db.query('SELECT * FROM jobs WHERE job_id = $1', [id]);
    if (response.rows.length != 1) {
      throw new Error('Job not found.');
    }
    return new Job(response.rows[0])
  }
}

module.exports = Job;