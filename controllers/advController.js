import Adv from "../models/Adv.js"
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError, UnauthenticatedError } from '../errors/index.js'
import checkPermissions from "../utils/checkPermissions.js"

const createAdv = async (req, res) => {
    const { title, foodType } = req.body

    if (!title || !foodType) {
        throw new BadRequestError('Please provide all values')
    }
    req.body.createdBy = req.user.userId
    const adv = await Adv.create(req.body)
    res.status(StatusCodes.CREATED).json({ adv })
}

const getAdvs = async (req, res) => {
    const advs = await Adv.find({ createdBy: req.user.userId })
    res.status(StatusCodes.OK).json({ advs, totalAdvs: advs.length, numOfPages: 1 })
}

const updateAdv = async (req, res) => {
    const { id: advId } = req.params
    const { title, foodType } = req.body

    if (!title || !foodType) {
        throw new BadRequestError('Please provide all values')
    }

    const adv = await Adv.findOne({ _id: advId })
    if (!adv) {
        throw new NotFoundError(`No adv with id:${advId}`)
    }

    checkPermissions(req.user, adv.createdBy)

    const updatedAdv = await Adv.findOneAndUpdate({ _id: advId }, req.body, {
        new: true,
        runValidators: true,
    })
    res.status(StatusCodes.OK).json({ updatedAdv })
}

const deleteAdv = async (req, res) => {
    const { id: advId } = req.params

    const adv = await Adv.findOne({ _id: advId })

    if (!adv) {
        throw new NotFoundError(`No adv with id:${advId}`)
    }

    checkPermissions(req.user, adv.createdBy)


    const deletedAdv = await Adv.findOneAndRemove({ _id: advId }, req.body)

    res.status(StatusCodes.OK).json({deletedAdv ,msg: 'Success! Advertise removed' })
}


const showStats = async (req, res) => {
    res.send('show stats')
}

export { createAdv, deleteAdv, getAdvs, updateAdv, showStats }
