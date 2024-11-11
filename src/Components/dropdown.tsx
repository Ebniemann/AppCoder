import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface DropdownOptions {
  label: string;
  value: string;
  icon?: (visible?: true) => JSX.Element;
}

interface DropComponentProps {
  options: DropdownOptions[];
  labelField?: keyof DropdownOptions;
  valueField?: keyof DropdownOptions;
  renderLeftIcon?: (visible?: true) => JSX.Element;
}

const DropdownComponent: React.FC<DropComponentProps> = ({
  options,
  renderLeftIcon,
}) => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Dropdown
      iconStyle={styles.iconStyle}
      data={options}
      maxHeight={300}
      labelField="label"
      valueField="value"
      value={value}
      onChange={(item) => {
        setValue(item.value);
      }}
      renderLeftIcon={renderLeftIcon}
      placeholder=""
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  icon: {
    marginRight: 5,
  },
  iconStyle: {
    display: "none",
  },
});
