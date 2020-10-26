import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import WorkExperience from './WorkExperience';
import Education from './Education';
import Language from './Language';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;
  @Column()
  public firstName: string = "";
  @Column()
  public lastName: string = "";
  @Column()
  public email: string = "";
  @Column()
  public password: string = "";
  @OneToMany(type => WorkExperience, workExperience => workExperience.user, { cascade: ['insert', 'update'], nullable: true })
  public experiences?: Array<WorkExperience>;
  @OneToMany(type => Education, education => education.user, { cascade: ['insert', 'update'], nullable: true })
  public educationList?: Array<Education>;
  @Column("text", { array: true, nullable: true })
  public skills?: Array<string>;
  @OneToMany(type => Language, language => language.user, { cascade: ['insert', 'update'], nullable: true })
  public languages?: Array<Language>;

  constructor() { }

}

export default User;
