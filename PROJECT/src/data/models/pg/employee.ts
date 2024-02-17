import {
    Model,
    Table,
    Column,
    DataType,
    Sequelize,
    HasMany,
    HasOne,
} from "sequelize-typescript";
import { EmployeeE } from "../../../domain";
import MEmployeeProfileE from "./employee_profile";
import MEmployeeFamilyE from "./employee_family";
import MEmployeeEducationE from "./employee_education";

@Table({
    tableName: "tb_employee",
    timestamps: false,
    underscored: true,
    createdAt: "create_at",
    updatedAt: "update_at",
})
export default class MEmployee extends Model<EmployeeE> implements EmployeeE {
    @Column({
        allowNull: false,
        primaryKey: true,
        type: DataType.BIGINT,
    })
    id?: number;

    @Column({
        allowNull: true,
        type: DataType.STRING(255)
    })
    nik?: string | undefined;

    @Column({
        allowNull: true,
        type: DataType.STRING(255)
    })
    name?: string | undefined;

    @Column({
        allowNull: true,
        type: DataType.BOOLEAN
    })
    is_active?: boolean | undefined;

    @Column({
        allowNull: true,
        type: DataType.DATE
    })
    start_date?: Date | undefined;

    @Column({
        allowNull: true,
        type: DataType.DATE
    })
    end_date?: Date | undefined;

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

    @HasOne(() => MEmployeeProfileE, {foreignKey: 'employee_id'})
    employee_profile!: MEmployeeProfileE

    @HasMany(() => MEmployeeFamilyE, { foreignKey: 'employee_id' })
    employee_family!: MEmployeeFamilyE

    @HasOne(() => MEmployeeEducationE, {foreignKey: 'employee_id'})
    employee_education!: MEmployeeEducationE
}