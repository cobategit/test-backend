import { AppLoggerV1 } from "../helpers"

export class RequestScheduler {
    private queuedReq = 0
    private totalReq = 0
    private readonly reqPerInterval: number
    private readonly intervalTime: number
    private readonly debugMode: boolean

    constructor({
        reqPerInterval,
        intervalTime,
        debugMode = false,
    }: {
        reqPerInterval: number
        intervalTime: number
        debugMode: boolean
    }) {
        this.reqPerInterval = reqPerInterval
        this.intervalTime = intervalTime
        this.debugMode = debugMode
        if (debugMode) {
            console.time("Req Scheduler")
        }
    }

    public async scheduler(req: Function): Promise<any> {
        let timeout = 0
        if (this.queuedReq >= this.reqPerInterval) {
            timeout = this.intervalTime
            this.queuedReq = 0
            if (this.debugMode) {
                AppLoggerV1.info("\x1b[36m%s\x1b[0m", // this makes our log a cyan color!
                    `--- RequestScheduler: Wait ${timeout}ms ---`)
            }
        }

        return new Promise((resolve) => {
            setTimeout(() => {
                this.queuedReq++
                this.totalReq++
                if (this.debugMode) {
                    AppLoggerV1.debug("RequestScheduler",
                        `#${this.totalReq} ${req.name}`)
                }

                resolve(req())
            }, timeout)
        })
    }
}