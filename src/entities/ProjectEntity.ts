import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from 'typeorm';
import { Employee } from './EmployeeEntity';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Employee, {cascade: true, eager: true, onDelete: 'CASCADE'})
    @JoinTable()
    employee: Employee[];

}