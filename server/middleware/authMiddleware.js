const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; //1 index beacause token are in form "Bearer lsdnalksndl" so we have to only extract lsdnalksndl , hence [1]

  if (!token) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

const verifyRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).json({ error: "Access Denied" });
    }
  };
};

module.exports = { protect, verifyRole };
