const User = require('../Models/crudSchema')
const address = require('../Models/addressSchema')
module.exports.getData = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
}

module.exports.postData = async (req, res) => {
    const { name, email, age, phoneNumber, address } = req.body;
    try {
        const user = await User.create({ name, email, age, phoneNumber, address });
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
}

module.exports.patchData = async (req, res) => {
    const { name, email, age, phoneNumber, address } = req.body;
    try {
        const existData = await User.findOne({ email });
        if (!existData) {
            res.status(400).send("Invalid email")
        }
        const updateData = await User.updateOne({ name, age, phoneNumber, address })
        res.status(200).json(updateData)
    } catch (err) {
        res.status(400).json({ msg: err.message })
    }

}

module.exports.deleteData = async (req, res) => {
    const { email } = req.body;
    try {
        const existData = await User.findOne({ email });
        if (!existData) {
            res.status(400).send("Invalid email")
        }
        await User.deleteOne({ email })
        res.status(200).send("Data deleted successfully")
    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
}

module.exports.pagination = async (req, res) => {

    const skip = req.query.limit * (req.query.page - 1);
    try {
        const user = await User.find().skip(skip).limit(req.query.limit)
        res.status(200).send(user)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports.lookupCheck = async (req, res) => {
    console.log('pileline');

    try {
        let pileline = [
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_d',
                    as: 'users'
                }
            }

        ]
        console.log(pileline);

        const result = await address.aggregate(pileline)
        console.log(result);
        res.status(200).send(result)
    } catch (err) {
        console.log('Error performing lookup:', err);
        res.status(400).send({ error: err })
        throw err
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
                                $expr: { $eq: ['$userId', '$$userId'] }
                            },
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

module.exports.matchCheck = async (req, res) => {
    try {
        let pipeline = [
            {
                $match: {
                    age: 22
                }

            },
            {
                $count: "Person"
            }

        ]

        console.log(pipeline)
        const result = await User.aggregate(pipeline)
        res.status(200).json(result)
    } catch (err) {
        console.log('Error performing lookup:', err);
        res.status(400).send({ error: err })
    }
}

module.exports.searching = async (req, res) => {
    const search = req.query.name || "";
    try {
        const user = await User.aggregate([
            {
                $match: {
                    $or:[
                        {
                            'name':{$regex:search}
                        },
                        {
                            'phoneNumber':{$regex:search}
                        },
                        {
                            'email':{$regex:search}
                        }
                    ]
                }
            },
        ])
        res.status(200).json(user)
    } catch (err) {
        res.status(400).send(err.message)
    }
}