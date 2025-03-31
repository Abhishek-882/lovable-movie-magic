import { Table, Column, Model, DataType, BeforeCreate, HasOne } from 'sequelize-typescript';
import { Profile } from './profile.model';
import bcrypt from 'bcryptjs';

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true
})
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  isEmailVerified: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  isProfileComplete: boolean;

  @HasOne(() => Profile)
  profile: Profile;

  @BeforeCreate
  static async hashPassword(user: User) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  toJSON() {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  }
}
