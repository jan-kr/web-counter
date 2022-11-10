let apiurl = "https://counter.krsb.ch"
let id = prompt("Enter your session code")

document.addEventListener("DOMContentLoaded", () => {
	console.log("DOM content loaded.\nStarting setup...")
	setup(id)
})

function countUp(session) {
	fetch(`${apiurl}/api/index.php?session=${session}&todo=add`)
		.then(console.log("after up"))
		.catch(`call failed for ${session}`)
}

function countDown(session) {
	fetch(`${apiurl}/api/index.php?session=${session}&todo=del`)
		.then(console.log("after down"))
		.catch(`call failed for ${session}`)
}

function getCount(session) {
	fetch(`${apiurl}/api/index.php?session=${session}&todo=get`)
		.then(res => res.json())
		.then(res => document.getElementById('display').innerHTML=res)
		.catch(`call failed for ${session}`)
}

function getSession() {
	fetch(`${apiurl}/api/index.php?todo=session`)
		.then(res => res.json())
		.then(res => alert("Session Code: " + res))
		.catch(`call failed`)
}

function buildSession(session) {
	fetch(`${apiurl}/api/index.php?session=${session}&todo=connect`)
		.then("Session built.")
		.catch(`call failed for ${session}`)
}

function setup(session) {
	console.log(`Started setup...\nBuild session ${session}...`)
	buildSession(session)
	let display = document.getElementById('display')
	let up = document.getElementById('up')
	let down = document.getElementById('down')

	if(display != null) {
		console.log("Display detected... \nStarting refresh interval...")
		setInterval(() => getCount(session), 500)
	}

	if(up != null) {
		console.log("Button up detected... \nSetting event listener...")
		up.addEventListener('click', function() {
			countUp(session)
		})
		console.log("Event listener added to button up.")
	}
	if(down != null) {
		console.log("Button down detected... \nSetting event listener...")
		down.addEventListener('click', function() {
			countDown(session)
		})
		console.log("Event listener added to button down.")
	}
	console.log(`Setup complete for session ${session}.`)
}