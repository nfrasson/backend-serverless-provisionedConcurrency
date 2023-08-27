export default class Logger {
  constructor(identifier) {
    this.identifier = identifier;
  }

  info(state, objectToLog = {}) {
    console.info({ identifier: this.identifier, state, ...objectToLog });
  }

  debug(state, objectToLog = {}) {
    console.debug({ identifier: this.identifier, state, ...objectToLog });
  }

  warn(state, objectToLog = {}) {
    console.warn({ identifier: this.identifier, state, ...objectToLog });
  }

  error(state, error, objectToLog = {}) {
    console.error({
      identifier: this.identifier,
      state,
      stack: error.stack,
      message: error.message,
      ...objectToLog,
    });
  }
}
