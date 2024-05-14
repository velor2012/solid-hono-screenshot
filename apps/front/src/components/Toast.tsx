import { Toast, toaster } from "@kobalte/core/toast";
import "./Toast.css";
import { AiOutlineCloseCircle } from "solid-icons/ai";
let id: number;
type MyProps = {
    title: string,
    content: string
    };
export const showToast = (props: MyProps) => {
    const {  title, content } = props;
  id = toaster.show(props => (
    <Toast toastId={props.toastId} class="toast">
      <div class="toast__content">
        <div class="max-w-[80%]">
          <Toast.Title class="toast__title">{title}</Toast.Title>
          <Toast.Description class="toast__description">
            {content}
          </Toast.Description>
        </div>
        <Toast.CloseButton class="toast__close-button">
          <AiOutlineCloseCircle/>
        </Toast.CloseButton>
      </div>
      <Toast.ProgressTrack class="toast__progress-track">
        <Toast.ProgressFill class="toast__progress-fill" />
      </Toast.ProgressTrack>
    </Toast>
  ));
};
export const updateToast = () => {
  toaster.update(id, props => (
    <Toast toastId={props.toastId} class="toast">
      <div class="toast__content">
        <div>
          <Toast.Title class="toast__title">Event has been updated</Toast.Title>
          <Toast.Description class="toast__description">
            Friday, January 7th at 10:00pm
          </Toast.Description>
        </div>
        <Toast.CloseButton class="toast__close-button">
          <AiOutlineCloseCircle />
        </Toast.CloseButton>
      </div>
      <Toast.ProgressTrack class="toast__progress-track">
        <Toast.ProgressFill class="toast__progress-fill" />
      </Toast.ProgressTrack>
    </Toast>
  ));
};
export function MyToast() {
  return (
    <Toast.Region>
        <Toast.List class="toast__list" />
    </Toast.Region>
  );
}