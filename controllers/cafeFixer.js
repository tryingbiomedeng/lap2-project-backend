const Fixer = require('../models/cafeFixer')
const Account = require('../models/cafeAccount')

// model/DB -> controller -> router -> app -> localhost:3000/countries

async function index(req, res) {
  try {
        const fixers = await Fixer.getAll()
        res.status(200).json(fixers)
  } catch (err) {
        res.status(500).json({ error: err.message })
  }
}

async function show(req, res) {
  try {
        const fixerId = req.params.id
        const fixer = await Fixer.findById(fixerId)
        res.status(200).json(fixer)
  } catch (err) {
        res.status(404).json({ error: err.message })
  }
}

async function create(req, res) {
  const { user_name, bio, experience } = req.body;
  console.log("line 27", user_name, bio, experience)

  try {
    const account = await Account.findByUserName(user_name);
    if (!account) {
      return res.status(404).json({ message: 'User not found' });
    }

    data = {
      account_id: account.account_id,
      bio: bio,
      experience: experience,
    };
    
    console.log("line 36", data)
    
    const newFixer = await Fixer.create(data);

    res.status(201).json(newFixer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating fixer' });
  }
}
  
async function update(req, res) {
    const fixerId = req.params.id
    console.log(fixerId)
    const updates = req.body
    console.log(updates)
  
    try {
      const updatedFixer = await Fixer.update(fixerId, updates);
  
      res.json(updatedFixer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating fixer profile' });
    }
  }

async function destroy(req, res) {
    try {
        const fixerId = req.params.id
        const fixerToDelete = await Fixer.findById(fixerId)
        await fixerToDelete.destroy()
        res.sendStatus(204)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
}