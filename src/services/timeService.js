function getDDHHMMSS(remainingSeconds) {
  const round = remainingSeconds > 0 ? Math.floor : Math.ceil;
  const days = round(remainingSeconds / 86400);

  const hours = round((remainingSeconds - days * 86400) / 3600);
  const minutes = round((remainingSeconds - days * 86400 - hours * 3600) / 60);
  const seconds = round((remainingSeconds - days * 86400 - hours * 3600 - minutes * 60) / 1);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

export function getRemainingTimeString(remainingSeconds) {
  const { days, hours, minutes, seconds } = getDDHHMMSS(remainingSeconds);
  let resultString = '';

  if (days > 0) {
    resultString += `${days} d\n`;
  }

  resultString += hours >= 10 ? hours : `0${hours}`;
  resultString += ':';
  resultString += minutes >= 10 ? minutes : `0${minutes}`;
  resultString += ':';
  resultString += seconds >= 10 ? seconds : `0${seconds}`;

  return resultString;
}

export function getPastTimeString(pastSeconds) {
  const { days, hours, minutes, seconds } = getDDHHMMSS(Math.abs(pastSeconds));
  let resultString = '';

  if (days > 0) {
    resultString = `${days} days ago`;
  } else if (hours > 0) {
    resultString = `${hours} hrs ago`;
  } else if (minutes > 0) {
    resultString = `${minutes} min ago`;
  } else {
    resultString = `${seconds} sec ago`;
  }

  return resultString;
}

export function getCycleTimeOutput(cycleSeconds) {
  if (!cycleSeconds > 0) {
    return '0 s';
  }

  const { days, hours, minutes, seconds } = getDDHHMMSS(cycleSeconds);
  let cycleString = '';

  if (days > 0) {
    cycleString = `${days} d`;
  } else if (hours > 0) {
    cycleString = `${hours} h`;
  } else if (minutes > 0) {
    cycleString = `${minutes} m`;
  } else {
    cycleString = `${seconds} s`;
  }

  return cycleString;
}
