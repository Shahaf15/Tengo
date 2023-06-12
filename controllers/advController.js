import Adv from "../models/Adv.js"
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError, UnauthenticatedError } from '../errors/index.js'
import checkPermissions from "../utils/checkPermissions.js"
import mongoose from "mongoose"
import moment from 'moment'

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
    const { status, foodType, sort, search } = req.query
    const queryObject = {
        createdBy: req.user.userId
    }

    if (status && status !== 'all') {
        queryObject.status = status
    }
    if (foodType && foodType !== 'all') {
        queryObject.foodType = foodType
    }
    if (search) {
        queryObject.title = { $regex: search, $options: 'i' }
    }

    let result = Adv.find(queryObject)

    if (sort === 'latest') {
        result = result.sort('-createdAt')
    }

    if (sort === 'oldest') {
        result = result.sort('createdAt')
    }

    if (sort === 'a-z') {
        result = result.sort('title')
    }

    if (sort === 'z-a') {
        result = result.sort('-title')
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

    const advs = await result

    const totalAdvs = await Adv.countDocuments(queryObject)
    const numOfPages = Math.ceil(totalAdvs / limit)

    res.status(StatusCodes.OK).json({ advs, totalAdvs, numOfPages })
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

    res.status(StatusCodes.OK).json({ deletedAdv, msg: 'Success! Advertise removed' })
}


const showStats = async (req, res) => {
    let stats = await Adv.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
    ])

    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr
        acc[title] = count
        return acc
    }, {})

    const defaultStats = {
        Open: stats.Open || 0,
        Close: stats.Close || 0
    }
    let monthlyApplications = await Adv.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: {
                _id: {
                    year: {
                        $year: '$createdAt',
                    },
                    month: {
                        $month: '$createdAt',
                    }
                },
                count: { $sum: 1 }
            },
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 6 },
    ])
    monthlyApplications = monthlyApplications.map((item) => {
        const { _id: { year, month }, count } = item
        const date = moment().month(month - 1).year(year).format('MMM Y')
        return { date, count }
    }).reverse()

    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}

export { createAdv, deleteAdv, getAdvs, updateAdv, showStats }
