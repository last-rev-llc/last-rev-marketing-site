import React from 'react';
import { ContentModule } from '@last-rev/component-library';
import BackToTop from '@last-rev/component-library/dist/components/BackToTop/BackToTop';
import styled from '@mui/system/styled';
import { Topic } from '@last-rev-marketing-site/graphql-sdk';

const TopicGeneral = ({ header, hero, contents, footer, disableBackToTop }: Topic & { __typename: string }) => {
  return (
    <>
      {header ? <ContentModule {...(header as any)} /> : null}

      {hero ? <ContentModule {...(hero as any)} /> : null}

      <Contents>
        {contents?.map((content: any) => (
          <ContentModule key={content?.id} {...(content as any)} as="section" />
        ))}
      </Contents>

      {!disableBackToTop ? <BackToTop /> : null}

      {footer ? <ContentModule {...(footer as any)} /> : null}
    </>
  );
};
const Contents = styled('main', {
  name: 'TopicGeneral',
  slot: 'Contents',
  overridesResolver: (_, styles) => [styles.contents]
})``;

export default TopicGeneral;
