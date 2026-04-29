export default function successResponse(req, res, next) {
  res.success = ({ statusCode, code, message, data }) => {
    res.status(statusCode).json({
      success: true,
      message,
      code,
      data,
    });
  };

  next();
}
