export interface IProfile {
  name: string;
  country: string;
  state: string;
  city: string;
  email: string;
  birthday: Date;
  urlList: Map<string, string>;
}
