import Moment from 'moment';
Moment.locale('es');
Vue.filter('formatTime', (time, type) => {
  if (!time) {
    return ""
  }
  time = Number(time) < 10000000000 ? time * 1000 : time;
  if (type) {
    return Moment(time).format(type);
  } else {
    return Moment(time).format('YYYY-MM-DD HH:mm:ss');
  }
});
Vue.filter('RelativeTime', (time) => {
  if (!time) {
    return ""
  }
  time = Number(time) < 10000000000 ? time * 1000 : time;
  let nowTime = +new Date();
  let timeDiff = nowTime - time;
  if (timeDiff <= 30 * 1000) {
    return "刚刚";
  } else if (timeDiff > 30 * 1000 && timeDiff <= 60 * 1000) {
    return "1分钟前";
  } else if (timeDiff > 60 * 1000 && timeDiff <= 60 * 60 * 1000) {
    return `${parseInt(timeDiff/(60*1000))}分钟前`;
  } else if (timeDiff > 60 * 60 * 1000 && timeDiff <= 24 * 60 * 60 * 1000) {
    return `${parseInt(timeDiff/(60*60*1000))}小时前`;
  } else if (timeDiff > 24 * 60 * 60 * 1000 && timeDiff <= 2 * 24 * 60 * 60 * 1000) {
    return `昨天${Moment(time).format('HH:mm')}`;
  } else if (timeDiff > 2 * 24 * 60 * 60 * 1000 && timeDiff <= 3 * 24 * 60 * 60 * 1000) {
    return `前天${Moment(time).format('HH:mm')}`;
  } else {
    if (new Date(time).getFullYear() == new Date().getFullYear()) {
      return Moment(time).format('MM-DD HH:mm');
    } else {
      return Moment(time).format('YY-MM-DD HH:mm');
    }
  }
});