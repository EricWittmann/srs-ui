import React from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, FlexItem, Spinner } from '@patternfly/react-core';
import CheckCircleIcon from '@patternfly/react-icons/dist/js/icons/check-circle-icon';
import PendingIcon from '@patternfly/react-icons/dist/js/icons/pending-icon';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/js/icons/exclamation-circle-icon';
import { statusOptions } from '@app/utils';
import './StatusColumn.css';

type StatusColumnProps = {
  status: string;
  instanceName: string;
};

const StatusColumn: React.FunctionComponent<StatusColumnProps> = ({ status, instanceName }) => {
  const { t } = useTranslation();

  const getStatus = () => {
    const filteredstatus = statusOptions.filter((st) => st.value?.toLowerCase() === status?.toLowerCase());
    if (filteredstatus.length === 1) {
      return t(`common.${filteredstatus[0].value?.toLowerCase()}`);
    } else {
      return t('common.creation_pending');
    }
  };

  const getStatusIcon = () => {
    switch (status?.toLowerCase()) {
      case statusOptions[0].value: // 'ready'
        return <CheckCircleIcon className="mk--instances__table--icon--completed" />;
      case statusOptions[1].value: // 'failed'
        return <ExclamationCircleIcon className="mk--instances__table--icon--failed" />;
      case statusOptions[2].value: // 'provisioning'
        return <Spinner size="md" aria-label={instanceName} aria-valuetext="Creation in progress" />;
      default:
        return <PendingIcon />;
    }
  };

  const statusIcon = getStatusIcon();

  return (
    <Flex>
      {statusIcon && <FlexItem spacer={{ default: 'spacerSm' }}>{statusIcon}</FlexItem>}
      <FlexItem>{getStatus()}</FlexItem>
    </Flex>
  );
};

export { StatusColumn };
