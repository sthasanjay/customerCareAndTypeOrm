import { Logger, TLogLevelName } from "tslog";
import winston, { format } from "winston";
import * as util from "util";
console.log("ENV ", process.env.ENV);
let log: any;
if (process.env.ENV == "local") {
  log = new Logger({
    displayFilePath: "displayAll",
    type: "pretty",
    displayDateTime: true,
    minLevel: process.env.LOGLEVEL as TLogLevelName,

    colorizePrettyLogs: true,
  });
} else {
  const logger = winston.createLogger({
    level: process.env.LOGLEVEL,
    format: format.combine(format.errors({ stack: true }), winston.format.json()),
    defaultMeta: { service: "backend-service" },
    transports: [], // only send logs to new_relic
    exitOnError: false,
  });
  const writeLogType = (logLevel: string) => {
    return function (...args: any[]) {
      // @ts-ignore
      args.length == 1 ? logger[logLevel](args[0]) : logger[logLevel](util.format(...args)); // since util.format stringify errors, winston is unable to properly display error logs
    };
  };

  log = {
    silly: writeLogType("silly"),
    debug: writeLogType("debug"),
    verbose: writeLogType("verbose"),
    info: writeLogType("info"),
    warn: writeLogType("warn"),
    error: writeLogType("error"),
  };
}

export default log;
