import {
  getLogLevelLogger,
  isLogLevelEnabled,
  LogLevel,
} from '../../state/log-level/log-level';
import { green, gray, white, red, yellow, bold } from 'colorette';

interface LogOptions {
  level: LogLevel;
  source?: string;
  subtle?: boolean;
  showTimestamp?: boolean;
}

export default function log(message: string, opts: LogOptions) {
  const { level, source, subtle = false, showTimestamp = false } = opts;
  const timestamp = showTimestamp ? `[${new Date().toISOString()}] ` : '';
  const formattedLevel = getFormattedLevel(level);
  const formattedSource = getFormattedSource(source, level);
  const formattedMessage = subtle ? gray(message) : white(message);
  const formattedLog = `${timestamp}${formattedLevel}${formattedSource}${formattedMessage}`;

  const logger = getLogLevelLogger(level);
  if (isLogLevelEnabled(level)) {
    logger(formattedLog);
  }
}

function getFormattedLevel(level: LogLevel) {
  switch (level) {
    case 'error':
      return `[${red(level)}] `;
    case 'warn':
      return `[${yellow(level)}] `;
    case 'info':
      return `[${green(level)}] `;
    case 'debug':
      return `[${gray(level)}] `;
  }
}

function getFormattedSource(source: string | undefined, level: LogLevel) {
  let formattedSource = '';
  if (source) {
    formattedSource = source;
    switch (level) {
      case 'error':
        formattedSource = bold(red(formattedSource));
        break;
      case 'warn':
        formattedSource = bold(yellow(formattedSource));
        break;
      case 'info':
        formattedSource = bold(green(formattedSource));
        break;
      case 'debug':
        formattedSource = bold(gray(formattedSource));
        break;
    }
    formattedSource = `[${formattedSource}] `;
  }
  return formattedSource;
}
