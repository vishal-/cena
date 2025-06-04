import { useMemo, useState, type SetStateAction } from "react";
import { Box, Chip, TextField, Autocomplete } from "@mui/material";
import json from "../constants/dishes_sample.json";

interface PlanBoxProps {
  meal: string;
  disable: boolean;
}

type DishesDataSetType = {
  [MealType: string]: {
    name: string;
    description: string;
  }[];
};

const PlanBox: React.FC<PlanBoxProps> = ({ meal, disable }) => {
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const options = useMemo(() => {
    const dishes = (json as DishesDataSetType)[meal as string];

    return dishes.map(({ name }) => name);
  }, [meal]);

  // Handle the addition of chips
  const handleChange = (_event: unknown, newValue: string[]) => {
    setSelectedChips(newValue);
  };

  // Handle changes in input field
  const handleInputChange = (
    _event: unknown,
    newInputValue: SetStateAction<string>
  ) => {
    setInputValue(newInputValue);
  };

  return (
    <Box sx={{ my: 3 }}>
      <Autocomplete
        multiple
        id="tags-outlined"
        disabled={disable}
        value={selectedChips}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        options={options}
        freeSolo // Allow typing custom values not just from the list
        renderInput={(params) => <TextField {...params} label={meal} />}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip label={option} {...getTagProps({ index })} key={index} />
          ))
        }
      />
    </Box>
  );
};

export default PlanBox;
