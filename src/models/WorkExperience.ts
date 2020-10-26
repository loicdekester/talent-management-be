import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import User from './User';

@Entity()
class WorkExperience {
  @PrimaryGeneratedColumn()
  public id?: number;
  @Column()
  public jobTitle: string = "";
  @Column()
  public company: string = "";
  @Column()
  public location: string = "";
  @Column({ nullable: true })
  public begining?: Date;
  @Column({ nullable: true })
  public end?: Date;
  @Column()
  public description: string = "";
  @ManyToOne(type => User, user => user.experiences)
  public user?: User;

  constructor() { }

}

export default WorkExperience;
