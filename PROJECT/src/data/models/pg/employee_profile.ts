import {
    Model,
    Table,
    Column,
    DataType,
    Sequelize,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import { EmployeeProfileE, Gender } from "../../../domain";
import MEmployee from "./employee";

@Table({
    tableName: "employee_profile",
    timestamps: false,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
})
export default class MEmployeeProfileE extends Model<EmployeeProfileE> implements EmployeeProfileE {
    @Column({
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataType.BIGINT,
    })
    id?: number;

    @ForeignKey(() => MEmployee)
    @Column({
        allowNull: true,
        type: DataType.BIGINT,
    })
    employee_id?: number | undefined;

    @Column({
        allowNull: true,
        type: DataType.STRING(200),
    })
    place_of_birth?: string | undefined;

    @Column({
        allowNull: true,
        type: DataType.DATE,
    })
    date_of_birth?: Date | undefined;

    @Column({
        allowNull: true,
        type: DataType.ENUM('Laki-Laki','Perempuan'),
    })
    gender?: Gender | undefined;

    @Column({
        allowNull: true,
        type: DataType.BOOLEAN,
    })
    is_married?: boolean | undefined;

    @Column({
        allowNull: true,
        type: DataType.STRING(200),
    })
    prof_pict?: string | undefined;

    @Column({
        allowNull: true,
        type: DataType.STRING(255)
    })
    created_by?: string | undefined;

    @Column({
        allowNull: true,
        type: DataType.STRING(255)
    })
    updated_by?: string | undefined;

    @Column({
        allowNull: true,
        type: DataType.DATE(6),
        defaultValue: Sequelize.literal("now()"),
    })
    created_at?: Date | undefined;

    @Column({
        allowNull: true,
        type: DataType.DATE(6),
        defaultValue: Sequelize.literal("now()"),
    })
    updated_at?: Date | undefined;

    @BelongsTo(() => MEmployee, { foreignKey: 'employee_id' })
    employee!: MEmployee
}