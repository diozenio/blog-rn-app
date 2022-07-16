import { PropsWithChildren } from "./PropsWithChildren";

export interface IButtonForm extends PropsWithChildren {
  onPress(): void | undefined;  
}
