import { TextField } from "@kobalte/core/text-field";
type MyProps = {
    value: number | string,
    title: number | string,
    setValue: (arg0: any) => void;
    onClick?: () => void;
    };

export function Input(props: MyProps) {
  if(!props.onClick) {
    props.onClick = ()=>{}
}
  return (
    <TextField
    onKeyUp={(event: KeyboardEvent) => {
      if (event.key === "Enter") {
        props.onClick!();
      }
    }}
    value={props.value}
    onChange={props.setValue}
    class="text-field"
  >
    <TextField.Label class="text-field__label">{props.title}</TextField.Label>
    <TextField.Input class="text-field__input" />
  </TextField>
  );
}
