
import { validationResult } from "express-validator"

const validate = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        res.json(errors)
    }
    next()
}

export default validate







