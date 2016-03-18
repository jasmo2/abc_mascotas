var publicip = 'http://localhost:3000';

if(process.env.NODE_ENV === 'production'){
    publicip = process.env.PUBLIC_IP;
}
var socket = io.connect(publicip, { 'forceNew': true });

socket.on('messages', function(data) {  
  console.log(data);
  render(data);
});

function render (data) {  
  var html = data.map(function(elem, index) {
    return(`<div>
              <strong>${elem.author}</strong>:
              <em>${elem.text}</em>
            </div>`);
  }).join(" ");

  document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
  //

  var message = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };

  socket.emit('new-message', message);
  return false;
}