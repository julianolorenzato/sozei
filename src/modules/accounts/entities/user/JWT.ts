import { sign, verify } from 'jsonwebtoken'

import { auth } from '../../../../shared/config/auth'
import { Either, left, right } from '../../../../shared/logic/Either'

import { InvalidJWTTokenError } from '../../errors/InvalidJWTTokenError'
import { User } from './User'

interface JWTData {
	userId: string
	token: string
}

export class JWT {
	public readonly userId: string
	public readonly token: string

	private constructor({ userId, token }: JWTData) {
		this.userId = userId
		this.token = token
	}

	static signUser(user: User): JWT {
		const token = sign({}, auth.secretKey, {
			subject: user.id,
			expiresIn: auth.expiresIn
		})

		const jwt = new JWT({ userId: user.id, token })

		return jwt
	}
}
