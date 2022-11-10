let apiurl = "https://counter.krsb.ch"
let id = prompt("Enter your session code")

document.addEventListener("DOMContentLoaded", () => {
	setup(id)
})

function countUp(session) {
	fetch(`${apiurl}/api/index.php?session=${session}&todo=add`)
		.then(console.log("after up"))
}

function countDown(session) {
	fetch(`${apiurl}/api/index.php?session=${session}&todo=del`)
		.then(console.log("after down"))
}

function getCount(session) {
	fetch(`${apiurl}/api/index.php?session=${session}&todo=get`)
	.then(res => res.json())
	.then(res => document.getElementById('display').innerHTML=res)
}

function getSession() {
	fetch(`${apiurl}/api/index.php?todo=session`)
	.then(res => res.json())
	.then(res => alert("Session Code: " + res))
}

function buildSession(session) {
	fetch(`${apiurl}/api/index.php?session=${session}&todo=connect`)
}

function setup(session) {
	buildSession(session)
	let display = document.getElementById('display')
	let up = document.getElementById('up')
	let down = document.getElementById('down')

	if(display != null) {
		setInterval(() => getCount(session), 500)
	}
	console.log("check display " + display)
	if(up != null) {
		up.addEventListener('click', function() {
			countUp(session)
		})
	}
	if(down != null) {
		down.addEventListener('click', function() {
			countDown(session)
		})
	}
}