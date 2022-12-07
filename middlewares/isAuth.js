import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  const token = await req.headers.authorization;
  const onlyToken = token.split(" ")[1];
  jwt.verify(onlyToken, process.env.JWT_SECRECT, (err, success) => {
    if (err) {
      return res.status(400).send("Error parsing token");
    } else if (success) {
      next();
    } else {
      return res.status(500).send("something went wrong");
    }
  });
};
