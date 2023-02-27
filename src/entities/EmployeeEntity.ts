import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable:true})
    name: string
}