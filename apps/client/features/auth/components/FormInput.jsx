import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";

export const ControlledField = ({ control, name, label, type, rules }) => {
  const [show, setShow] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>

          <InputGroup>
            <InputGroupInput
              {...field}
              id={name}
              type={type === "password" ? (show ? "text" : "password") : type}
              aria-invalid={fieldState.invalid}
            />

            {type === "password" && (
              <InputGroupAddon
                align="inline-end"
                onClick={() => setShow((prev) => !prev)}
                style={{ cursor: "pointer" }}
              >
                {show ? <EyeOffIcon /> : <Eye />}
              </InputGroupAddon>
            )}
          </InputGroup>

          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const FormInputFieldList = ({ fields, control }) => {
  return (
    <FieldGroup>
      {fields.map((field) => (
        <ControlledField {...field} control={control} key={field.name} />
      ))}
    </FieldGroup>
  );
};
