import jwt from 'jsonwebtoken';

class Token {
	/** @method createToken
	 * used to create a JWT token
	 * @param payload
	 * @returns string
	 */
	static createToken(payload: string | object | Buffer, async = false): string | Promise<string> {
		return async ? Promise.resolve(jwt.sign(payload, process.env.JWT_KEY!)) : jwt.sign(payload, process.env.JWT_KEY!);
	}

	/** @method verifyToken
	 * used to verify a JWT token, check whether its valid or not
	 * @param {token: string}
	 * @returns string | object | null based on the token passed
	 */
	static verifyToken(token: string) {
		try {
			const result = jwt.verify(token, process.env.JWT_KEY!);
			return result;
		} catch (err) {
			console.log(err);
			return null;
		}
	}
}

export { Token };
