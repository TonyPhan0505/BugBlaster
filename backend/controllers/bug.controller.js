///////////////////////////// Import dependencies ///////////////////////////////
const Bug = require('../models/bug.model');
////////////////////////////////////////////////////////////////////////////////

//////////////////////////// Callbacks //////////////////////////////
exports.getBulk = (req, res) => {
    const projectName = req.body.projectName;
    Bug.find({ projectName: projectName }).sort({ _id: -1 }).exec().then(
        (bugs) => {
            return res.status(200).json({ success: true, bugs: bugs, message: "Successfully fetched bugs." });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to fetch bugs from database. ${err}.` });
        }
    );
};

exports.create = (req, res) => {
    const bug = req.body.bug;
    const newBug = new Bug({
        id: bug.id,
        datetime: bug.datetime,
        briefDescription: bug.briefDescription,
        detailedDescription: bug.detailedDescription,
        assignees: bug.assignees,
        projectName: bug.projectName
    });
    newBug.save().then(
        (bug) => {
            return res.status(200).json({ success: true, bug: bug, message: "Successfully created a new bug." });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to create a new bug. ${err}.` });
        }
    );
};

exports.update = (req, res) => {
    const bug = req.body.bug;
    Bug.updateOne({ id: bug.id }, {
        briefDescription: bug.briefDescription,
        detailedDescription: bug.detailedDescription,
        assignees: bug.assignees
    }).then(
        async () => {
            const updatedBug = await Bug.findOne({ id: bug.id });
            if (bug.solution && bug.solution.length > 0) {
                updatedBug.solution = bug.solution;
                updatedBug.fixed = true;
                await updatedBug.save();
            } else if (!bug.solution && updatedBug.fixed) {
                await Bug.updateOne({ id: bug.id }, {
                    $unset: { ["solution"]: 1 }
                });
                updatedBug.fixed = false;
                await updatedBug.save();
            }
            return res.status(200).json({ success: true, bug: updatedBug, message: `Successfully update bug ${updatedBug.id}.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to update bug ${bug.id}. ${err}.` });
        }
    );
};

exports.delete = (req, res) => {
    const bugId = req.body.bugId;
    Bug.deleteOne({ id: bugId }).then(
        () => {
            return res.status(200).json({ success: true, message: `Successfully deleted bug ${bugId}.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to delete bug ${bugId}. ${err}.` });
        }
    );
};
////////////////////////////////////////////////////////////////////
