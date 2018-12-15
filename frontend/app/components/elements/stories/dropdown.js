import React from 'react';
import { storiesOf } from '@storybook/react';

import { InputDropdown as MockSelect } from 'mocks/dropdowns';

import Dropdown from '../dropdown';

const Story = storiesOf('[Dropdown]', module);

/* eslint no-console:0 */
Story.add('Dropdown', () => (
  <Dropdown
    options={MockSelect}
    onSelect={(selected) => console.log(selected)}
  />
));

