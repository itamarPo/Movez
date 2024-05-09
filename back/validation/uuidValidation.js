const yup = require('yup');

const uuidSchema = yup.object({
    uuid: yup.string().uuid().required()
});

const uuIDValidation = async (req, res, next) => {
    try {
        await uuidSchema.validate(req.body);
        next();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    uuIDValidation
}