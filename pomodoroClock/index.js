var clockArray = new Array()
var currentRunningClock = -1

function ClockObject(bigTime, mode, animation, color, id){
    this.bigTime = bigTime
    this.mode = mode
    this.animation = animation
    this.color = color
    this.id = id
    var percent
    var mins
    var secs
    var countdownID
    this.minutes = document.getElementById("minutes_" + id)
    this.seconds = document.getElementById("seconds_" + id)
    this.message = document.getElementById("message_" + id)
    this.start = false
    this.longBreakVal = 600  //10 minutes
    this.shortBreakVal = 300 //5 minutes
    this.isStarted = false
    this.messageId = "message_" + id
}

var test = document.getElementById("test")

function initElements(id){
    clockArray[id] = new ClockObject(1499, "normal", "fadeToBlack", "0D5B85", id)
}

function counter(clockId){
    //split time into minutes and seconds
    clockArray[clockId].mins = Math.floor(clockArray[clockId].bigTime / 60)
    clockArray[clockId].secs = clockArray[clockId].bigTime - clockArray[clockId].mins * 60

    //Update HTML for minutes and seconds
    clockArray[clockId].minutes.innerHtml = (clockArray[clockId].mins < 10 ? '0' : '') + clockArray[clockId].mins
    clockArray[clockId].seconds.innerHtml = (clockArray[clockId].mins < 10 ? '0' : '') + clockArray[clockId].mins
}

//switch modes when timer finishes
//if()