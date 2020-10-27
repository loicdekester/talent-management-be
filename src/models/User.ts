import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import WorkExperience from './WorkExperience';
import Education from './Education';
import Language from './Language';
import { rejects } from 'assert';

const secret: string = process.env.SECRET || "secret"

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

  async setEncryptedPassword(password: string): Promise<void> {
    await new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, async (err: Error, hash: string) => {
        if (err) {
          reject(err);
        } else {
          this.password = hash;
          resolve();
        }
      });
    });
  }

  generateJWT(): string {
    return sign({
      id: this.id,
      email: this.email,
    }, secret);
  };

  static async hasGoodCredentials(password1: string, password2: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password1, password2, async (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    });
  }


}

export default User;
