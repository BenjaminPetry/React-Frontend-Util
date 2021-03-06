/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */
export function formatSeconds(
  seconds,
  { hh = true, mm = true, ss = true, sss = true } = {
    hh: true,
    mm: true,
    ss: true,
    sss: true,
  }
) {
  var tmp = seconds;
  let hhValue = Math.floor(tmp / 3600);
  tmp = tmp - hhValue * 3600;
  let mmValue = Math.floor(tmp / 60);
  tmp = tmp - mmValue * 60;
  let ssValue = Math.floor(tmp);
  let sssValue = Math.round((tmp - ssValue) * 1000);

  var result = hh ? (hhValue + "").padStart(2, "0") : "";
  result += hh && (mm || ss) ? ":" : "";
  result += mm ? (mmValue + "").padStart(2, "0") : "";
  result += mm && ss ? ":" : "";
  result += ss ? (ssValue + "").padStart(2, "0") : "";
  result += (hh || mm || ss) && sss ? "." : "";
  result += sss ? (sssValue + "").padEnd(3, "0") : "";
  return result;
}

export function parseTime(time) {
  const regex = new RegExp(
    /((([0-9]?[0-9]?):)?([0-9]?[0-9]?):)?([0-9]?[0-9]?)(\.([0-9][0-9]?[0-9]?))?/gs
  );
  let match = [...time.matchAll(regex)][0];
  let hh = parseInt(match[3] || "0");
  let mm = parseInt(match[4] || "0");
  let ss = parseInt(match[5] || "0");
  let sss = parseInt(match[7] ? match[7].padEnd(3, "0") : "0");
  let timeSeconds = hh * 3600 + mm * 60 + ss + sss / 1000.0;
  return timeSeconds;
}

export function formatDate(date, format) {
  if (format.indexOf("d") >= 0) {
    format = format.replace("d", (date.getDate() + "").padStart(2, "0"));
  }
  if (format.indexOf("m") >= 0) {
    format = format.replace("m", (date.getMonth() + 1 + "").padStart(2, "0"));
  }
  if (format.indexOf("Y") >= 0) {
    format = format.replace("Y", (date.getFullYear() + "").padStart(4, "0"));
  }
  if (format.indexOf("H") >= 0) {
    format = format.replace("H", (date.getHours() + "").padStart(2, "0"));
  }
  if (format.indexOf("i") >= 0) {
    format = format.replace("i", (date.getMinutes() + "").padStart(2, "0"));
  }
  if (format.indexOf("sss") >= 0) {
    format = format.replace(
      "sss",
      (date.getMilliseconds() + "").padStart(3, "0")
    );
  }
  if (format.indexOf("s") >= 0) {
    format = format.replace("s", (date.getSeconds() + "").padStart(2, "0"));
  }
  return format;
}

export class CustomError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.data = data;
  }
}

export function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function setFocus(focusMethod) {
  focusMethod(false);
  window.setTimeout(function () {
    focusMethod(true);
  }, 100);
}

export function setState(newState, oldState, setStateMethod) {
  if (JSON.stringify(newState) !== JSON.stringify(oldState)) {
    setStateMethod(newState);
    return true;
  }
  return false;
}

export function addToStateList(element, list, setListMethod) {
  let tmpList = list.slice();
  tmpList.unshift(element);
  setListMethod(tmpList);
}

export function isMobileDevice() {
  return (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      navigator.userAgent
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
      navigator.userAgent.substr(0, 4)
    )
  );
}

export function copyToClipboard(text) {
  var textField = document.createElement("textarea");
  textField.innerText = text;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  textField.remove();
}

export function getQuery() {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  var result = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    result[pair[0]] = pair[1];
  }
  return result;
}
