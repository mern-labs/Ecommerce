const isAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access denied" });
  }
};

module.exports = isAdmin;



// const roleMiddle=(...roles)=>{
// return (req,res,next)=>{
//   if(!roles.includes(req.user.role)){
//     return res.status(401).json({
//       message:"Access Denied"
//     })
//   }

//   next()
// }
// }