import React, { useState } from 'react';
import Select, { SingleValue, GroupBase } from 'react-select';
import { useSidebarIconsStore, IconBlock } from '@/store/sidebarIconsStore'; // Adjust the import path as needed.
import { icons, IconOption } from '@/app/editor/_components/(skill)/icons'; // Adjust the import path as needed.

// Prepare icon options from the icons object
const iconOptions: IconOption[] = Object.keys(icons).map((iconName) => ({
  value: iconName,
  label: iconName,
}));

const IconSelect: React.FC = () => {
  // Assuming addIconToDefaultArea is the updated action for adding an icon directly to the default area
  const addIconToDefaultArea = useSidebarIconsStore(
    (state) => state.addIconToDefaultArea
  );
  const [selectedValue, setSelectedValue] = useState<IconOption | null>(null);

  // Handle change events from the select input
  const handleChange = (newValue: SingleValue<IconOption>) => {
    if (newValue) {
      // Create an IconBlock object with a unique id, the selected logo, and label
      const iconBlock: IconBlock = {
        id: Math.random().toString(36).substring(2, 15), // More unique ID
        logo: icons[newValue.value as keyof typeof icons],
        label: newValue.value,
      };
      addIconToDefaultArea(iconBlock); // Add the icon to the specified area in the Zustand store
      setSelectedValue(null); // Reset the selected value
    }
  };

  return (
    <Select<IconOption, false, GroupBase<IconOption>>
      options={iconOptions}
      value={selectedValue}
      onChange={handleChange}
      getOptionLabel={(option) => option.label}
      getOptionValue={(option) => option.value}
      className="text-base w-64" // Apply Tailwind CSS classes
      classNamePrefix="react-select"
      isClearable
      placeholder="Select an icon..."
    />
  );
};

export default IconSelect;
