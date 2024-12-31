export const errorMiddleware = (error, req, res, next) => {
  try {
    console.log(error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
      statusCode: error.statusCode || 500,
    });
  } catch (error) {
    console.log(error.message);
  }
};
