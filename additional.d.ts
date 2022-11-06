interface ISocketMessage {
  type: string;
  verb?: string;
  metadata?: {
    user_name?: string;
  };
  data: any;
}
