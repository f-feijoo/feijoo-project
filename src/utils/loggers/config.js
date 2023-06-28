import log4js from "log4js";
export default log4js.configure({
  appenders: {
    miLoggerConsole: { type: "console" },
    miWarnFile: { type: "file", filename: "warn.log" },
    warnFileLevel: {
      type: "logLevelFilter",
      appender: "miWarnFile",
      level: "warn",
    },
    miErrorFile: { type: "file", filename: "error.log" },
    errorFileLevel: {
      type: "logLevelFilter",
      appender: "miErrorFile",
      level: "error",
    },
  },
  categories: {
    default: { appenders: ["miLoggerConsole"], level: "info" },
    warnLogs: { appenders: ["warnFileLevel", "miLoggerConsole"], level: "all" },
    errorLogs: {
      appenders: ["errorFileLevel", "miLoggerConsole"],
      level: "all",
    },
  },
});
