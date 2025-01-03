declare module "blip-chat-widget" {
  export class BlipChat {
    withAppKey(appKey: string): this;
    withButton(options: { color: string }): this;
    build(): this;
    destroy(): void;
  }
}
