import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Colors } from '../../utils/styles/ui';
import { IconLayout, Icondef, IconLabel } from './storybook-style';
import { ICON_NAMES } from '../../elements/constants/icons';
import Icon from '../../elements/icon';

const Iconset = ICON_NAMES.map((icon, index) =>
  <Icondef key={`icondef-${index}`}>
    <Icon key={`icon-${index}`} icon={icon} />
    <IconLabel key={`label-${index}`}>{icon}</IconLabel>
  </Icondef>
);

storiesOf('[Icons]', module)

.add(
  'default',
  withInfo('')(() =>
    <IconLayout>
      <Icondef>
        <Icon icon="bell" />
        <IconLabel>bell</IconLabel>
      </Icondef>
    </IconLayout>
  )
)

.add(
  'sizes',
  withInfo('')(() =>
    <IconLayout>
      <Icondef>
        <Icon icon="bell" size="small" />
        <IconLabel>bell<br />(small)</IconLabel>
      </Icondef>
      <Icondef>
        <Icon icon="bell" size="normal" />
        <IconLabel>bell<br />(normal)</IconLabel>
      </Icondef>
      <Icondef>
        <Icon icon="bell" size="large" />
        <IconLabel>bell<br />(large)</IconLabel>
      </Icondef>
      <Icondef>
        <Icon icon="bell" size={2.4} />
        <IconLabel>bell<br />(custom)</IconLabel>
      </Icondef>
    </IconLayout>
  )
)

.add(
  'colors (constants)',
  withInfo('')(() =>
    <IconLayout>
      <Icondef>
        <Icon icon="bell" color={Colors.blue} />
        <IconLabel>bell<br />(blue)</IconLabel>
      </Icondef>
      <Icondef>
        <Icon icon="bell" color={Colors.green} />
        <IconLabel>bell<br />(green)</IconLabel>
      </Icondef>
      <Icondef>
        <Icon icon="bell" color={Colors.red} />
        <IconLabel>bell<br />(red)</IconLabel>
      </Icondef>
      <Icondef>
        <Icon icon="bell" color={Colors.yellow} />
        <IconLabel>bell<br />(yellow)</IconLabel>
      </Icondef>
    </IconLayout>
  )
)

.add(
  'colors (#RGB)',
  withInfo('')(() =>
    <IconLayout>
      <Icondef>
        <Icon icon="bell" color="#0aafc4" />
        <IconLabel>bell<br />(#0aafc4)</IconLabel>
      </Icondef>
      <Icondef>
        <Icon icon="bell" color="#5dbaa3" />
        <IconLabel>bell<br />(#5dbaa3)</IconLabel>
      </Icondef>
      <Icondef>
        <Icon icon="bell" color="#f9696a" />
        <IconLabel>bell<br />(#f9696a)</IconLabel>
      </Icondef>
      <Icondef>
        <Icon icon="bell" color="#fec630" />
        <IconLabel>bell<br />(#fec630)</IconLabel>
      </Icondef>
    </IconLayout>
  )
)

.add(
  'all icons',
  withInfo('')(() =>
    <IconLayout>
      {Iconset}
    </IconLayout>
  )
);
