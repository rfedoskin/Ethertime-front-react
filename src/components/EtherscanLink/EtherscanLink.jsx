import React from 'react';
import { Trans } from 'react-i18next';
import Popover from '../Popover';
import IconButton from '../IconButton';
import IconLink from '../Icons/IconLink';

const EtherscanLink = () => {
  return (
    <Popover body={<Trans i18nKey="contractInfo.etherscanLabel" />} preferPlace="above">
      <IconButton>
        <IconLink />
      </IconButton>
    </Popover>
  );
};

export default EtherscanLink;
