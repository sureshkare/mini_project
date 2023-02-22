import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class EmployeeDetails {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    experience: number

    @Column({type: "decimal",  precision:2})
    salary: number

    @Column({type: 'timestamp'})
    created_at: string

    @Column({type: 'timestamp'})
    last_updated: string

    @Column({
    })
    phnoOne: number
}