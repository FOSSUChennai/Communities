import { useEffect, useState } from 'react';

const SysRecog = () => {
  const [reqBrowser, setReqBrowser] = useState('');
  useEffect(() => {
    const getBrowser = () => {
      const userAgent = window.navigator.userAgent;

      if (userAgent.indexOf('Chrome') !== -1 && userAgent.indexOf('Edge') === -1) {
        return 'Google Chrome';
      } else if (userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Chrome') === -1) {
        return 'Safari';
      } else if (userAgent.indexOf('Firefox') !== -1) {
        return 'Firefox';
      } else if (userAgent.indexOf('Edge') !== -1) {
        return 'Microsoft Edge';
      } else if (userAgent.indexOf('Trident') !== -1) {
        return 'Internet Explorer';
      } else {
        return 'Unknown Browser';
      }
    };
    setReqBrowser(getBrowser);
    console.log(reqBrowser);
  }, []);
};

export default SysRecog;
