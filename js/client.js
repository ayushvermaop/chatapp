const socket = io('https://chatapp-avop.onrender.com/');

const nav = document.querySelector(".nav");
const form = document.getElementById('send-form');
const inputmsg = document.getElementById('txt');
const chatbox = document.querySelector('.chats');
const main = document.querySelector('.main');

let namee = prompt("Enter your name to join");
if( namee == null || namee.length < 3 || namee.length > 20){
    // alert('Access Denied');
    main.remove();
    const h1 = document.createElement('h1');
    h1.classList.add('h1class');
    h1.innerHTML = "<br> Sahi naam dal le nhi to .. <br> Chala Ja 😁😁 <br><br> ╰(*°▽°*)╯";
    nav.append(h1);
}
else{
    // alert('Access Granted');
    socket.emit('new-user-joined', namee);
}

const joinedAction = (message)=>{
    const msgElem = document.createElement('div');
    // const pElem = document.createElement('div');
    msgElem.innerText = message;
    msgElem.classList.add('newjoined');
    chatbox.append(msgElem);
    chatbox.scrollTop = chatbox.scrollHeight;
}
socket.on('userjoined', (data) =>{
    joinedAction(`${data.name} Joined the Chat`);
});


const appendMessage = (msg, id)=>{
    const msgElem = document.createElement('div');
    msgElem.innerText = msg;

    msgElem.classList.add('message');
    msgElem.classList.add('right');

    chatbox.append(msgElem);
    chatbox.scrollTop = chatbox.scrollHeight;
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log(e);
    const msg = inputmsg.value;
    if(msg ===""){
        return ;
    }
    const id = Math.round(Math.random() * 100000 );
    appendMessage(msg, id);
    socket.emit('send', {msg, id});
    inputmsg.value = "";
})

socket.on('receive', (data)=>{
    const msgElem = document.createElement('div');
    const realmessage = document.createElement('div');
    realmessage.innerText = `${data.message}`;
    // msgElem.innerText = `${data.message} `;
    const span = document.createElement('span');
    span.innerText = `${data.name} :`;
    span.classList.add('span');
    msgElem.append(span);
    msgElem.append(realmessage);
    msgElem.classList.add('message');
    msgElem.classList.add('left');
    chatbox.append(msgElem);
    chatbox.scrollTop = chatbox.scrollHeight;
});








socket.on('userleft', (data)=>{
    const msgElem = document.createElement('div');
    // const pElem = document.createElement('div');
    let leftmessage = `${data.name} left the Chat`;
    msgElem.innerText = leftmessage;
    msgElem.classList.add('userleft');
    chatbox.append(msgElem);
    chatbox.scrollTop = chatbox.scrollHeight;
})

/*

const appendMsg = (message, position)=>{
    const messageDiv = document.createElement('div');
    messageDiv.innerText = message;
    if(position === "right"){
        messageDiv.classList.add(position);
        messageDiv.classList.add("message");
    }
    else if( position === "left"){
        messageDiv.classList.add(position);
        messageDiv.classList.add("left");
    }
    else{
        messageDiv.classList.add(position);
    }
    mainbox.append(messageDiv);
    mainbox.scrollTop = mainbox.scrollHeight;
}

*/
