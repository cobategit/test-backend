import {
    Model,
    Table,
    Column,
    DataType,
    Sequelize,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import { EmployeeFamilyE, RelationStatus, Religion } from "../../../domain";
import MEmployee from "./employee";

@Table({
    tableName: "tb_employee_profile",
    timestamps: false,
    underscored: true,
    createdAt: "create_at",
    updatedAt: "update_at",
})
export default class MEmployeeFamilyE extends Model<EmployeeFamilyE> implements EmployeeFamilyE {
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
    identifier?: string | undefined;

    @Column({
        allowNull: true,
        type: DataType.STRING(200),
    })
    job?: string | undefined;

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
        type: DataType.STRING,
    })
    religion?: Religion | undefined;

    @Column({
        allowNull: true,
        type: DataType.BOOLEAN,
    })
    is_life?: boolean | undefined;

    @Column({
        allowNull: true,
        type: DataType.BOOLEAN,
    })
    is_divorced?: boolean | undefined;

    @Column({
        allowNull: true,
        type: DataType.STRING,
    })
    relation_status?: RelationStatus;

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