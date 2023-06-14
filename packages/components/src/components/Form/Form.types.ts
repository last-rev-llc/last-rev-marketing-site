import { Form_BaseFragmentFragment } from '@drata-website/graphql-sdk';

export interface FormProps extends Form_BaseFragmentFragment {
  submitted?: boolean;
  hasSuccessMessage?: boolean;
}

export interface FormClasses {
  root: string;
  introText: string;
  formContainer: string;
  formOuterContainer: string;
  successMessage: string;
}

export declare type FormClassKey = keyof FormClasses;
