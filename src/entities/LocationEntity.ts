import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    country: string
}