import { reactive, ref } from "vue";
import type { Ref } from "vue";

type Message = {
  content: string;
  role: string;
  timestamp: string;
}

export class Conversation {
  id: number;
  messages: Message[];
  len: Ref<number>;
  state: Ref<boolean>;

  public constructor(id: number) {
    this.id = id;
    this.messages = reactive([]);
    this.state = ref(false);
    this.len = ref(0);
  }

  public addMessage(message: Message): void {
    this.state.value = true;
    this.messages.push(message);
    this.len.value++;
  }

  public addMessageFromUser(content: string): void {
    this.addMessage({
      content: content,
      role: "user",
      timestamp: new Date().toLocaleTimeString(),
    })
  }

  public addMessageFromAI(content: string): void {
    this.addMessage({
      content: content,
      role: "bot",
      timestamp: new Date().toLocaleTimeString(),
    })
  }

  public getMessages(): Message[] {
    return this.messages;
  }

  public getMessagesByRole(role: string): Message[] {
    return this.messages.filter(message => message.role === role);
  }

  public getLength(): Ref<number> {
    return this.len;
  }

  public getState(): Ref<boolean> {
    return this.state;
  }
}
