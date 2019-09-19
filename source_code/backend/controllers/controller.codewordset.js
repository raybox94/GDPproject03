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

let generateReport = (req, res) =>{

    var body = _.pick(req.body,['id','level']);
    console.log('********LEVEL**********')
    console.log(body.level)
    var similarityLevel
    switch(body.level){
        case 0:
            similarityLevel = 0.3
            break;
        case 1:
            similarityLevel = 0.5
            break;
        case 2:
            similarityLevel = 0.7
            break;
        case 3:
            similarityLevel = 0.8
            break;
        case 4:
            similarityLevel = 0.9
            break;
        default:
            similarityLevel = 0.5
    }
    console.log(similarityLevel)
    Codewordset.findOne({_id: body.id}, (error, codewordset)=>{
        if(error){
            return res.json({ code: 400, message: error });
        }

        var codewords = codewordset.codewords
        var result = []
        //console.log(codewords)
        for(var i in codewords){
            var targetCodewords = codewords.filter((item, index)=>{
                if(index != i){
                    return item
                }
            })

            result.push({word: codewords[i], similarity: stringSimilarity.findBestMatch(codewords[i], targetCodewords)})
        }

        var similars = []
        var checkerArray = []
       for(var i in result){

        if(!checker(checkerArray, result[i].word)){
          // console.log(result[i])
           var ratings = result[i].similarity.ratings
           var output = []
           output.push(result[i].word)
           for(var i in ratings){
                if(ratings[i].rating > similarityLevel){
                    output.push(ratings[i].target)
                    checkerArray.push(ratings[i].target)
                    }
                }
           }
           
           similars.push(output)
        
       }
       let final = similars.filter((item)=>{
           if(item.length > 1){
               return item
           }
       })
      // console.log(Array.from(new Set(final.map(JSON.stringify)), JSON.parse))
     
      
     var anagrams = anagramFinder.find(codewords).filter((item)=>{
         if(item.length > 1){
             return item
         }
     })

     var data ={similars: Array.from(new Set(final.map(JSON.stringify)), JSON.parse),
                anagrams: anagrams}
    // console.log('************ANAGRAMS******************')
     //console.log(anagrams)
      return res.json({ code: 200, data: data });
    })
  }

  module.exports.generateReport = generateReport