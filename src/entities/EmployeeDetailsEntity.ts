import {Entity, PrimaryGeneratedColumn, Column, OneToOne,ManyToOne, JoinColumn} from 'typeorm';
import { Employee } from './EmployeeEntity';
import {Location} from './LocationEntity';

@Entity()
export class EmployeeDetails {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default:0})
    experience: number;

    @Column({type: "decimal",  precision:12, scale:2, default: 0})
    salary: number;

    @Column({nullable: true})
    created_at: Date;

    @Column({nullable: true})
    last_updated: Date;

    @Column()
    phno: string;

    @OneToOne(() => Employee, {cascade: true, eager: true, onDelete: 'CASCADE'})
    @JoinColumn()
    employee: Employee;

    @ManyToOne(() => Location, (location) => location.employeeDetails, {eager: true, onDelete: 'CASCADE'})
    location: Location;
}