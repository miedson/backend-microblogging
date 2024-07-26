import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Followers } from "../followers/entity/followers.entity";

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

    @Column({ unique: true })
    username: string

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    is_active: boolean;
}
