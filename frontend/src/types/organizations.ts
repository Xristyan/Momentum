import { UserData } from './user';

export type Organization = {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  Users: UserData[];
};
