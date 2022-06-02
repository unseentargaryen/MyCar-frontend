import {Box, FormControl, FormHelperText, InputLabel, MenuItem} from "@mui/material";
import Select from "@mui/material/Select";
import {useEffect} from "react";

const SelectSubcategoryComponent = ({subcategories, selectedCategory, disabled, setSelectedSubcategory}) => {
    let show_subcat = subcategories;
    if (selectedCategory !== 0) {
        show_subcat = subcategories.filter((subcategory) => selectedCategory === subcategory.category_id)
    }

    return (
        <Box sx={{minWidth: "75%"}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sottocategorie</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Sottocategorie"
                    disabled={disabled}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                >
                    {
                        show_subcat.map((subcategory) => <MenuItem key={subcategory.id}
                                                                   value={subcategory.id}>{subcategory.name}</MenuItem>)
                    }
                </Select>
                {selectedCategory === 0 ? <FormHelperText>Seleziona la categoria per abilitare</FormHelperText> : ''}
            </FormControl>
        </Box>
    );
}

export default SelectSubcategoryComponent;