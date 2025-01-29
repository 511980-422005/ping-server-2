 
const  ping_pong = require('express').Router();
const fetch = require('node-fetch'); 
let resolve=true;
ping_pong.get('/ping', async (req, res) => {
    console.log('Pong Pong Server 2');
  res.send('Pong from Server 2');
  if(resolve==true){
    resolve=true;
  setTimeout(() => { 
    callback();
  }, 300000);
  }
});
 
(async () => {
  resolve=true
   await fetch('https://server.markethealers.com/ping')
     .then((res) => {
       if (res.ok) {
         console.log('Server 1 is responding:', res.status);
       } else {
         console.log('Server 1 responded with an error:', res.status);
          setTimeout(() => {
            callback();
          }, 10000);
       }
     })
     .catch((err) => {
       console.error('Server 1 is not responding:', err.message);
     });
})()




 function callback() {
  resolve=true
 fetch('https://server.markethealers.com/ping')
   .then((res) => {
     if (res.ok) {
       console.log('Server 1 is responding:', res.status);
     } else {
       console.log('Server 1 responded with an error:', res.status);
     }
   })
   .catch((err) => {
     console.error('Server 1 is not responding:', err.message);
   });
}
  
 ping_pong.use((req,res)=>res.send("Hello from server 2"));

 module.exports= ping_pong;