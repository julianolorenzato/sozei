import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { auth } from '../../../config/auth'

export async function ensureAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const token = req.headers.authorization

	try {
		if (!token) {
			throw new Error('Token missing')
		}

		const decodedToken = verify(token, auth.secretKey)

		req.body.userId = decodedToken.sub

		return next()
	} catch (e) {
		console.log(e)
		res.status(401).json({ error: e.message })
	}
}
