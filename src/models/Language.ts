import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import User from './User';

@Entity()
class Language {
  @PrimaryGeneratedColumn()
  public id?: number;
  @Column()
  public language: string = "";
  @Column()
  public speaking: number = 0;
  @Column()
  public reading: number = 0;
  @Column()
  public writing: number = 0;
  @ManyToOne(type => User, user => user.languages)
  public user?: User;

  constructor() { }

}

export default Language;
