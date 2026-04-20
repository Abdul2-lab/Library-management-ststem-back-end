import jwt from "jsonwebtoken";

export default (roles = []) => {
  return (req, res, next) => {

    const token = req.cookies.token || req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "❌ No token found" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // role check
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "❌ Access Denied (Admin Only)" });
      }

      next();
    } catch (err) {
      res.status(401).json({ message: "❌ Invalid Token" });
    }
  };
};