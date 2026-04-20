import jwt from "jsonwebtoken";

export default (roles = []) => {
  return (req, res, next) => {

    let token = req.cookies.token || req.headers.authorization;

    // If token came in Authorization header as "Bearer <token>", strip the prefix
    if (token && typeof token === "string" && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

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