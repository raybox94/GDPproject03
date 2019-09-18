const _ = require('lodash');
var Codewordset = require('../model/model.codewordset');
multer = require('multer')


let addcodewordset = (req, res) => {
    
    var body = _.pick(req.body,['codewordSetName', 'codewords']);
    console.log(req.body)
    var codewordset = new Codewordset({
        codewordSetName: body.codewordSetName,
        createdBy: req.session.email,
        codewords: body.codewords
    });
    codewordset.save().then((codes) => {
        return res.json({ code: 200, data: codes });
    }).catch((e) => {
        console.log(e);
        return res.json({ code: 400, message: e });
    })
}
module.exports.addcodewordset = addcodewordset;

let upadatecodewordset = (req, res) => {
    
    var body = _.pick(req.body,['id','oldCodewordSetName','newCodewordSetName', 'codewords']);
  
    console.log(req.body)
    console.log('**********update codewordset*******')
    console.log(body)
    if(body.codewords.length == 0){

        Codewordset.findOne({'codewordSetName':body.newCodewordSetName}, (error, codewordSet) =>{
            if(codewordSet){
                return res.json({ code: 404, message: 'Codeword set exists' });
            }else{
                Codewordset.updateOne({'codewordSetName':body.oldCodewordSetName},
                    {$set:{
                        codewordSetName: body.newCodewordSetName
                    }
                }, (error, updatedCodewordSet)=>{
                    if(error){

                        return res.json({ code: 400, message: e });
                    }
                    console.log(updatedCodewordSet)
                    return res.json({ code: 200, message: 'Codeword set updated' });
                }) 
            }
        }
        )
          
    }else{
        Codewordset.updateOne({'codewordSetName':body.oldCodewordSetName},
            {$set:{
                codewordSetName: body.newCodewordSetName,
                codewords: body.codewords
            }
        }, (error, updatedCodewordSet)=>{
            if(error){
                return res.json({ code: 400, message: e });
            }
            console.log(updatedCodewordSet)
            return res.json({ code: 200, message: 'Codeword set updated' });
        }) 
    }
 
}
module.exports.upadatecodewordset = upadatecodewordset;