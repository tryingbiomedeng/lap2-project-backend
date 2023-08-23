const Job = require('../models/Job');

const index = async (req, res) => {
  try {
    const jobs = await Job.index();
    res.status(200).send({data: jobs});
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

const create = async (req, res) => {
  try {
    const data = req.body;
    const job = await Job.create(data);
    res.status(201).send({data: job});
  } catch (error) {
    res.status(400).send({error: error.message})
  }
}

async function update (req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const job = await Job.showById(id);
    const result = await job.update(data);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({error: error.message})
  }
}

async function destroy(req, res) {
  try {
    const id = parseInt(req.params.id);
    const job = await Job.showById(id);
    const result = await job.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send({error: error.message});
  }
}

module.exports = {
  index,
  showById,
  create,
  update,
  destroy
}