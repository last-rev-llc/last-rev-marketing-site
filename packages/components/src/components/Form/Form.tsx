import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ContentModule from '../ContentModule';

import { FormProps } from './Form.types';
import Head from 'next/head';

import React from 'react';

import dynamic from 'next/dynamic';
import sidekick from '@last-rev/contentful-sidekick-util';
import { styled } from '@mui/material/styles';
import { createPortal } from 'react-dom';
import { Button } from '@mui/material';

// @ts-ignore
const HSForm = dynamic(() => import('react-hubspot-form'), { ssr: false });

const Form = ({ variant, hubspotPortalId, hubspotFormId, headerText, successText, sidekickLookup }: FormProps) => {
  const [formContainer, setFormContainer] = React.useState<HTMLDivElement | undefined>(undefined);
  const [submitContainer, setSubmitContainer] = React.useState<HTMLDivElement | undefined>(undefined);
  const [submitLabel, setSubmitLabel] = React.useState('');
  // const [allowedValues, setAllowedValues] = React.useState<{ id: string; label: string }[]>([]);
  // const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
  const [submitted, setSubmitted] = React.useState(false);
  const ownerState = { variant, submitted, hasSuccessMessage: !!successText?.json };

  // const ishubspotFormChecks = variant === 'hubspotFormChecks';

  const handleSubmit = () => {
    console.log(successText);
    setSubmitted(true);
  };

  const handleReady = () => {
    try {
      const targetForm = document.getElementById(`hsForm_${hubspotFormId}`);
      if (!targetForm) return;
      const ulEls = targetForm.getElementsByClassName('inputs-list');
      const ul = ulEls?.[0] as HTMLUListElement;
      if (!ul) return;
      const inputWrapper = ul.parentElement as HTMLDivElement;
      if (!inputWrapper) return;
      // const inputs = inputWrapper.getElementsByClassName('hs-input');
      // const values = [];
      // // @ts-ignore
      // for (const input of inputs) {
      //   values.push({ id: input.id, label: input.value });
      // }
      // if (ul.style) {
      //   ul.style.display = 'none';
      // }
      // setAllowedValues(values);
      setFormContainer(inputWrapper);
      /**
       * Change Submit button
       */
      const actionsEls = targetForm.getElementsByClassName('actions');
      const actionWrapper = actionsEls?.[0] as HTMLDivElement;
      if (!actionWrapper) return;
      const submitEls = actionWrapper.getElementsByClassName('hs-button');
      const submitEl = submitEls?.[0] as HTMLInputElement;
      if (!submitEl) return;
      submitEl.style.display = 'none';
      setSubmitLabel(submitEl.value);
      setSubmitContainer(actionWrapper);
    } catch (err) {}
  };

  // const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
  //   const values = event.target.value as string[];
  //   setSelectedValues(values);
  //   for (const allowedValue of allowedValues) {
  //     const check = !!values.find((item) => item === allowedValue.id);
  //     const name = `input[id="${allowedValue.id}"]`;
  //     $(name).prop('checked', check);
  //   }
  // };

  // const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const id = event.target.id;
  //   if (selectedValues.includes(id)) {
  //     setSelectedValues((prev) => prev.filter((value) => id !== value));
  //   } else {
  //     setSelectedValues([...selectedValues, id]);
  //   }
  // };

  return (
    <>
      <Root ownerState={ownerState}>
        <FormOuterContainer ownerState={ownerState}>
          <Head>
            <script async type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.min.js" />
          </Head>
          {!!headerText && (
            <HeaderText
              {...sidekick(sidekickLookup, 'headerText')}
              __typename="Text"
              body={headerText}
              variant={variant === 'hubspotFormFooter' ? variant : 'detailPageBody'}
              ownerState={ownerState}
            />
          )}
          {/* @ts-ignore */}
          <FormContainer ownerState={ownerState}>
            {/* @ts-ignore */}
            <HSForm
              //   @ts-ignore
              portalId={hubspotPortalId}
              formId={hubspotFormId}
              onSubmit={() => {
                /**
                 * react-hubspot-form expects this callback to
                 * be here and will throw an error if not found
                 */
              }}
              onReady={handleReady}
              onFormSubmitted={handleSubmit}
              // inlineMessage={!!successMessage ? ' ' : undefined}
              loading={<CircularProgress />}
            />
          </FormContainer>
          {submitted && (
            <SuccessMessage {...sidekick(sidekickLookup, 'successText')} __typename="Text" body={successText} />
          )}
        </FormOuterContainer>
      </Root>
      {/* {formContainer &&
        createPortal(
          <FormControl
            fullWidth
            sx={{
              'display': 'inline-flex !important',
              'mt': 2,
              '.MuiOutlinedInput-notchedOutline': {
                backgroundColor: 'white !important',
                border: '1px solid #BEBEBE'
              },
              '.MuiOutlinedInput-input': {
                zIndex: 10
              },
              '.MuiSelect-icon': {
                zIndex: 10
              }
            }}>
            {ishubspotFormChecks ? (
              <FormGroup
                row
                sx={{
                  alignSelf: 'start'
                }}>
                {allowedValues.map((value) => (
                  <StyledFormControlLabel
                    checked={selectedValues.includes(value.id)}
                    control={
                      <Checkbox
                        onChange={(event: any) => handleCheckChange(event)}
                        id={value.id}
                        disableRipple
                        checkedIcon={<BpCheckedIcon />}
                        icon={<BpIcon />}
                      />
                    }
                    label={value.label}
                  />
                ))}
              </FormGroup>
            ) : (
              <Select
                value={selectedValues}
                onChange={handleSelectChange}
                multiple
                fullWidth
                MenuProps={{
                  disableScrollLock: false
                }}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return 'Select';
                  }

                  return (
                    <Typography
                      noWrap
                      // sx={{ maxWidth: { sm: 240, md: 'initial', lg: 220 } }}
                    >
                      {selected
                        .map((item) => {
                          return allowedValues.find((option) => option?.id === item)?.label;
                        })
                        .join(', ')}
                    </Typography>
                  );
                }}>
                {allowedValues.map((value) => (
                  <MenuItem key={value.id} value={value.id}>
                    <Checkbox checked={selectedValues.indexOf(value?.id ?? '') > -1} />
                    <ListItemText primary={value.label} />
                  </MenuItem>
                ))}
              </Select>
            )}
          </FormControl>,
          formContainer
        )} */}
      {submitContainer &&
        createPortal(
          <SubmitButton
            // variant="ctaModule"
            type="submit"
            sx={{ width: '100%' }}
            // startIcon={!ishubspotFormChecks && <AngledArrowIcon />}
            // endIcon={!ishubspotFormChecks ? <AngledArrowIcon /> : <StyledChevronIcon />}
          >
            {submitLabel}
          </SubmitButton>,
          submitContainer
        )}
    </>
  );
};

const Root = styled(Box, {
  name: 'Form',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState?: any }>(() => ({}));

const HeaderText = styled(ContentModule, {
  name: 'Form',
  slot: 'HeaderText',
  overridesResolver: (_, styles) => [styles.headerText]
})<{ ownerState?: any }>(() => ({}));

const FormOuterContainer = styled(Box, {
  name: 'Form',
  slot: 'FormOuterContainer',
  overridesResolver: (_, styles) => [styles.formOuterContainer]
})<{ ownerState?: any }>(() => ({}));

const FormContainer = styled(Box, {
  name: 'Form',
  slot: 'FormContainer',
  overridesResolver: (_, styles) => [styles.formContainer]
})(() => ({}));

const SuccessMessage = styled(ContentModule, {
  name: 'Form',
  slot: 'SuccessMessage',
  overridesResolver: (_, styles) => [styles.successMessage]
})(() => ({}));
const SubmitButton = styled(Button, {
  name: 'Form',
  slot: 'SubmitButton',
  overridesResolver: (_, styles) => [styles.submitButton]
})(({ theme }) => ({
  'padding': theme.spacing(1),
  'borderRadius': theme.spacing(3),
  // ...theme.typography.cta2,
  '[class*=MuiButton-startIcon] > *:nth-of-type(1)': {
    fontSize: 14
  },
  '[class*=MuiButton-endIcon] > *:nth-of-type(1)': {
    fontSize: 14,
    marginLeft: 0,
    transform: 'scale(-1, 1)'
  }
}));
export default Form;
