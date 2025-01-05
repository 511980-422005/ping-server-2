 
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3001;

app.get('/ping', async (req, res) => {
    console.log('Pong Pong Server 2');
  res.send('Pong from Server 2');
  setTimeout(()=>{ callback()},5000);
});


(async () => {
   await fetch('https://ping-server-1.onrender.com/ping')
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
})()




 function callback() {
 fetch('https://ping-server-1.onrender.com/ping')
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
  
 app.use((req,res)=>res.send("Hello from server 2"));


app.listen(port, () => {
  console.log(`Server 2 running at  ${port}`);
});
