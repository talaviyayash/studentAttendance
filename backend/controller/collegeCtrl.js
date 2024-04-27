import College from '../models/collegeModel.js'


// Create College
const createCollege = async (req, res) => {
    const { description ,name, email} = req?.body
    if(![description ,name, email].every((val)=>val)){
        return res.status(422).send({
            success : false, 
            "error" : "send all parameter",
        "message": "send all parameter that needed.",

          });
    }
  const create = await College.create({
    name,
    email,
    description,
  });
  if(create){
      return res.status(201).send({
        success : true, 
        "message": "College is created",
      });
  }
  return res.status(500).send({
    success : false, 
    "error":"Internal Server Error",    
    "message":"No message available",
  });
}


export  {createCollege}