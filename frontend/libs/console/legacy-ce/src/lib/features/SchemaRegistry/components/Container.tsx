import { useState } from 'react';
import { SchemaRegistryHome } from './SchemaRegistryHome';
import { FeatureRequest } from './FeatureRequest';
import globals from '../../../Globals';
import { SCHEMA_REGISTRY_FEATURE_NAME } from '../constants';
import { FaBell } from 'react-icons/fa';
import { IconTooltip } from '../../../new-components/Tooltip';
import { AlertsDialog } from './AlertsDialog';
import { Badge } from '../../../new-components/Badge';
import { SCHEMA_REGISTRY_REF_URL } from '../constants';
import { Analytics } from '../../Analytics';

const Header: React.VFC = () => {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <div className="flex mb-sm mt-md w-full">
        <h1 className="inline-block text-xl font-semibold mr-2 text-slate-900">
          GraphQL Schema Registry
        </h1>
        <Badge className="mx-2" color="blue">
          BETA
        </Badge>
        <Analytics name="data-schema-registry-alerts-btn">
          <div
            className="flex text-lg mt-2 mx-2 cursor-pointer"
            role="button"
            onClick={() => setIsAlertModalOpen(true)}
          >
            <IconTooltip
              message="Alerts on GraphQL schema changes"
              icon={<FaBell />}
            />
          </div>
        </Analytics>
      </div>
      <a
        className="text-muted w-auto mb-md"
        href={SCHEMA_REGISTRY_REF_URL}
        target="_blank"
        rel="noreferrer noopener"
      >
        What is Schema Registry?
      </a>
      {isAlertModalOpen && (
        <AlertsDialog onClose={() => setIsAlertModalOpen(false)} />
      )}
    </div>
  );
};

const Body: React.VFC<{ hasFeatureAccess: boolean }> = props => {
  const { hasFeatureAccess } = props;
  if (!hasFeatureAccess) {
    return <FeatureRequest />;
  }

  return <SchemaRegistryHome />;
};

export const SchemaRegistryContainer: React.VFC = () => {
  const hasFeatureAccess = globals.allowedLuxFeatures.includes(
    SCHEMA_REGISTRY_FEATURE_NAME
  );

  return (
    <div className="p-4 flex flex-col w-full">
      <Header />
      <Body hasFeatureAccess={hasFeatureAccess} />
    </div>
  );
};
