const address = require("../Models/addressSchema")
const User = require("../Models/crudSchema")
module.exports.getById = async (req, res) => {

    try {
        const user = await address.find({ userId: req.params.id })
        if (!user) {
            res.status(400).send("Invalid ID");
        }
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

module.exports.postAddresses = async (req, res) => {
    const { addresses } = req.body;
    try {
        const userData = await User.findOne({ _id: req.body.userId });
        if (!userData) {
            res.status(400).send("Data is not exist");
        }

        const addressData = await address.findOne({ userId: req.body.userId })
        if (addressData) {
            const updateAddresses = await address.updateOne( { $push: { addresses: { $each: addresses } } })
            res.status(200).json(updateAddresses)
        } else {
            const userAddressess = await address.create({ userId: userData._id, addresses });
            res.status(200).json(userAddressess)
        }

    } catch (err) {
        res.status(400).json({ error: err })
    }
}

module.exports.letlookupCheck = async (req, res) => {
    console.log('pileline');
    try {
        const data = await User.aggregate(
            [{
                $lookup: {
                    from: "addresses",
                    let: { userId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr:{$eq:['$userId', '$$userId']}},
                       } 
                    ],
                    as: "completeDetails"
                }
            }
            ]
        )
        res.status(200).send({
            success: true,
            message: "User data retrieved successfully",
            data: {
            data
            }
        });
    } catch (err) {
        console.log('Error performing lookup:', err);
        res.status(400).send({ error: err })
        throw err
    }
}

