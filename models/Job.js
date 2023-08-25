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
    try {
      const response = await db.query('SELECT * FROM jobs WHERE job_id = $1', [id]);
      return new Job(response.rows[0])
    } catch (error) {
      throw new Error('Job not found.');
    }
  }

  static async create(data) {
    try {
      console.log(data.customer_id, data.job_name, data.job_description);
      const response = await db.query("INSERT INTO jobs (customer_id, job_name, job_description) VALUES ($1, $2, $3) RETURNING *",
      [data.customer_id, data.job_name, data.job_description]);
      const job = new Job(response.rows[0]);
      console.log(job);

      // await db.query('UPDATE customers SET active_requests = active_requests + 1 WHERE customer_id = $1', [data.customer_id]);

      return job;

    } catch (error) {
      throw new Error('Error creating job.');
    }
  }

  async update(data) {
    const response = await db.query("UPDATE jobs SET job_name = $1, job_description = $2, available = $3, completed = $4 WHERE job_id = $5 RETURNING *", [data.job_name, data.job_description, data.available, data.completed, this.job_id]);

    if (response.rows.length != 1) {
      throw new Error("Unable to update job.");
    }

    return new Job(response.rows[0]);
  }

  async destroy() {
    const response = await db.query("DELETE FROM jobs WHERE job_id = $1 RETURNING *", [this.job_id]);
    if (response.rows.length != 1) {
      throw new Error("Unable to delete job.");
    }
    await db.query('UPDATE customers SET active_requests = active_requests + 1 WHERE customer_id = $1', [this.customer_id])
    return new Job(response.rows[0]);
  }
}

module.exports = Job;