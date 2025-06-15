export interface UserData {
  data: {
    id: number;
    name?: string;
    email: string;
    picture?: string;
    createdAt?: string;
    isVerified?: boolean;
    Membership?: {
      id: number;
      role: string;
      xp: number;
      UserId: number;
      OrganizationId: number;
    };
    Organizations?: Array<{
      id: number;
      name: string;
      description?: string;
      technologies?: string[];
      Membership: {
        id: number;
        role: string;
        xp: number;
        UserId: number;
        OrganizationId: number;
      };
    }>;
    [key: string]: unknown;
  };
}
