import Knex from "knex";
import config from "./config";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { Dialect } from "sequelize";
import { AppLoggerV2 } from "../../external";

const NAMESPACE: string = "DATABASE";

interface DatabaseConnectionSetup {
    database: string;
    username: string;
    password: string;
    host: string;
    dialect: Dialect;
    port: number;
    path: Array<string>;
    total_slave: number;
    db_key: string;
}

export class DatabaseDriver {
    // You can always specify new ORM driver in here
    private availableDriver: Array<string> = ["sequelize", "knex"];

    // Selected connection setup
    private configuration: DatabaseConnectionSetup;
    private readonly selectedDriver: string;

    /**
     * driverSynonym
     *
     * This function is in response of the error that caused by knex
     * driver which treat 'mysql' as 'mysql' and not 'mysql2'.
     *
     * The 'mysql' driver simply cannot take data from MySQL 8 for some reason.
     * See the link for more information
     *
     * @link https://github.com/knex/knex/issues/3233#issuecomment-988579036
     *
     * @private
     */
    private driverSynonym(): Dialect | string {
        let synonym: Dialect | string = this.configuration.dialect;

        switch (this.selectedDriver) {
            case "knex":
                if (this.configuration.dialect == "mysql") {
                    synonym = "mysql2";
                }

                break;

            case "sequelize":
            // if(this.configuration.dialect == 'mssql'){
            //     synonym =
            // }
            default:
        }

        return synonym;
    }

    public constructor(driver: string, setup: DatabaseConnectionSetup) {
        if (this.availableDriver.indexOf(driver) == -1) {
            throw new Error(`Database with selected driver ${driver}) is not found!`);
        }

        this.selectedDriver = driver;
        this.configuration = setup;
    }

    /**
     * authenticate
     *
     * This function will start the authentication system whatever you choose Sequelize or Knex.
     * Once the return statement being made, the returned value is the database driver settings loaded.
     */
    public authenticate(): any {
        let connection: any = null;

        switch (this.selectedDriver) {
            case "sequelize":
                AppLoggerV2.d(
                    NAMESPACE,
                    `[ORM DRIVER (${this.selectedDriver})] Connection to ${this.configuration.database} is initializing...`
                );
                try {
                    let sequelize: Sequelize;
                    let sequelizeOption: SequelizeOptions = {
                        host: this.configuration.host,
                        dialect: this.configuration.dialect,
                        port: this.configuration.port,
                        // "logging": (...msg) => console.log(msg),
                        logging: false,
                        models: this.configuration.path,
                        timezone: "Asia/Jakarta",
                        pool: {
                            max: 5,
                            min: 0,
                            idle: 10000,
                            acquire: 30000,
                        },
                    };

                    if (this.configuration.dialect === "mssql") {
                        sequelizeOption.dialectOptions = {
                            trustServerCertificate: true,
                            trustedConnection: true,
                            encrypt: true,
                            options: {
                                useUTC: false,
                            },
                        };
                    } else if (this.configuration.dialect === "postgres") {
                        sequelizeOption.dialectOptions = {
                            trustServerCertificate: true,
                            trustedConnection: true,
                            encrypt: true,
                            useUTC: false,
                        };
                    }
                    if (
                        this.configuration.total_slave > 0 &&
                        this.configuration.db_key !== ""
                    ) {
                        let read = [];
                        for (let i = 0; i < this.configuration.total_slave; i++) {
                            if (
                                process.env[
                                this.configuration.db_key + "_HOSTNAME_" + (i + 1)
                                ] &&
                                process.env[
                                this.configuration.db_key + "_USERNAME_" + (i + 1)
                                ] &&
                                process.env[this.configuration.db_key + "_PASSWORD_" + (i + 1)]
                            ) {
                                read.push({
                                    host: process.env[
                                        this.configuration.db_key + "_HOSTNAME_" + (i + 1)
                                    ],
                                    username:
                                        process.env[
                                        this.configuration.db_key + "_USERNAME_" + (i + 1)
                                        ],
                                    password:
                                        process.env[
                                        this.configuration.db_key + "_PASSWORD_" + (i + 1)
                                        ],
                                });
                            }
                        }
                        if (read.length > 0) {
                            sequelizeOption.replication = {
                                read: read,
                                write: {
                                    host: this.configuration.host,
                                    username: this.configuration.username,
                                    password: this.configuration.password,
                                },
                            };
                        }
                    }
                    console.log(JSON.stringify(sequelizeOption));
                    AppLoggerV2.d(NAMESPACE, `TEST`);

                    sequelize = new Sequelize(
                        this.configuration.database,
                        this.configuration.username,
                        this.configuration.password,
                        sequelizeOption
                    );

                    AppLoggerV2.d(
                        NAMESPACE,
                        `[ORM DRIVER (${this.selectedDriver})] Connection to ${this.configuration.database} is connecting...`
                    );

                    sequelize
                        .authenticate()
                        .then(async () => {
                            AppLoggerV2.d(
                                NAMESPACE,
                                `[ORM DRIVER (${this.selectedDriver})] Connection to ${this.configuration.database} has been established.`
                            );
                        })
                        .catch((error) => {
                            AppLoggerV2.e(
                                NAMESPACE,
                                `[ORM DRIVER (${this.selectedDriver})] Connection to ${this.configuration.database} cannot be establish: ${error}`
                            );
                        });

                    connection = sequelize;
                } catch (error) {
                    AppLoggerV2.d(
                        NAMESPACE,
                        `[KNEX DRIVER (${this.selectedDriver})] Connection to ${this.configuration.database} cannot be established: ${error}`
                    );
                }

                break;

            case "knex":
                try {
                    connection = Knex({
                        client: this.driverSynonym(),
                        connection: {
                            host: this.configuration.host,
                            port: this.configuration.port,
                            user: this.configuration.username,
                            password: this.configuration.password,
                            database: this.configuration.database,
                        },
                        pool: {
                            min: 0,
                            max: 100,
                        },
                    });

                    AppLoggerV2.d(
                        NAMESPACE,
                        `[KNEX DRIVER (${this.selectedDriver})] Connection to ${this.configuration.database} has been established.`
                    );
                } catch (error) {
                    AppLoggerV2.d(
                        NAMESPACE,
                        `[KNEX DRIVER (${this.selectedDriver})] Connection to ${this.configuration.database} cannot be established: ${error}`
                    );
                }
                break;

            case "knex":
                try {
                    connection = Knex({
                        client: this.driverSynonym(),
                        connection: {
                            host: this.configuration.host,
                            port: this.configuration.port,
                            user: this.configuration.username,
                            password: this.configuration.password,
                            database: this.configuration.database,
                        },
                        pool: {
                            min: 0,
                            max: 100,
                        },
                    });

                    AppLoggerV2.d(
                        NAMESPACE,
                        `[KNEX DRIVER (${this.selectedDriver})] Connection to ${this.configuration.database} has been established.`
                    );
                } catch (error) {
                    AppLoggerV2.d(
                        NAMESPACE,
                        `[KNEX DRIVER (${this.selectedDriver})] Connection to ${this.configuration.database} cannot be established: ${error}`
                    );
                }

                break;
        }

        return connection;
    }
}

/**
 * DatabaseSlave
 *
 * This function will return Slave that has been loaded with ORM Driver configuration.
 * 1 DatabaseSlave represent one Database Connection.
 *
 * The slave will only make a pool into enabled connection.
 * See config.database
 *
 * @param connection
 * @constructor
 */
export const DatabaseSlave = (connection: string = "main"): any => {
    type DatabaseConnectionObject = keyof typeof config.database;
    const selection = connection as DatabaseConnectionObject;
    console.log(config.database[selection])

    if (!config.database[selection].enable) {
        throw new Error(`WARNING: Connection ${connection} is not enabled!`);
    }
    return new DatabaseDriver(config.database[selection].orm_driver as string, {
        database: config.database[selection].database as string,
        username: config.database[selection].username as string,
        password: config.database[selection].password as string,
        host: config.database[selection].uri as string,
        port: config.database[selection].port as number,
        dialect: config.database[selection].dialect as Dialect,
        path: config.database[selection].path as Array<string>,
        total_slave: config.database[selection].total_slave as number,
        db_key: config.database[selection].db_key as string,
    }).authenticate();
};
