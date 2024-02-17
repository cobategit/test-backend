import express, { NextFunction, Request, Response } from 'express'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import xss from 'x-xss-protection'
import './data/configs/db-facade'
import dotenv from 'dotenv'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express';
import SwaggerOption from './swagger'
import { Api, AppLoggerV1 } from './external'

(async () => {
    dotenv.config()
    AppLoggerV1.configureLogger()
    const router = express()

    console.log(`
    Session ${new Date()}
    ________  _____    __ ___  __
    / ____/ / / /   |  / //_/ |/ /
    / /   / / / / /| | / ,<  |   / 
    / /___/ /_/ / ___ |/ /| |/   |  
    \\____/\\____/_/  |_/_/ |_/_/|_|  
                                    
    `);

    if (!["production"].includes(process.env.APP_ENV!) && process.env.SWAGGER_ENABLE! == "true") {
        const specs = swaggerJSDoc(SwaggerOption);

        router.use(
            "/api-docs",
            swaggerUi.serve,
            swaggerUi.setup(specs)
        );
    }

    router.use(express.urlencoded({ extended: false }))
    router.use(helmet())
    router.enable('trust proxy')
    router.use(compression())
    router.use(xss())
    router.use(cors())
    router.use(express.json())

    // router.use('/api', routes);

    router.all('*', (request: Request, response: Response, next: NextFunction) => {
        response.status(404)
        if (request.accepts('html')) {
            return response.status(404).send('HTML PAGES')
        } else if (request.accepts('json')) {
            return response.status(404).send(`cant't find ${request.originalUrl} on this site`)
        }
    })

    router.use((error: Error, request: Request, response: Response, next: NextFunction) => {
        console.log(`error catch ${error}`);
        if (error) {
            Api.errorCatch(error, request, response)
        } else {
            response
                .status(404)
                .send(Api.notFound(request, response))
        }
    })

    const server = router.listen(process.env.SERVER_PORT, () =>
        console.log(`server running on port ${process.env.SERVER_PORT}`)
    )

    process.on('unhandledRejection', (err) => {
        console.log('UNHANDLED REJECTION !! Mematikan server...')
        console.log(err)
        server.close(() => {
            process.exit(1)
        })
    })

    process.on('uncaughtException', (err) => {
        console.log('UNHANDLED REJECTION !! Mematikan server...')
        console.log(err)
        server.close(() => {
            process.exit(1)
        })
    })
})()
