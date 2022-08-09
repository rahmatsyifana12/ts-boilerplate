import {
    BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './User';

@Entity('todos')
export class Todo extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.todos)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column({ name: 'user_id' })
    userId!: number;

    @Column({ length: 64 })
    title!: string;

    @Column({ length: 64 })
    content!: string;

}