import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    uuid: string

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    username: string

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    is_active: boolean;
}
