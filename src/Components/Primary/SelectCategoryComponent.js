import {Box, FormControl, FormHelperText, InputLabel, MenuItem} from "@mui/material";
import Select from "@mui/material/Select";

const SelectCategoryComponent = ({categories,setSelectedCategory}) => {

    return (
        <Box sx={{minWidth: "75%"}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Categorie</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Categoria"
                    onChange={(e) => {
                        setSelectedCategory(e.target.value)
                    }}
                >
                    {categories.map((category) => {
                            return <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                        }
                    )}
                </Select>

            </FormControl>
        </Box>
    );
}

export default SelectCategoryComponent;