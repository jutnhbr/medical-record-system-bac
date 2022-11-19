import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";

const CircularLoader = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: "center" }}>
            <CircularProgress />
        </Box>
    );
}

export default CircularLoader;