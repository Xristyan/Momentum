import { CreationOptional, DataTypes, Model } from "sequelize";

import sequelize from "../config/database";
import { hash } from "../utils/passwordHashing";

type UserAttributes = {
  id?: number;
  name?: string;
  email: string;
  password: string;
  googleId?: string;
  picture?: string;
  isVerified?: boolean;
};

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).

export class UserInstance extends Model<UserAttributes> {
  declare id: CreationOptional<number>;
  declare name: CreationOptional<string>;
  declare email: string;
  declare password: string;
  declare googleId: CreationOptional<string>;
  declare picture: CreationOptional<string>;
  declare isVerified: CreationOptional<boolean>;

  public declare addOrganization: (model: Model, options: unknown) => void;
}

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: "users_email",
        msg: "Email address already exists",
      },
      validate: {
        isEmail: {
          msg: "Invalid email address",
        },
        notEmpty: {
          msg: "Email address is required",
        },
      },
    },
    name: {
      type: DataTypes.STRING,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isValidPassword(value: string) {
          const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,])[A-Za-z\d@$!%*?&.,]{8,}$/;
          if (!passwordRegex.test(value)) {
            throw new Error(
              "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.",
            );
          }
        },
      },
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeCreate: async (user: UserInstance) => {
        if (user.password) {
          const password = await hash(user.password);
          user.password = password;
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          const password = await hash(user.password);
          user.password = password;
        }
      },
    },
    defaultScope: {
      attributes: { exclude: ["password", "googleId"] },
    },
    tableName: "Users",
    timestamps: true,
  },
);

export default User;
