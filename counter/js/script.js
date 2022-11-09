function countUp(session) {
	fetch("/api/index.php?todo=add&session=" + session)
}

function countDown(session) {
	fetch("/api/index.php?todo=del&session=" + session)
}

function getCount(session) {
	fetch("/api/index.php?todo=get&session=" + session)
	.then(res => res.json())
	.then(res => document.getElementById("number").innerHTML=res)
}

function getSession() {
	fetch('/api/index.php?todo=session')
	.then(res => res.json())
	.then(res => alert("Session Code: " + res))
}

function connectSession(session) {
	fetch('/api/index.php?todo=connect&session=' + session)
}