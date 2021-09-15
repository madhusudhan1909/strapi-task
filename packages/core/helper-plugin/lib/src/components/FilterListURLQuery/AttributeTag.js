import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@strapi/parts/Box';
import { Close } from '@strapi/icons';
import { Tag } from '@strapi/parts/Tag';
import { useIntl } from 'react-intl';

const AttributeTag = ({ attribute, filter, onClick, operator, value }) => {
  const { formatMessage, formatDate, formatTime, formatNumber } = useIntl();

  const handleClick = () => {
    onClick(filter);
  };

  const { fieldSchema } = attribute;

  const type = fieldSchema?.mainField?.schema.type || fieldSchema.type;

  let formattedValue = value;

  if (type === 'date') {
    formattedValue = formatDate(value, { dateStyle: 'full' });
  }

  if (type === 'datetime') {
    formattedValue = formatDate(value, { dateStyle: 'full', timeStyle: 'short' });
  }

  if (type === 'time') {
    const [hour, minute] = value.split(':');
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);

    formattedValue = formatTime(date, {
      numeric: 'auto',
      style: 'short',
    });
  }

  if (['float', 'integer', 'biginteger', 'decimal'].includes(type)) {
    formattedValue = formatNumber(value);
  }

  return (
    <Box padding={1} onClick={handleClick}>
      <Tag icon={<Close />}>
        {attribute.name}&nbsp;
        {formatMessage({
          id: `components.FilterOptions.FILTER_TYPES.${operator}`,
          defaultMessage: operator,
        })}
        &nbsp;
        {formattedValue}
      </Tag>
    </Box>
  );
};

AttributeTag.propTypes = {
  attribute: PropTypes.shape({
    name: PropTypes.string.isRequired,
    fieldSchema: PropTypes.object.isRequired,
  }).isRequired,
  filter: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  operator: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default AttributeTag;
