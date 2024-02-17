import {
    Model,
    Table,
    Column,
    DataType,
    Sequelize,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import { EmployeeEducationE, Level } from "../../../domain";
import MEmployee from "./employee";

@Table({
    tableName: "tb_employee_profile",
    timestamps: false,
    underscored: true,
    createdAt: "create_at",
    updatedAt: "update_at",
})
export default class MEmployeeEducationE extends Model<EmployeeEducationE> implements EmployeeEducationE {
    @Column({
        allowNull: false,
        primaryKey: true,
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
    name?: string | undefined;

    @Column({
        allowNull: true,
        type: DataType.STRING(200),
    })
    level?: Level;
    
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