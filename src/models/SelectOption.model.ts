export interface SelectOption<T = any> {
  label: string | JSX.Element;
  iconClassName?: string;
  icon?: JSX.Element;
  value: T;
}
