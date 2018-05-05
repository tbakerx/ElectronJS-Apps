var clockArray = new Array();
var currentRunningClock = -1;

function ClockObject(bigTime, mode, animation, color, id){
    this.bigTime = bigTime;
    this.mode = mode;
    this.animation = animation;
    this.color = color;
    this.id = id;
    var percent;
    var mins;
    var secs;
    var countdownID;
    this.minutes = document.getElementById("minutes_" + id);
    this.seconds = document.getElementById("seconds_" + id);
    this.message = document.getElementById("message_" + id);
    this.start = false;
    this.longBreakVal = 600;  //10 minutes
    this.shortBreakVal = 300; //5 minutes
    this.isStarted = false;
    this.messageId = "message_" + id;
}

var test = document.getElementById("test");

function initElements(id){
    clockArray[id] = new ClockObject(1499, "normal", "fadeToBlack", "0D5B85", id);
}

function counter(clockId){
    //split time into minutes and seconds
    clockArray[clockId].mins = Math.floor(clockArray[clockId].bigTime / 60);
    clockArray[clockId].secs = clockArray[clockId].bigTime - clockArray[clockId].mins * 60;

    //Update HTML for minutes and seconds
    clockArray[clockId].minutes.innerHTML = (clockArray[clockId].mins < 10 ? '0' : '') + clockArray[clockId].mins;
    clockArray[clockId].seconds.innerHTML = (clockArray[clockId].secs < 10 ? '0' : '') + clockArray[clockId].secs;
console.log(clockArray[clockId].secs);

    //switch modes when timer finishes
    if(clockArray[clockId].bigTime == 0){
        returnVal = playSound();
        currentRunningClock = -1;
        clearInterval(clockArray[clockId].countdownID);

        if(returnVal == 1){
            alert("Time's up! Take a break!");
        }
        hideClock(clockId);
    } else {
        clockArray[clockId].bigTime = clockArray[clockId].bigTime -1;
    }
}

//long break clock
function counterLongBreak(longClockId){
    clockArray[longClockId].mins = Math.floor (clockArray[longClockId].longBreakVal / 60)
    clockArray[longClockId].secs = clockArray[longClockId].longBreakVal - clockArray[clockId].mins * 60

    //Update HTML for showing updated mins and secs
    clockArray[longClockId].minutes.innerHTML = (clockArray[longClockId].mins < 10 ? '0': '') + 
    clockArray[longClockId].mins

    clockArray[longClockId].seconds.innerHTML = (clockArray[longClockId].secs < 10 ? '0': '') + 
    clockArray[longClockId].secs

    //switch modes if timer ends
    if(clockArray[longClockId].longBreakVal == 0){
        clearInterval(clockArray[longClockId].countdownID)
        clockArray[currentRunningClock].countdownID = setInterval("counter(currentRunningClock)", 1000)
    } else {
        //decrement
        clockArray[longClockId].longBreakVal = clockArray[longClockId].longBreakVal -1
    }
}

function counterShortBreak(shortClockId){
    clockArray[shortClockId].mins = Math.floor (clockArray[shortClockId].shortBreakVal / 60)
    clockArray[shortClockId].secs = clockArray[shortClockId].shortBreakVal - clockArray[clockId].mins * 60

    //Update HTML for showing updated mins and secs
    clockArray[shortClockId].minutes.innerHTML = (clockArray[shortClockId].mins < 10 ? '0': '') + 
    clockArray[shortClockId].mins

    clockArray[shortClockId].seconds.innerHTML = (clockArray[shortClockId].secs < 10 ? '0': '') + 
    clockArray[shortClockId].secs

    //switch modes if timer ends
    if(clockArray[shortClockId].shortBreakVal == 0){
        clearInterval(clockArray[shortClockId].countdownID)
        clockArray[currentRunningClock].countdownID = setInterval("counter(currentRunningClock)", 1000)
    } else {
        //decrement
        clockArray[shortClockId].shortBreakVal = clockArray[shortClockId].shortBreakVal -1
    }  
}

//Clock Actions

function startTimer(idString){
    //extract the integer value from the id of the clock div
    clockId = idString.replace(/^\D+/g, '')
    //Clock is currently in running state
    if (currentRunningClock == clockId){
        alert("The clock is already running. Hit reset if you want to start it again or restart if you want to restart the previous clock.")
    }

    if (currentRunningClock == -1){
        clockArray[clockId].messageId.innerHtml = "Clock is running"
        clockArray[clockId].isStarted = true
        currentRunningClock = clockId

        clockArray[clockId].countdownID = setInterval("counter(clockId)", 1000)
        clockArray[id].message = "Slow and steady wins the race"
    }    
    if (currentRunningClock != clockId && currentRunningClock != -1){
        alert("You must stop the current clock to start this one.")
    }
}

function restartTimer(idString){
    //extract the integer value from the id of the clock div
    clockRestartId = idString.replace(/^\D+/g, '')
    //check if the current clock is running and whose timer is going to be reset
    if(currentRunningClock == clockRestartId){
        if(clockArray[clockRestartId].isStarted == false){
            clockArray[clockRestartId].messageId.innerHtml = "Clock is running"
            clockArray[clockRestartId].isStarted = true
            clearInterval(clockArray[currentRunningClock].countdownID)
            currentRunningClock = clockRestartId
            clockArray[clockRestartId].countdownID = setInterval("counter(clockRestartId)", 1000)
        } else {
            alert("This clock is already running")
        }
    } else {
        alert("This clock is not running")
    }
}

function longBreak(idString){
    clockLongBreakId = idString.replace(/^\D+/g, '')
    clockArray[clockLongBreakId].isStarted = false
    if(clockLongBreakId == currentRunningClock){
        clockArray[clockLongBreakId].messageId.innerHtml = "Long Break"
        clockArray[clockLongBreakId].longBreakVal = 600
        clockArray[clockLongBreakId].shortBreakVal = 300
        clearInterval(clockArray[currentRunningClock].countdownID)
        clockArray[clockLongBreakId].countdownID = setInterval("counterLongBreak(clockLongBreakId)", 1000)
    } else {
        alert("This clock is not running")
    }
}

function shortBreak(idString){
    clockShortBreakId = idString.replace(/^\D+/g, '')
    clockArray[clockShortBreakId].isStarted = false
    if(clockShortBreakId == currentRunningClock){
        clockArray[clockShortBreakId].messageId.innerHtml = "Short Break"
        clockArray[clockShortBreakId].longBreakVal = 600
        clockArray[clockShortBreakId].shortBreakVal = 300
        clearInterval(clockArray[currentRunningClock].countdownID)
        clockArray[clockShortBreakId].countdownID = setInterval("counterShortBreak(clockShortBreakId)", 1000)
    } else {
        alert("This clock is not running")
    }
}

function stopTimer(idString){
    clockId = idString.replace(/^\D+/g, '')
    if(clockId == currentRunningClock){
        clockArray[clockId].minutes.innerHtml = "25"
        clockArray[clockId].seconds.innerHtml = "00"
        clearInterval(clockArray[clockId].countdownID)
        //25 minutes
        clockArray[clockId].bigTime = 1499
        currentRunningClock = -1
    } else{
        clockId = currentRunningClock
        alert("This clock is not running")
    }
}

function resetTimer(idString){
    clockResetId = idString.replace(/^\D+/g, '')
    clockArray[clockResetId].bigTime = 1499
    clockArray[clockResetId].minutes.innerHtml = "25"
    clockArray[clockResetId].seconds.innerHtml = "00"
    if(currentRunningClock > 0){
        clearInterval(clockArray[currentRunningClock].countdownID)
    }
    currentRunningClock = -1
}

function hideClock(idString){
    closeId = "clock_" + idString.replace(/^\D+/g,'')
    closeClockId = idString.replace(/^\D+/g,'')
    if(currentRunningClock == closeClockId){
        currentRunningClock = -1
    }
    document.getElementById(closeId).style.display = "none";
}

function playSound(){
    var sound = document.getElementById("audio")
    sound.play()
    return 1
}