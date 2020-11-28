import Public from '@public'
import { Application } from 'express'

export default [Public] as Module[]

export type Module = (app: Application) => void
