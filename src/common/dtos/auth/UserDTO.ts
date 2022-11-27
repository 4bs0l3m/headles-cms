import { BaseDTO } from '../common/BaseDTO';

export class UserDTO extends BaseDTO {
  email: string;
  password: string;
  displayName: string;
}
