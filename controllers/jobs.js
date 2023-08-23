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

const showById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const job = await Job.showById(id);
    res.status(200).json(job);
  } catch (error) {
    res.status(404).send({error: error.message})
  }
}

module.exports = {
  index,
  showById
}