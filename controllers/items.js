const Item = require('../models/Item');

const index = async (req, res) => {
  try {
    const items = await Item.index();
    res.status(200).send({data: items});
    console.log(items);
  } catch (error) {
    res.status(500).send({error: error.message})
  }
}

const create = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const item = await Item.create(data);
    res.status(201).send({data: item});
  } catch (error) {
    res.status(400).send({error: error.message})
  }
}

module.exports = {
  index,
  create
}