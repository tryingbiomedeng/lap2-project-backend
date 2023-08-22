const Item = require('../models/Item');

const index = async (req, res) => {
  try {
    const items = await Item.index();
    res.status(200).send({data: items});
  } catch (error) {
    res.status(500).send({error: error.message})
  }
}

module.exports = {
  index
}