import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
export class CafeEntity {


    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column()
    precio: number;
}
