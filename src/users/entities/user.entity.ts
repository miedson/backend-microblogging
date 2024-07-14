import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    uuid: string

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    username: string

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    isActive: boolean;
}
