import { createLogger, transports, Logger, format } from 'winston'
import { format as frmtDt } from 'date-fns'
import path = require('path')
import fs = require('fs')
import 'winston-daily-rotate-file'

export class AppLoggerV1 {
  private static logger: Logger
  private static logDirectory = path.join(process.cwd(), 'logs')

  private static CreateLogFolderIfNotExists() {
    if (!fs.existsSync(this.logDirectory)) {
      fs.mkdirSync(this.logDirectory)
    }
  }

  private static SetLogger() {
    const logFormat = format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`
    })
    this.logger = createLogger({
      format: format.combine(format.json(), format.timestamp(), logFormat),
      transports: [
        new transports.Console(),
        new transports.DailyRotateFile({
          filename: path.join(AppLoggerV1.logDirectory, 'starter-%DATE%.log'),
          datePattern: frmtDt(new Date(), 'yyyy-MM-dd'),
          maxSize: '50mb',
          maxFiles: '30d',
          level: 'verbose',
        }),
      ],
      exitOnError: true,
    })
  }

  public static configureLogger() {
    this.CreateLogFolderIfNotExists()
    this.SetLogger()
  }

  private static GetValue(name: string, value: any) {
    if (typeof value === 'string') {
      return `${name} - ${value}`
    } else {
      return `${name} - ${JSON.stringify(value)}`
    }
  }

  public static debug(name: string, value: any) {
    this.logger.log('debug', this.GetValue(name, value))
  }

  public static error(name: string, value: any) {
    this.logger.log('error', this.GetValue(name, value))
  }

  public static warn(name: string, value: any) {
    this.logger.log('warn', this.GetValue(name, value))
  }

  public static info(name: string, value: any) {
    this.logger.log('info', this.GetValue(name, value))
  }
}

export class AppLoggerV2 {

  /**
   * getTimeStamp
   *  A function to get current timestamp, 
   *  and convert it into readable string.
   * 
   * @return string
   */
  private static getTimeStamp = (): string => new Date().toISOString();

  private static getDate(): string {
    const dateObj: any = new Date();
    const date = (dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate());
    const month = (dateObj.getMonth() + 1 < 10 ? `0${dateObj.getMonth() + 1}` : dateObj.getMonth() + 1);

    return `$${dateObj.getFullYear()}-${month}-${date}`;
  }

  /**
   * writeLog
   *  A function to write log message to file.
   *  
   * @return void
   */
  private static writeLog(str: string): void {

    const currentFileName: string = `./logs/${AppLoggerV2.getDate()}.log`;
    const logFormat: string = `${str}\n`;

    fs.appendFile(currentFileName, logFormat, (appendError: any) => {
      if (appendError) {
        AppLoggerV2.e("LOG", "Something error when append", appendError);
        fs.writeFile(currentFileName, logFormat, (writeError: any) => {
          AppLoggerV2.e("LOG", "Something error when write", writeError);
        });
      }
    });


  }

  /**
   * i
   *   A function that print logs on the console as 
   *   an informative message.
   */
  static i(namespace: string, message: string, object?: any): void {
    let generatedLog = `[${AppLoggerV2.getTimeStamp()}] [INFO] [${namespace}] ${message}`;

    if (object) {
      console.log(generatedLog, object);
    } else {
      console.log(generatedLog);
    }

    AppLoggerV2.writeLog(generatedLog);
  }

  /**
   * d
   *   A function that print logs on the console as 
   *   an debug message.
   */
  static d(namespace: string, message: string, object?: any): void {
    let generatedLog = `[${AppLoggerV2.getTimeStamp()}] [DEBUG] [${namespace}] ${message}`;

    if (object) {
      console.info(generatedLog, object);
    } else {
      console.info(generatedLog);
    }

    AppLoggerV2.writeLog(generatedLog);
  }

  /**
   * e
   *   A function that print logs on the console as 
   *   an error message.
   */
  static e(namespace: string, message: string, object?: any): void {
    let generatedLog = `[${AppLoggerV2.getTimeStamp()}] [ERROR] [${namespace}] ${message}`;

    if (object) {
      console.error(generatedLog, object);
    } else {
      console.error(generatedLog);
    }

    AppLoggerV2.writeLog(generatedLog);
  }

  /**
   * w
   *   A function that print logs on the console as 
   *   an warning message.
   */
  static w(namespace: string, message: string, object?: any): void {
    let generatedLog = `[${AppLoggerV2.getTimeStamp()}] [WARNING] [${namespace}] ${message}`;
    if (object) {
      console.warn(generatedLog, object);
    } else {
      console.warn(generatedLog);
    }

    AppLoggerV2.writeLog(generatedLog);
  }
}