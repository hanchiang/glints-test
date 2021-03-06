const { ObjectID } = require('mongodb');
const slug = require('slug');

const db = require('../db');
const formatReadableData = require('../utils/formatReadableData');
const sendEmail = require('../utils/mail');


exports.getStores = async (req, res) => {
  const stores = await db.get().collection('stores').find({}).toArray();
  res.json(formatReadableData(stores));
}

exports.getUserCollection = async (req, res) => {
  const user = await db.get().collection('users').findOne({ _id: req.sessionID });
  const { referrer } = user;

  const idToMatch = referrer ? referrer : req.sessionID;
  const results = await db.get().collection('users').aggregate([
    { $match: { _id: idToMatch } },
    { $unwind: { path: '$collections' }},
    { $unwind: { path: '$collections.stores' }},
    { $lookup: 
      {
        from: 'stores',
        localField: 'collections.stores',
        foreignField: '_id',
        as: 'collections.storeInfo'
      }
    },
    { $project:
      {
        '_id': 1,
        'name': 1,
        'collections._id': 1,
        'collections.name': 1,
        'collections.slug': 1,
        'collections.storeInfo._id': 1,
        'collections.storeInfo.name': 1,
        'collections.storeInfo.slug': 1
      }
    },
    { $unwind: {
      path: '$collections.storeInfo'
    }},
    { $group: {
        _id: '$collections._id',
        name: { $first: '$collections.name' },
        slug: { $first: '$collections.slug' },
        stores: { $push: '$collections.storeInfo' }
      }
    }
  ])
  .toArray();
  res.json({ id: req.sessionID, referrer: user.referrer, collections: results });
}

// Create and add to collection, instead of just creating collection.
// Because it breaks the getCollection() pipeline and wont return empty collections.
exports.createCollection = async (req, res) => {
  if (!req.body.store || !req.body.name) {
    throw new Error('Method signatures don\'t match')
  }

  const user = await db.get().collection('users').findOne({ _id: req.sessionID });
  const { referrer } = user;
  const idToMatch = referrer ? referrer : req.sessionID;

  let colSlug = slug(req.body.name);
  let slugRegex = new RegExp(`${colSlug}(-\d+)?`)
  const sameSlugs = user.collections
    .map(col => col.slug.match(slugRegex))
    .filter(item => item != null);

  if (sameSlugs.length > 0) {
    colSlug = colSlug + '-' + (sameSlugs.length + 1);
  }

  const result = await db.get().collection('users').findOneAndUpdate(
    { _id: idToMatch },
    {
      $push: {
        collections: {
          _id: ObjectID(),
          name: req.body.name,
          slug: colSlug,
          stores: [ObjectID(req.body.store)]
        }
      }
    },
    { returnOriginal: false }
  );

  if (result.ok === 1) {
    res.json({ 
      message: 'Successfully created collection', 
      data: result.value.collections[result.value.collections.length - 1]
    });
  } else {
    throw new Error('Unable to create collection');
  }
}

// add(store) | delete(store) | update(collection name)
// TODO: Need to delete collection if there are no more stores in it!
exports.updateCollection = async (req, res) => {
  const user = await db.get().collection('users').findOne({ _id: req.sessionID });
  const { referrer } = user;
  const idToMatch = referrer ? referrer : req.sessionID;

  let operation;
  let update = {};

  if (req.body.operation === 'add') operation = '$push';
  else if (req.body.operation === 'delete') operation = '$pull';
  else if (req.body.operation === 'update') operation = '$set';
  else throw new Error('This operation is not allowed');

  if (operation === '$set') {
    update = { 'collections.$.name': req.body.name };
  } else {
    update = { 'collections.$.stores': ObjectID(req.body.store) };
  }

  const result = await db.get().collection('users').updateOne(
    {
      _id: idToMatch,
      'collections._id': ObjectID(req.body._id)
    },
    { [operation]: update }
  );

  if (result.result.ok === 1) {
    res.json({ message: 'Successfully updated collection' });
  } else {
    throw new Error('Unable to update collection');
  }
}

exports.invite = async(req, res) => {
  const { referrer, email } = req.body;
  const result = await sendEmail({
    referrer,
    to: email
  })
  res.json({ message: `Successfully invited user ${req.sessionID}` });
}