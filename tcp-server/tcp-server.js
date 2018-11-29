const 
  net = require('net'),
  decrypt = require('../decrypt/decrypt.js');

module.exports = () =>{

  var server = net.createServer();

  server.on('connection',(socket)=>{
      var remoteAddress = socket.remoteAddress + ":" + socket.remotePort;
      console.log('');
      console.log('Konnektált');

      socket.on('data',(data)=>{
      
        var result = String(data).split(",");

        result.forEach((element)=>{
          Number(element);
        });

        var decrypted = new decrypt('9LKSUR&#5A',118);
        var kod = result;

        console.log('-----------------------------');
        console.log('DATA RECEIVED');
        //console.log(`-->From: ${remoteAddress}`);
        console.log(`-->Buffer: ${data}`);
        console.log(`-->Data: ${result}`);
        console.log(`-->Data type: ${typeof result}`);
        var validData = decrypted.decrypt(kod).split('#');

        console.log(validData[0]);


      });

      socket.on('close',()=>{
        console.log('Socket is closed.');
      });

      socket.on('error',(err)=>{
        console.log(err);
      })

  });

  server.listen(3000,()=>{
      console.log(`Server running on port:3000`);
  })

}