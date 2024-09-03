
// Retrieve the html elements
const hours_ele = document.getElementById("hour");
const minutes_ele = document.getElementById("minutes");
const seconds_ele = document.getElementById("seconds");
const am_pm_ele = document.getElementById("am_pm");
const setAlarm = document.querySelector("#set_alarm");
const alarmList = document.getElementById("alarm_list");
alarmList.style.fontWeight = "bold";
    


// Array element to store the data
const alarmData = [];

let hours, minutes, seconds, am_pm, deleteButton, alarmListData;


window.addEventListener("DOMContentLoaded", () => {
    function updateTime(){

    // Retriving of Html element to display the current time value
    const current_time = document.getElementById("current_time");
    

    // date object to use the methods of hour, minutes and seconds within Date class.
    const date = new Date();
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();

    // Below code snippet to set the proper AM/PM indicator and also setting 12-hour format
    
    if(hours === 12)
        am_pm = "PM";
    else if(hours > 12){
        hours -= 12;
        am_pm = "PM";
    }
    else{
        am_pm = "AM";
    }

    // seconds = (seconds<10) ? "0"+ seconds : seconds.toString(); One way to add leading value or 0 if value is single digit

    // Displaying time in the fetched html element.
    current_time.textContent = `${hours.toString().padStart(2,"0")} : ${minutes.toString().padStart(2,"0")} : ${seconds.toString().padStart(2,"0")} ${am_pm}`; // Padstart is another way to add leading value.

    }

    updateTime(); // Initial call of the function

    setInterval(updateTime, 1000); // To get realtime effect setting the interval as 1 sec
    setInterval(() => {checkAlarm(hours, minutes, seconds, am_pm)},1000); // to pass updated current time every second

    setHours();
    
    setMinutes_Seconds();

    displayAlarm();

});


// To add hours values in select element.
function setHours(){
    for(let i=0; i<=12;i++){
        // Dynamic creation of option element
        let optionHour = document.createElement("option");
        if(i<10){
            optionHour.value = i;
            optionHour.textContent = i.toString().padStart(2,"0");
        }
        else{
            optionHour.value = i
            optionHour.textContent = i
        }

        hours_ele.append(optionHour);
    }
    

}

function setMinutes_Seconds(){
    for(let i=0; i<=59;i++){
        let minutes_seconds = document.createElement("option");
        if(i<10){
            minutes_seconds.value = i;
            minutes_seconds.textContent = i.toString().padStart(2,"0");
        }
        else{
            minutes_seconds.value = i
            minutes_seconds.textContent = i
        }
        
        // cloneNode() to create a separate copy of minutes_seconds option to correctly display minutes & seconds.
        let sec = minutes_seconds.cloneNode(true); 
        minutes_ele.append(minutes_seconds);
        seconds_ele.append(sec);
    }
}

// To set alarm
setAlarm.addEventListener("click", () => {
    const hourValue = hours_ele.value;
    const minuteValue = minutes_ele.value;
    const secondValue = seconds_ele.value;
    const am_pm_value = am_pm_ele.value;

    const alarm = `${hourValue.toString().padStart(2,"0")} : ${minuteValue.toString().padStart(2,"0")} : ${secondValue.toString().padStart(2,"0")} ${am_pm_value}`;
    alarmData.push(alarm);

    displayAlarm();
})

// To display alarm to the DOM
function displayAlarm(){
    if(alarmData.length === 0){
        alarmList.textContent = "No Alarm Set";
    }
    else{

        // setting alarmList textContent to "" to avoid appending same list repeatedly and to append fresh list.
        alarmList.textContent = "";
        alarmList.textContent = "Set Alarms: "
        alarmData.forEach(element => {
            alarmListData = document.createElement("li");
            alarmListData.textContent = element;
        
            deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add('delete-button');

            deleteButton.addEventListener("click", ()=> {
                const index = alarmData.indexOf(element);

                if(index !== -1){
                    alarmData.splice(index,1); // splice to remove the set alarm from the alarmData array
                    alarmList.removeChild(alarmListData);
                }

                displayAlarm();
            })
            
            alarmListData.append(deleteButton);
            alarmList.append(alarmListData);       
        });
    }
    
}


// To check current time and set alarm time
function checkAlarm(hours, minutes, seconds, am_pm){
    const current = `${hours.toString().padStart(2,"0")} : ${minutes.toString().padStart(2,"0")} : ${seconds.toString().padStart(2,"0")} ${am_pm}`;

    alarmData.forEach(alarm => {
        if(current === alarm){
            alert("Alarm goes off !");
            const idx = alarmData.indexOf(alarm);
            if(idx !== -1){
                alarmData.splice(idx,1);
                alarmList.removeChild(alarmListData);
            }
            
            displayAlarm();
        }
    })

}




