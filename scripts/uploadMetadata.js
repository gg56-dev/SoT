//Imports
var cloudinary = require('cloudinary').v2;
let json = require('../data/metadata.json');
var fs = require('fs');
var path = require('path')
let secret = require('../secret')

//Configuring cloudinary
cloudinary.config({ 
    cloud_name: secret.cloudinary_project_name, 
    api_key: secret.cloudinary_api_key, 
    api_secret: secret.cloudinary_api_secret,
    secure: true
});

//Main code 

var data = {}
//Running the loop to the length of the metadata.json file
for(var i = 0; i< json.length; i++){

    var UUID = json[i].attributes[3].value;
    data = {};
    var attributes = []
    for(var j = 0; j< json[i].attributes.length-1; j++){
        attributes.push(json[i].attributes[j])
    }
    var obj = {"attributes": attributes,  "description": json[i].description, "image": json[i].image, "name": json[i].name};
    data = obj
    var filepath = `metadataFiles/${UUID}.json`;
    var url = createAndUploadFile(filepath, data, UUID, function(url){
        console.log("Metadata link: " +url)
    });
    
}

//Create and upload metadata file here
async function createAndUploadFile(filepath, data, UUID, callback){

    await createMetadataFile(filepath, JSON.stringify(data), async (err, result) => {
        if (err)
            throw err
    });
    var url = await uploadMetadataFile(filepath, UUID);
    callback(url);

}

//Create the metadata file here
async function createMetadataFile(filepath, data, callback){

    await fs.writeFile (filepath, data, function(err) {
        if (err) throw err;
        console.log("file " + filepath + " created!");

        }
    );
    callback();

}

//Uploading metadata file to cloudinary
async function uploadMetadataFile(filepath, UUID){
    var resultJSON = await cloudinary.uploader.upload(filepath, {resource_type: "raw", public_id: `${UUID}` });
    return resultJSON.secure_url;
}