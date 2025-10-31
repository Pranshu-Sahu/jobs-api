const jwt=require('jsonwebtoken')
const generateToken = ({id,email})=>{
const token=jwt.sign({id,email},process.env.JWT_SECRET)
return token
}

module.exports=generateToken