import jwt from "jsonwebtoken";

export const verifyTokenforEmployee = (req, res, next) => {
  const token = req.cookies.employeeToken;

    if (!token) {
    return res.status(401).json({
        message: "Access Denied"
    })}

    try{
    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
} catch (error) {
    return res.status(401).json({
        message: "Invalid Token"
    });
}}