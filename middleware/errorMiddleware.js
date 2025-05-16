const errorMiddleware = (err,res,req,next)=>{
    try {
      let error= {...error}
      error.message = err.message
console.log(err);
        // Mongoose bad ObjectId
        if(err.name === "CastError"){
            error.message = `Resource not found. Invalid: ${err.path}`;
            error.statusCode = 404;
        }
        // Mongoose duplicate key
        if(err.code === 11000){
            error.message = `Duplicate ${Object.keys(err.keyValue)} entered`;
            error.statusCode = 400;
        }
        // Mongoose validation error
        if(err.name === "ValidationError"){
            const message = Object.values(err.errors).map((val)=>val.message);
            error.message = message;
            error.statusCode = 400;
        }
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
            stack: err.stack
        });

    } catch (error) {
    next();
}
}

export default errorMiddleware;