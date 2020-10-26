import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import User from './User';

@Entity()
class Education {
  @PrimaryGeneratedColumn()
  public id?: number;
  @Column()
  public school: string = "";
  @Column()
  public degree: string = "";
  @Column({ nullable: true })
  public begining?: Date;
  @Column({ nullable: true })
  public end?: Date;
  @ManyToOne(type => User, user => user.educationList)
  public user?: User;

  constructor() { }

}

export default Education;
