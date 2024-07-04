import express from 'express'
import teacherRouter from './teacher.js'

const router=express.Router()

router.use('/teacher',teacherRouter)
export default router;