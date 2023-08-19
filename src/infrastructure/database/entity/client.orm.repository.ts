import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClientOrm {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    public name: string;

}