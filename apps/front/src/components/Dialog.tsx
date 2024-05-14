import { Dialog } from "@kobalte/core/dialog";
import "./Dialog.css";
import { JSX } from "solid-js";
import { AiOutlineCloseCircle } from 'solid-icons/ai'
type MyProps = {
    btnText: string,
    title: string,
    content: () => JSX.Element
    };
export function MyDialog({btnText, title, content}: MyProps) {
  return (
    <Dialog>
      <Dialog.Trigger class="dialog__trigger">{btnText}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class="dialog__overlay" />
        <div class="dialog__positioner">
          <Dialog.Content class="dialog__content">
            <div class="dialog__header">
              <Dialog.Title class="dialog__title">{title}</Dialog.Title>
              <Dialog.CloseButton class="dialog__close-button">
                <AiOutlineCloseCircle />
              </Dialog.CloseButton>
            </div>
            <Dialog.Description class="dialog__description">
              
                {content()}
              
            </Dialog.Description>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog>
  );
}