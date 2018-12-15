import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import { SpacerHorizontal, SpacerVertical }
  from './storybook-style';
import Button from '../../elements/button';
import Icon from '../../elements/icon';

const labelText = 'Button';
const labelIcon = <Icon icon="bell" />;

storiesOf('[Buttons]', module)

.add('default',
  withInfo('')(() =>
    <Button onClick={action('myEvent')}>{labelText}</Button>
  )
)

.add(
  'sizes',
  withInfo('')(() =>
    <div>
      <Button size="small">{labelText}</Button>
      <SpacerHorizontal />
      <Button size="normal">{labelText}</Button>
      <SpacerHorizontal />
      <Button size="large">{labelText}</Button>
    </div>
  )
)

.add(
  'colors',
  withInfo('')(() =>
    <div>
      <Button color="primary">{labelText}</Button>
      <SpacerHorizontal />
      <Button color="secondary">{labelText}</Button>
      <SpacerHorizontal />
      <Button color="warning">{labelText}</Button>
      <SpacerHorizontal />
      <Button color="danger">{labelText}</Button>
      <SpacerHorizontal />
      <Button color="mono">{labelText}</Button>
      <SpacerHorizontal />
      <Button color="monoLight">{labelText}</Button>
    </div>
  )
)

.add(
  'outline',
  withInfo('')(() =>
    <div>
      <Button type="outline" color="primary">{labelText}</Button>
      <SpacerHorizontal />
      <Button type="outline" color="secondary">{labelText}</Button>
      <SpacerHorizontal />
      <Button type="outline" color="danger">{labelText}</Button>
      <SpacerHorizontal />
      <Button type="outline" color="warning">{labelText}</Button>
      <SpacerHorizontal />
      <Button type="outline" color="mono">{labelText}</Button>
    </div>
  )
)

.add(
  'inverted',
  withInfo('')(() =>
    <div>
      <Button type="inverted" color="primary">{labelText}</Button>
      <SpacerHorizontal />
      <Button type="inverted" color="secondary">{labelText}</Button>
      <SpacerHorizontal />
      <Button type="inverted" color="danger">{labelText}</Button>
      <SpacerHorizontal />
      <Button type="inverted" color="warning">{labelText}</Button>
      <SpacerHorizontal />
      <Button type="inverted" color="mono">{labelText}</Button>
    </div>
  )
)

.add(
  'blank',
  withInfo('')(() =>
    <div>
      <Button type="blank" color="primary">{labelText}</Button>
      <SpacerHorizontal />
      <Button type="blank" color="secondary">{labelText}</Button>
      <SpacerHorizontal />
      <Button type="blank" color="danger">{labelText}</Button>
      <SpacerHorizontal />
      <Button type="blank" color="warning">{labelText}</Button>
      <SpacerHorizontal />
      <Button type="blank" color="mono">{labelText}</Button>
    </div>
  )
)

.add(
  'mono',
  withInfo('')(() =>
    <div>
      <Button type="mono" color="primary">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button type="mono" color="secondary">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button type="mono" color="danger">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button type="mono" color="warning">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button type="mono" color="mono">{labelIcon}{labelText}</Button>
    </div>
  )
)

.add(
  'loading',
  withInfo('')(() =>
    <div>
      <Button loading color="primary">{labelText}</Button>
      <SpacerHorizontal />
      <Button loading color="secondary">{labelText}</Button>
      <SpacerHorizontal />
      <Button loading color="warning">{labelText}</Button>
      <SpacerHorizontal />
      <Button loading color="danger">{labelText}</Button>
      <SpacerHorizontal />
      <Button loading color="mono">{labelText}</Button>
    </div>
  )
)

.add(
  'disabled',
  withInfo('')(() =>
    <div>
      <Button disabled color="primary">{labelText}</Button>
      <SpacerHorizontal />
      <Button disabled color="secondary">{labelText}</Button>
      <SpacerHorizontal />
      <Button disabled color="warning">{labelText}</Button>
      <SpacerHorizontal />
      <Button disabled color="danger">{labelText}</Button>
      <SpacerHorizontal />
      <Button disabled color="mono">{labelText}</Button>
    </div>
  )
)

.add(
  'loading + disabled',
  withInfo('')(() =>
    <div>
      <Button disabled loading color="primary">{labelText}</Button>
      <SpacerHorizontal />
      <Button disabled loading color="secondary">{labelText}</Button>
      <SpacerHorizontal />
      <Button disabled loading color="warning">{labelText}</Button>
      <SpacerHorizontal />
      <Button disabled loading color="danger">{labelText}</Button>
      <SpacerHorizontal />
      <Button disabled loading color="mono">{labelText}</Button>
    </div>
  )
)

.add(
  'with <Icon />',
  withInfo('')(() =>
    <div>
      <Button>{labelIcon}</Button>
      <SpacerHorizontal />
      <Button>{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button>{labelText}{labelIcon}</Button>
      <SpacerHorizontal />
      <Button>{labelIcon}{labelText}{labelIcon}</Button>

      <SpacerVertical />

      <Button size="small">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button size="normal">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button size="large">{labelIcon}{labelText}</Button>

      <SpacerVertical />

      <Button color="primary">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button color="secondary">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button color="warning">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button color="danger">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button color="mono">{labelIcon}{labelText}</Button>

      <SpacerVertical />

      <Button type="outline" color="primary">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button type="outline" color="secondary">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button type="outline" color="danger">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button type="outline" color="warning">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button type="outline" color="mono">{labelIcon}{labelText}</Button>

      <SpacerVertical />

      <Button type="inverted" color="primary">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button type="inverted" color="secondary">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button type="inverted" color="danger">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button type="inverted" color="warning">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button type="inverted" color="mono">{labelIcon}{labelText}</Button>

      <SpacerVertical />

      <Button loading color="primary">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button loading color="secondary">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button loading color="warning">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button loading color="danger">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button loading color="mono">{labelIcon}{labelText}</Button>

      <SpacerVertical />

      <Button disabled color="primary">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button disabled color="secondary">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button disabled color="warning">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button disabled color="danger">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button disabled color="mono">{labelIcon}{labelText}</Button>

      <SpacerVertical />

      <Button disabled loading color="primary">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button disabled loading color="secondary">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button disabled loading color="warning">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button disabled loading color="danger">{labelIcon}{labelText}</Button>
      <SpacerHorizontal />
      <Button disabled loading color="mono">{labelIcon}{labelText}</Button>
    </div>
  )
);
