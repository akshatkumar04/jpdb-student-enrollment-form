var jpdbBaseURL = "https://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var dbName = "SCHOOL-DB";
var relName = "STUDENT-TABLE";
var fields = ["fullName", "stdClass", "birthDate", "address", "enrollmentDate"];

function showAlert(msg, type) {
  $("#alertBox").html("<div class=\"alert alert-" + (type || "danger") +
    " alert-dismissible fade show\" role=\"alert\">" + msg +
    "<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\"></button></div>");
}

function initialState() {
  $("#studentForm")[0].reset();
  localStorage.removeItem("recno");
  $("#rollNo").prop("disabled", false);
  fields.forEach(function (f) { $("#" + f).prop("disabled", true); });
  $("#saveBtn, #updateBtn, #resetBtn").prop("disabled", true);
  $("#rollNo").focus();
}

function enableFields() {
  fields.forEach(function (f) { $("#" + f).prop("disabled", false); });
  $("#resetBtn").prop("disabled", false);
  $("#fullName").focus();
}

function validate() {
  var all = ["rollNo"].concat(fields);
  for (var i = 0; i < all.length; i++) {
    if ($.trim($("#" + all[i]).val()) === "") {
      showAlert("Please fill in: " + all[i]);
      $("#" + all[i]).focus();
      return null;
    }
  }
  var obj = {};
  all.forEach(function (f) { obj[f] = $.trim($("#" + f).val()); });
  return JSON.stringify(obj);
}

function execSync(req, url) {
  jQuery.ajaxSetup({ async: false });
  var res = executeCommandAtGivenBaseUrl(req, jpdbBaseURL, url);
  jQuery.ajaxSetup({ async: true });
  return res;
}

function getStudent() {
  var rollNo = $.trim($("#rollNo").val());
  if (rollNo === "") { return; }
  var req = createGET_BY_KEYRequest(connToken, dbName, relName, JSON.stringify({ rollNo: rollNo }));
  var res = execSync(req, jpdbIRL);
  if (res.status === 400) {
    enableFields();
    $("#saveBtn").prop("disabled", false);
  } else if (res.status === 200) {
    var rec = JSON.parse(res.data);
    localStorage.setItem("recno", rec.rec_no);
    var d = rec.record;
    fields.forEach(function (f) { $("#" + f).val(d[f]); });
    $("#rollNo").prop("disabled", true);
    enableFields();
    $("#updateBtn").prop("disabled", false);
  } else {
    showAlert("Error: " + (res.message || "request failed"));
  }
}

function saveStudent() {
  var json = validate();
  if (json === null) { return; }
  var req = createPUTRequest(connToken, json, dbName, relName);
  var res = execSync(req, jpdbIML);
  initialState();
  if (res.status === 200) { showAlert("Student saved.", "success"); }
  else { showAlert("Save failed: " + res.message); }
}

function updateStudent() {
  var json = validate();
  if (json === null) { return; }
  var req = createUPDATERecordRequest(connToken, json, dbName, relName, localStorage.getItem("recno"));
  var res = execSync(req, jpdbIML);
  initialState();
  if (res.status === 200) { showAlert("Student updated.", "success"); }
  else { showAlert("Update failed: " + res.message); }
}

$(function () {
  $("#rollNo").on("change", getStudent);
  $("#saveBtn").on("click", saveStudent);
  $("#updateBtn").on("click", updateStudent);
  $("#resetBtn").on("click", function () { $("#alertBox").empty(); initialState(); });
  initialState();
});
