const db = require('../db');


exports.getStores = async (req, res) => {
  const stores = await db.get().collection('stores').find({}).toArray();
  res.json(stores);
}

exports.createCollection = async (req, res) => {
  const result = await db.get().collection('users').updateOne(
    { _id: req.sessionID },
    {
      $push: {
        collections: {
          name: req.body.name,
          stores: []
        }
      }
    }
  );
  console.log(result);
  handleAfterUpdate(result, `Successfully created collection ${req.body.name}!`, 'Unable to create collection')
}

exports.updateCollection = async (req, res) => {
  const result = await db.get().collection('users').updateOne(
    { _id: req.sessionID, 'collections.name': req.body.name },
    { $push: {
      'collections.$.stores': req.body.store
    }}
  );

  handleAfterUpdate(result`Successfully updated collection ${req.body.name}!`, 'Unable to update collection')
}

function handleAfterUpdate(result, successMessage, errorMessage) {
  if (result.result.ok === 1) {
    res.json({ message: successMessage });
  } else {
    throw new Error(errorMessage);
  }
}