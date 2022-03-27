const uuid = require("uuid");
const crypto = require("crypto");
const ImageKit = require('imagekit')

exports.authImage = (req,res)=>{
    var token = req.query.token || uuid.v4();
    var expire = req.query.expire || parseInt(Date.now() / 1000) + 2400;
    var signature = crypto
    .createHmac("sha1", process.env.privateKeyImageKit)
    .update(token + expire)
    .digest("hex");

     return res.status(200).json({
          token: token,
          expire: expire,
          signature: signature
        });
}

exports.DelImage=async(req,res)=>{
  const file_id = req.query.id;
  var imagekit = new ImageKit({
      publicKey : "public_v2cbx10A3GrjLq/w+Ac9Zyc7Hbk=",
      privateKey : `private_3jUhgoaxr/K94HsoR0PlRJR28MA=`,
      urlEndpoint : "https://ik.imagekit.io/tvkia61xcj2y"
  });
  
  return new Promise(async resolve => {
  imagekit.deleteFile(file_id, function(error, result) {
       res.statusCode = 200
       res.setHeader('Content-Type', 'application/json')
      if(error) res.json(error);
      else res.json({sucessMsg:'deleted successfully..!'})
      resolve()
  });
  })
  
  // return new Promise(async resolve => {
  // imagekit.deleteFile(file_id, function(error, result) {
  //      res.statusCode = 200
  //      res.setHeader('Content-Type', 'application/json')
  //     if(error) res.json(error);
  //     else res.json({sucessMsg:'deleted successfully..!'})
  //     resolve()
  // });
  // })
}