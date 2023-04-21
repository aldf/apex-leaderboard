'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import {
  GiMountaintop,
  GiRoundBottomFlask,
  GiMeepleGroup,
} from 'react-icons/gi';

import SettingsBox from '../SettingsBox';
import Container from '../Container';


export const settings = [
  {
    label: 'Min',
    icon: GiRoundBottomFlask,
    description: 'This will get leadersBoard with the least points!',
  },
  {
    label: 'Max',
    icon: GiMountaintop,
    description: 'This will get leadersBoard with the most points!',
  },
  {
    label: 'Sum',
    icon: GiMeepleGroup,
    description: 'This will get leadersBoard with the sum of points!',
  }
]

const Settings = () => {
  const params = useSearchParams();
  const method = params?.get('setting');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {settings.map((item) => (
          <SettingsBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={method === item.label}
          />
        ))}
      </div>
    </Container>
  );
}
 
export default Settings;