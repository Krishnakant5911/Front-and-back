class ApiError extends Error {
  constructor(
      message = "something went wrong",
     statusCode,
      errors = [],
    statck = "",
){
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.errors = errors;
    this .success = false;
    this.message = message;
  }
}

export default ApiError; 