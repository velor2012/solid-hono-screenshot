import { createSignal } from "solid-js";
import { Select } from "@kobalte/core/select";
type MyProps = {
    value: string,
    options: string[],
    onChange: (value: string) => void,
    description?: string
    };

export function SelectTypeCom(props: MyProps) {

  return (
    <div class="flex flex-col justify-center items-center">
      <Select
        options={props.options}
        placeholder="Select a type..."
        value={props.value}
        onChange={props.onChange}
        itemComponent={(props) => (
          <Select.Item item={props.item} class="select__item">
            <Select.ItemLabel>{props.item.rawValue}</Select.ItemLabel>
            <Select.ItemIndicator class="select__item-indicator">
              <div />
            </Select.ItemIndicator>
          </Select.Item>
        )}
      >
        <Select.Trigger class="select__trigger" aria-label="Fruit">
          <Select.Value<string> class="select__value">
            {(state) => state.selectedOption()}
          </Select.Value>
          <Select.Icon class="select__icon">
            <div />
          </Select.Icon>
        </Select.Trigger>
        {
            props.description && (
                <Select.Description>{props.description}</Select.Description>
            )
        }
        <Select.Portal>
          <Select.Content class="select__content">
            <Select.Listbox class="select__listbox" />
          </Select.Content>
        </Select.Portal>
      </Select>
    </div>
  );
}
