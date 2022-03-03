const LabTest = require('../models/labTest');


// Get all lab tests
exports.getLabTests = (req, res, next) => {
    LabTest.find()
        .then(labTests => {
            res.status(200).json({
                message: 'Laboratory tests fetched successfully!',
                labTests: labTests
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Fetching lab tests failed!'
            });
        });
}

exports.addNewLabTest = (req, res, next) => {
    const { name, description, price } = req.body;

    const newLabTest = new LabTest({
        name,
        description,
        price
    });

    LabTest.findOne({ name: name }).exec((err, labTest) => {
        if (labTest) {
            res.status(500).json({
                message: 'Laboratory test already exists!'
            });
        } else {
            newLabTest.save()
                .then(result => {
                    res.json({
                        message: 'Laboratory test created successfully!',
                        labTest: {
                            name: result.name,
                            description: result.description,
                            price: result.price
                        }
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        message: 'Laboratory test creation failed!'
                    });
                });
        }    
    });

}

// Get a lab test by id
exports.getLabTestById = (req, res, next) => {
    LabTest.findById(req.params.labTestID)
        .then(labTest => {
            if (labTest) {
                res.json({
                    message: 'Laboratory test fetched successfully!',
                    labTest: labTest
                });
            } else {
                res.status(400).json({
                    message: 'Laboratory test not found!'
                });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Fetching laboratory test failed!' });
        });
}

// Delete a lab test by id
exports.deleteLabTestById = async (req, res, next) => {
    try {
        console.log(`Deleting laboratory test by id: ${req.params.labTestID}`);
        const labTest = await LabTest.findByIdAndDelete(req.params.labTestID);
        if(!labTest) {
            return res.status(404).json({
                error: 'Laboratory test not found!'
            });
        }
        return res.json({
            success: true,
            msg: `Laboratory test deleted successfully!`,
            data: labTest,
        });
    } catch (err) {
        console.log(`Error deleting laboratory test by id`, err);
        res.status(500).json({
            error: err
        });
    }
}

// Update a lab test by id
exports.updateLabTestById = (req, res, next) => {
    const { name, description, price } = req.body;

    LabTest.findById(req.params.labTestID)
        .then(labTest => {
            if (labTest) {
                labTest.name = name;
                labTest.description = description;
                labTest.price = price;

                labTest.save()
                    .then(result => {
                        res.json({
                            message: 'Laboratory test updated successfully!',
                            labTest: {
                                name: result.name,
                                description: result.description,
                                price: result.price
                            }
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: 'Laboratory test update failed!'
                        });
                    });
            } else {
                res.status(400).json({
                    message: 'Laboratory test not found!'
                });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Fetching laboratory test failed!' });
        });
    
}