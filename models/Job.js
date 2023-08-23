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
}

module.exports = Job;