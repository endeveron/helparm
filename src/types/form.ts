export interface IFormFieldData {
  value: string;
  error: string | null;
}

export interface IFormProps<T> {
  isLoading: boolean;
  isSuccess: boolean;
  onSubmitted: (data: T) => void;
}

export interface IFormInputs {
  [name: string]: string;
}
