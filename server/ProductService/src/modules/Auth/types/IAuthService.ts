import { Observable } from 'rxjs';
import { Role } from 'src/guard/role.guard';

export interface IUser {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  fullname: string;
  avatar: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
  status: number;
  role: Role;
}

export interface IUserService {
  CheckAuth?: (data: CheckAuthRequest) => Observable<CheckAuthRespone>;
}
export interface CheckAuthRespone {
  code: string;
  message: string;
  success: boolean;
  user: IUser;
}
export interface CheckAuthRequest {
  token: string;
}
