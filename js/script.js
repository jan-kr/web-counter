function countUp(session) {
	//call('POST', 'http://localhost/counter/api', 'add')
	fetch("/counter/api?todo=add&session=" + session)
	.then(res => res.json())
	.then(res => console.log(res))
}

function countDown(session) {
	//call('POST', 'http://localhost/counter/api', 'del')
	fetch("/counter/api?todo=del&session=" + session)
	.then(res => res.json())
	.then(res => console.log(res))
}

function getCount(session) {
	fetch("/counter/api?todo=get&session=" + session)
	.then(res => res.json())
	.then(res => document.getElementById("number").innerHTML=res)
}

function setSession(code) {
	console.log(code)
}

function getSession() {
	fetch('/counter/api?todo=session')
	.then(res => res.json())
	.then(res => alert("Session Code: " + res))
}

function connectSession(session) {
	
}