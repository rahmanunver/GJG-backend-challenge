class HttpError extends Error {
	//Model to use as Error Handler.
	constructor(message, errorCode) {
		super(message); // Add a "message" property.
		this.code = errorCode; // Add a "code" property.
	}
}

module.exports = HttpError;
