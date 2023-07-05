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

export {success};