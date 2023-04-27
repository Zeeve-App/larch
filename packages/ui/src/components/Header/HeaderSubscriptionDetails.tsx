import React from 'react';

interface HeaderSubscriptionDetailsProps {
  subscriptionValue: string;
}

const HeaderSubscriptionDetails: React.FC<HeaderSubscriptionDetailsProps> = (props) => {
  const { subscriptionValue } = props;
  return (
    <div className='flex-col items-start justify-center'>
      <p className='text-xs text-dark-400'>Monthly Subscription</p>
      <p className='text-sm font-semibold text-dark-900'>
        $
        {subscriptionValue}
      </p>
    </div>
  );
};

export { type HeaderSubscriptionDetailsProps, HeaderSubscriptionDetails };
