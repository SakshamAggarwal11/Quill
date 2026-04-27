export type MessageImage = {
  name: string;
  mimeType: string;
  base64: string;
  previewUrl: string;
};

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  images?: MessageImage[];
};
