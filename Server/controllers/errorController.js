module.exports = (error,req,res,next)=>{
    error.statusCode = error.statusCode || 500
    console.log(error.message);
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        stac : error.stack
    });
}
