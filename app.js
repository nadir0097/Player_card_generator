
let token=null;

function login(){
fetch("/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
user:document.getElementById("user").value,
pass:document.getElementById("pass").value
})
}).then(r=>r.json()).then(d=>{
if(d.success){
token=d.token;
document.getElementById("loginBox").style.display="none";
document.getElementById("app").classList.remove("hidden");
loadPlayers();
}
});
}

function savePlayer(){
fetch("/players",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
firstName:firstName.value,
lastName:lastName.value,
dob:dob.value,
cert:cert.value,
season:season.value
})
}).then(()=>loadPlayers());
}

function loadPlayers(){
fetch("/players").then(r=>r.json()).then(showList);
}

function search(){
fetch("/search?q="+search.value).then(r=>r.json()).then(showList);
}

function showList(data){
list.innerHTML="";
data.forEach(p=>{
let div=document.createElement("div");
div.className="card";
div.innerHTML=`
<b>${p.firstName} ${p.lastName}</b><br>
${p.cert}<br>
<div id="qr-${p.id}"></div>
`;
list.appendChild(div);

setTimeout(()=>{
new QRCode(document.getElementById("qr-"+p.id), p.id.toString());
},100);
});
}
