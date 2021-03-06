const request = require('request');

exports.create_image = (search,page=1) => { 
  return new Promise((resolve,reject) => {
      
    let options = {
        url: `https://api.imgur.com/3/gallery/search/${page}?q=${search}`,
        headers: { Authorization: 'Client-ID 01d5eeb677f0f57' },
        json: true,
      };
    
     let getPic = (err,res,body)=>{
       
       if(err||res.statusCode!==200) { reject(err);}   //reject
       
       let images = body.data.filter(img =>{
         
         if(!img.is_album) return img;})
         .map(img => {
           return {
              url: img.link,
              title: img.title,
              'page url': `https://imgur.com/${img.id}`
           };
         });
       
       resolve(images);     //resolve
     };
    
     return request(options,getPic);
    
 });
}