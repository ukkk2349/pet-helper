import notify from 'devextreme/ui/notify';

function success(content) {
  notify({
    message: content,
    height: 45,
    width: 'fit-content',
    minWidth: 150,
    type: 'success',
    displayTime: 3500,
    animation: {
      show: {
        type: 'fade', duration: 400, from: 0, to: 1,
      },
      hide: { type: 'fade', duration: 40, to: 0 },
    },
  },
  { position: 'bottom right' });
}

function error(content) {
  notify({
    message: content,
    height: 45,
    width: 'fit-content',
    minWidth: 150,
    type: 'error',
    displayTime: 3500,
    animation: {
      show: {
        type: 'fade', duration: 400, from: 0, to: 1,
      },
      hide: { type: 'fade', duration: 40, to: 0 },
    },
  },
  { position: 'bottom right' });
}

function formatDate(date) {
  if (date && date.length > 0) {
    var d = new Date(date);
    return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
  } else {
    return "";
  }
}  

function formatDateTime(date) {
  if (date && date.length > 0) {
    var d = new Date(date);
    let minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    return d.getHours() + ':' + minute + ' ' + d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
  } else {
    return "";
  }
}

function formatMoney(val) {
  return val.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}

export {success, error, formatDate, formatDateTime, formatMoney};