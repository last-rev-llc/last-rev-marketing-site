import { Form_BaseFragmentFragment } from '@last-rev-marketing-site/graphql-sdk';

export interface FormProps extends Form_BaseFragmentFragment {}

export interface FormClasses {
  root: string;
  introText: string;
  formContainer: string;
  formOuterContainer: string;
  successMessage: string;
  formMessage: string;
  dotsSquarePrimaryIcon: string;
  dotsSquareSecondaryIcon: string;
  styledFormControlLabel: string;
  bpCheckedIcon: string;
  bpIcon: string;
  styledChevronIcon: string;
}

export declare type FormClassKey = keyof FormClasses;
