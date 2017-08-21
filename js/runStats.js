var dist;
var time;
var pace;
var filledCount = 0;

var distUnit = 1.609344;
var paceUnit = 1.609344;
var unitRatio=1;

function findDistance() {
  if (checkDistance()) {
    if (!(dist>0))
    {
      filledCount+=1;
      updateFindBtns();
    }
    dist = time/pace;
    document.getElementById("dist").value = dist;
  }
}

function findTime() {
  if (checkTime()) {
    if (!(time>0))
    {
      filledCount+=1;
      updateFindBtns();
    }
    time=dist*pace;
    document.getElementById("thr").value = timeH(time);
    document.getElementById("tmin").value = timeM(time);
    document.getElementById("tsec").value = timeS(time);
  }
}

function findPace() {
  if (checkPace()) {
    if (!(pace>0))
    {
      filledCount+=1;
      updateFindBtns();
    }
    pace=time/dist;
    pace=pace/unitRatio;
    document.getElementById("phr").value = timeH(pace);
    document.getElementById("pmin").value = timeM(pace);
    document.getElementById("psec").value = timeS(pace);
  }
}

function checkDistance() {
  if (!(getTime() && getPace())) {
    return false;
  }
  return true;
}
function checkTime() {
  if (!(getDistance() && getPace())) {
    return false;
  }
  return true;
}
function checkPace() {
  if (!(getDistance() && getTime())) {
    return false;
  }
  return true;
}

function getDistance() { //check for letters?
  var temp = dist;       //store the current distance value
  dist=document.getElementById("dist").value;  //update distance value from input
  if (dist=="" || dist<=0) {  //check if valid input
    if (temp>0) {         //if previously valid - subract from filled count
      filledCount-=1;
    }
    return false;         //if invalid return false
  }                       
  if (!(temp>0)) {   //if not already filled then add to the filled count
    filledCount+=1;
  }
  return true;            //if valid then return true
}
function getTime() {
  var temp = time;   //store the current time value
  //get hour
  var thr=document.getElementById("thr").value;
  if (thr=="") {thr=0;}
  if (!(thr>=0)) {
    if (temp>0) {
      filledCount-=1;
    }
    return false;
  }
  //get minute
  var tmin=document.getElementById("tmin").value;
  if (tmin=="") {tmin=0;}
  if (!(tmin>=0)) {
    if (temp>0) {
      filledCount-=1;
    }
    return false;
  }
  //get second
  var tsec=document.getElementById("tsec").value;
  if (tsec=="") {tsec=0;}
  if (!(tsec>=0)) {
    if (temp>0) {
      filledCount-=1;
    }
    return false;
  }
  time = timeToSeconds(thr, tmin, tsec); //get new time from the inputted values
  if (time==0) {
    if (temp>0) {
      filledCount-=1;
    }
    return false;
  }
  if (!(temp>0)) {
    filledCount+=1;
  }
  return true;
}
function getPace() {
  var temp = pace;
  //get hour
  var phr=document.getElementById("phr").value;
  if (phr=="") {phr=0;}
  if (!(phr>=0)) {
    if (temp>0) {
      filledCount-=1;
    }
    return false;
  }
  //get minute
  var pmin=document.getElementById("pmin").value;
  if (pmin=="") {pmin=0;}
  if (!(pmin>=0)) {
    if (temp>0) {
      filledCount-=1;
    }
    return false;
  }
  //get second
  var psec=document.getElementById("psec").value;
  if (psec=="") {psec=0;}
  if (!(psec>=0)) {
    if (temp>0) {
      filledCount-=1;
    }
    return false;
  }
  pace = timeToSeconds(phr, pmin, psec);
  if (pace==0) {
    if (temp>0) {
      filledCount-=1;
    }
    return false;
  }
  if (!(temp>0)) {
    filledCount+=1;
  }
  return true;
}

function timeToSeconds(h, m, s) {
  var hsecs = parseFloat(h)*3600;
  var msecs = parseFloat(m)*60;
  var total = msecs + hsecs + parseFloat(s);
  return total;
}

function timeH(t) {
  var hrs = (t - t%3600)/3600;  //extract hours part of time
  return hrs;
}
function timeM(t) {
  t = t%3600 //seconds 'overspill' on whole hours
  var mins = (t - t%60)/60 //extract minutes part of 'overspill'
  return mins;
}
function timeS(t) {
  var secs = t%60; //extract seconds part of 'overspill'
  return secs;
}

function distanceSelected() {
  if (!(dist>0)) {
    filledCount+=1;
  }
  dist = document.getElementById("predefinedDistances").value;
  dist=dist/distUnit;
  document.getElementById("dist").value=dist;
}

function updateUnits() {
  distUnit = document.getElementById("dUnits").value;
  paceUnit = document.getElementById("pUnits").value;
  unitRatio = distUnit/paceUnit;
}
function updateDistanceUnit() {
  var tempUnit = distUnit;
  distUnit = document.getElementById("dUnits").value;
  var ratio = tempUnit/distUnit;
  getDistance();
  dist *= ratio;
  document.getElementById("dist").value = dist;
  unitRatio = distUnit/paceUnit;
}
function updatePaceUnit() {
  var tempUnit = paceUnit;
  paceUnit = document.getElementById("pUnits").value;
  var ratio = paceUnit/tempUnit;
  getPace();
  pace *= ratio;
  document.getElementById("phr").value = timeH(pace);
  document.getElementById("pmin").value = timeM(pace);
  document.getElementById("psec").value = timeS(pace);
  unitRatio = distUnit/paceUnit;
}

//--------------------jQuery for runStats----------------------
//gives instantaneous dist, time, pace updates and highlights relevant 'find buttons'
//...still need to update the find buttons on reset

$('input:text').each(function() {
  var elem = $(this);
  elem.on("input", function () {
  
    if (elem.is('#dist')) {
      getDistance();
    }
    else if (elem.is('#time table input:text')) 
    {
      getTime();
    }
    else 
    {
      getPace();
    }
    
    updateFindBtns();
  });
});

function updateFindBtns() {
    if (filledCount<=2) {
      $('td.findBtn input').css({'background-color': "rgba(200, 200, 255, 0.1)"});
    }
    
    if (filledCount==2) {
      var onbtn;
      if (!(dist>0)) {
        onbtn = $('tr#distance>td input:last');
      }
      else if (!(time>0)) {
        onbtn = $('tr#time>td input:last');
      }
      else {
        onbtn = $('tr#pace>td input:last');
      }
      var offbtns = $('tr.mainRow>td:nth-child(3) input').not(onbtn);
      onbtn.css({'background-color': "rgba(200, 200, 255, 1)"});
      offbtns.css({'background-color': "rgba(200, 200, 255, 0.1)"});
    }
    if (filledCount==3) {
      $('td.findBtn input').css({'background-color': "rgba(200, 200, 255, 1)"});
    }
}