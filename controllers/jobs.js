const Job = require('../models/Job');

const index = async (req, res) => {
  try {
    const jobs = await Job.index();
    res.status(200).send({data: jobs});
    console.log(jobs);
  } catch (error) {
    res.status(500).send({error: error.message})
  }
}

module.exports = {
  index
}