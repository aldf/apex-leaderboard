'use client';

import Select, { OptionsOrGroups } from 'react-select'
import Avatar from '../Avatar';

export type UserSelectValue = {
  image?: string;
  name?: string;
  email?: string;
  id: string
}

type UserSelectOptionsValue = {
  label: string;
  image: string;
  email: string;
  value: string
}

interface UserSelectProps {
  value?: UserSelectValue;
  users: UserSelectValue[] | null;
  onChange: (value: UserSelectValue) => void;
}

const UserSelect: React.FC<UserSelectProps> = ({
  value,
  users,
  onChange
}) => {
  var selectOptions= [] as UserSelectOptionsValue[];
  users?.map((user) => {
    selectOptions.push({
      value: user.id,
      label: user?.name ?? "",
      email: user?.email ?? "",
      image: user?.image ?? ""
    })
  })
  return ( 
    <div>
      <Select
        placeholder="Select User"
        isClearable
        options={users || []}
        value={value}
        onChange={(value) => onChange(value as UserSelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="
          flex flex-row items-center gap-3">
            <div>{option.image && <Avatar src={option.image} />}</div>
            <div>
              {option.name},
              <span className="text-neutral-500 ml-1">
                {option.email}
              </span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
    </div>
   );
}
 
export default UserSelect;