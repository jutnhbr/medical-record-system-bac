import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const NavBar = ({title, authenticated}) => {


    const handleLogout = () => {
        fetch("http://localhost:3001/logout", {
            method: "POST",

        })
            .then(() => {
                sessionStorage.removeItem("auth");
                sessionStorage.removeItem("key");
                window.location.reload();
            })
    }


    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="absolute" color={"primary"}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        MedEX {title}
                    </Typography>
                    {authenticated && <Button color="inherit"> Activity </Button>}
                    {authenticated && <Button color="inherit"> Support </Button>}
                    <Button color="inherit" onClick={handleLogout}> {authenticated ? "Logout" : "Login"}</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar;