export function formatterdate(cellval: any) {
  if (cellval == undefined || cellval == null || cellval == '') return '';
  if (cellval.indexOf('T') > 0) {
    return cellval.substring(0, 4) > 5000 ? '' : cellval.substring(0, 10);
  }
  var date = new Date();
  if (cellval.indexOf('Date') < 0 && cellval.indexOf('T') < 0) {
    if (cellval.length == 10) {
      return cellval.substring(0, 4) > 5000 ? '' : cellval;
    } else {
      cellval = cellval.replace(/-/g, ' / ');
    }
    date = new Date(cellval);
  } else {
    date = new Date(
      parseInt(cellval.replace('/Date(', '').replace(')/', ''), 10)
    );
  }
  var month =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1;
  var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  if (date.getFullYear() > 4000) {
    return '';
  } else {
    return date.getFullYear() + '-' + month + '-' + currentDate;
  }
}
export function formattterdateM(cellval: any) {
  if (cellval == undefined || cellval == null || cellval == '') return '';
  if (cellval.indexOf('T') > 0) {
    return cellval.substring(0, 16).replace('T', ' ');
  }
  var date = new Date();
  if (cellval.indexOf('Date') < 0 && cellval.indexOf('T') < 0) {
    if (cellval.length == 16) {
      return cellval;
    } else {
      cellval = cellval.replace(/-/g, ' / ');
    }
    date = new Date(cellval);
  } else {
    date = new Date(
      parseInt(cellval.replace('/Date(', '').replace(')/', ''), 16)
    );
  }

  var date = new Date(cellval);
  var getMonth =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1;
  var getDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var getHours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var getMinutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  //var getSeconds = date.getSeconds() < 10 ? ("0" + date.getSeconds()) : date.getSeconds();
  return (
    date.getFullYear() +
    '-' +
    getMonth +
    '-' +
    getDate +
    ' ' +
    getHours +
    ':' +
    getMinutes
  );
}
