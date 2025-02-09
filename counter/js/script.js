let id = prompt("Enter your session code")

/* Listens to the DOM content and executes setup after loading
* finished.
 */
document.addEventListener("DOMContentLoaded", () => {
	console.log("DOM content loaded.\nStarting setup...")
	setup(id)
})

/* This method queries the api to set the counter value of the session id +1.
 */
function countUp(session) {
	fetch(`/api/index.php?session=${session}&todo=add`)
		.then(console.log("after up"))
		.catch(`call failed for ${session}`)
}

/* This method queries the api to set the counter value of the session id -1.
 */
function countDown(session) {
	fetch(`/api/index.php?session=${session}&todo=del`)
		.then(console.log("after down"))
		.catch(`call failed for ${session}`)
}

/* This method queries the api for the current counter value for the given
 * session id in the database.
 */
function getCount(session) {
	fetch(`/api/index.php?session=${session}&todo=get`)
		.then(res => res.json())
		.then(res => document.getElementById('display').innerHTML=res)
		.catch(`call failed for ${session}`)
}

/* (Deprecated: use own session identifier instead)
 * This method returns the session id of the PHP session at the backend
 * this can be used to connect displays and counters to the same session.
 */
function getSession() {
	fetch(`/api/index.php?todo=session`)
		.then(res => res.json())
		.then(res => alert("Session Code: " + res))
		.catch(`call failed`)
}

/* This method builds the session and makes an api call to create the database
 * entry if it is a new session.
 */
function buildSession(session) {
	fetch(`/api/index.php?session=${session}&todo=connect`)
		.then("Session built.")
		.catch(`call failed for ${session}`)
}

/* This method is used to initialize the session for the given session id
 * It adds the event listeners to the object and starts the refresh
 * interval of the display.
 */
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