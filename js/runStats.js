var dist;
var time;
var pace;

var distUnit = 1.609344;
var paceUnit = 1.609344;
var unitRatio=1;

function findDistance() {
  if (checkDistance()) {
    dist=time/pace;
    dist=dist/unitRatio;
    document.getElementById("dist").value = dist;
  }
}

function findTime() {
  if (checkTime()) {
    time=dist*pace;
    document.getElementById("thr").value = timeH(time);
    document.getElementById("tmin").value = timeM(time);
    document.getElementById("tsec").value = timeS(time);
  }
}

function findPace() {
  if (checkPace()) {
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

function getDistance() {
  dist=document.getElementById("dist").value;
  if (dist=="") {dist=0;}                        //check for letters?
  if (dist<=0) {return false;}
  return true;
}
function getTime() {
  //get hour
  var thr=document.getElementById("thr").value;
  if (thr=="") {thr=0;}
  if (thr<0) {return false;}
  //get minute
  var tmin=document.getElementById("tmin").value;
  if (tmin=="") {tmin=0;}
  if (tmin<0) {return false;}
  //get second
  var tsec=document.getElementById("tsec").value;
  if (tsec=="") {tsec=0;}
  if (tsec<0) {return false;}
  time = timeToSeconds(thr, tmin, tsec);
  if (time==0) {return false;}
  return true;
}
function getPace() {
  //get hour
  var phr=document.getElementById("phr").value;
  if (phr=="") {phr=0;}
  if (phr<0) {return false;}
  //get minute
  var pmin=document.getElementById("pmin").value;
  if (pmin=="") {pmin=0;}
  if (pmin<0) {return false;}
  //get second
  var psec=document.getElementById("psec").value;
  if (psec=="") {psec=0;}
  if (psec<0) {return false;}
  pace = timeToSeconds(phr, pmin, psec);
  if (pace==0) {return false;}
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
  dist = document.getElementById("predefinedDistances").value;
  dist=dist/distUnit;
  document.getElementById("dist").value=dist;
}

function updateUnits() {
  distUnit = document.getElementById("dUnits").value;
  paceUnit = document.getElementById("pUnits").value;
  unitRatio = distUnit/paceUnit;
}