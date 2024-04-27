import Admin from '../models/adminModel.js'


// for generate access and RefreshToken 
const generateAccesssAndRefreshToken = async(_id) => {
    const adminFind = await Admin.findById(_id)
    const accessToken = await adminFind.generateAccessToken()
    const refreshToken = await adminFind.generateRefreshToken()
    adminFind.refreshToken=refreshToken
    adminFind.save({validateBeforeSave: false})
    return { accessToken , refreshToken}
  }

// Create Admin
const createAdmin = async (req, res) => {
    const { password,number ,name, email} = req?.body
    if(![password,number ,name, email].every((val)=>val)){
        return res.status(422).send({
            success : false, 
            "error" : "send all parameter",
        "message": "send all parameter that needed.",

          });
    }
  const exists = await Admin.findOne({email});
  if (exists) {
    return res.status(409).send({
        success : false, 
      error: "email alrady exist",
      "message": "sign up with another email id.",
    });
  }
  const create = await Admin.create({
    name,
    email,
    password,
    number,
  });
  if(create){
      return res.status(201).send({
        success : true, 
        "message": "Users registered successfully.",
      });
  }
  return res.status(500).send({
    success : false, 
    "error":"Internal Server Error",    
    "message":"No message available",
  });
}


// Login Admin
const LoginAdmin = async (req, res) => {
    const {email , password} = req?.body;
    if(![password, email].every((val)=>val)){
        return res.status(422).send({
            success : false, 
            login:false,
            "error" : "send all parameter",
        "message": "send all parameter that needed.",

          });
    }
    const loginAdmin = await Admin.findOne({
      email: req?.body?.email,
    });
  
    if (!loginAdmin) {
        return res.status(409).send({
            success : false, 
            login:false,
          error: "email not found",
          "message": "email is not found.",
        });
    }
    const passwordIsCorrect = await loginAdmin.isPasswordCorrect(req?.body?.password);
    if (!passwordIsCorrect) {
        return res.status(401).send({
            success : false, 
            login:false,
          error: "email not found",
          "message": "email is not found.",
        });
    }

      const { accessToken , refreshToken} = await generateAccesssAndRefreshToken(loginAdmin._id)
        const adminFind = await Admin.findById(loginAdmin._id).select("-password -refreshToken")
        const options={
          httpOnly : true,
          secure : true,
        }
      return res
      .status(401)
      .cookie("accessToken", accessToken ,options )
      .cookie("refreshToken", refreshToken ,options )
      .json({
        success : true, 
        login : true,
        adminInfo : adminFind,
        accessToken,
        refreshToken
      });
  };

export  {createAdmin,LoginAdmin}