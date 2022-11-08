interface ISocketMessage {
  type: string;
  verb?: string;
  metadata?: {
    user?: IUser;
  };
  data: any;
}

interface IUser {
  name: string;
}
