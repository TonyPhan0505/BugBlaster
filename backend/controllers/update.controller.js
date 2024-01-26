///////////////////////////// Import dependencies ///////////////////////////////
const Update = require('../models/update.model');
const Bug = require('../models/bug.model');
////////////////////////////////////////////////////////////////////////////////

//////////////////////////// Callbacks //////////////////////////////
exports.getBulk = (req, res) => {
    const bugId = req.body.bugId;
    Update.find({
        bugId: bugId
    }).then(
        (updates) => {
            return res.status(200).json({ success: true, updates: updates, message: `Successfully fetched updates for bug ${bugId} from database.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to fetch updates for bug ${bugId} from database. ${err}.` });
        }
    );
};

exports.create = (req, res) => {
    const update = req.body.update;
    const newUpdate = new Update({
        id: update.id,
        datetime: update.datetime,
        details: update.details,
        location: update.location,
        bugId: update.bugId,
        teamId: update.teamId
    });
    newUpdate.save().then(
        async (update) => {
            const bug = await Bug.findOne({ id: update.bugId });
            bug.updates.unshift(update.id);
            await bug.save();
            return res.status(200).json({ success: true, update: update, message: `Successfully created update ${update.id}.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to create update ${update.id}. ${err}.` });
        }
    );
};

exports.update = (req, res) => {
    const updateId = req.body.updateId;
    const details = req.body.details;
    const location = req.body.location;
    Update.updateOne({ id: updateId }, {
        details: details,
        location: location
    }).then(
        async () => {
            const updatedUpdate = await Update.findOne({ id: updateId });
            return res.status(200).json({ success: true, update: updatedUpdate, message: `Successfully updated update ${updatedUpdate.id}.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to update update ${updateId}. ${err}.` });
        }
    );
};

exports.delete = (req, res) => {
    const updateId = req.body.updateId;
    Update.deleteOne({
        id: updateId
    }).then(
        async () => {
            const update = await Update.findOne({ id: updateId });
            const bug = await Bug.findOne({ id: update.bugId });
            bug.updates = bug.updates.filter((id) => { return id !== updateId });
            await bug.save();
            return res.status(200).json({ success: true, message: `Successfully deleted update ${updateId}.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to delete update ${updateId}. ${err}.` });
        }
    );
};
////////////////////////////////////////////////////////////////////