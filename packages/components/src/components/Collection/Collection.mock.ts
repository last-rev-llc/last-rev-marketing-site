import { iconCenteredMock } from '../Card/Card.mock';

export const mediumIconCenterCollectionMock = {
  __typename: 'Collection',
  itemsSpacing: 2,
  variant: 'three-per-row',
  items: [{ ...iconCenteredMock }, { ...iconCenteredMock }, { ...iconCenteredMock }],
  itemsVariant: 'medium-icon-center'
};
