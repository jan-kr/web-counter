function countUp(session) {
	fetch("/api?todo=add&session=" + session)
}

function countDown(session) {
	fetch("/api?todo=del&session=" + session)
}

function getCount(session) {
	fetch("/api?todo=get&session=" + session)
	.then(res => res.json())
	.then(res => document.getElementById("number").innerHTML=res)
}

function getSession() {
	fetch('/api?todo=session')
	.then(res => res.json())
	.then(res => alert("Session Code: " + res))
}

function connectSession(session) {
	fetch('/api?todo=connect&session=' + session)
}