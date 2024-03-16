import React from "react";
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import backgroundImage from './bg.jpg'; 

const MiddleSection = () => {
    const theme = useTheme();
    const isSmScreen = useMediaQuery(theme.breakpoints.down('sm')); 
    const isMdScreen = useMediaQuery(theme.breakpoints.only('md')); 

    return (
        <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justify="center"
            style={{
                minHeight: "calc(100vh - 64px)", // Subtract the height of the header (64px)
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                overflow: "hidden",
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: isSmScreen ? "10px" : (isMdScreen ? "10px" : "150px"), 
                paddingLeft: isSmScreen ? "10px" : (isMdScreen ? "10px" : "100px"), 
                color: isSmScreen ? "black" : "#d3d3d3", 
            }}
        >
            <Grid item xs={12} sm={6} md={6}>
                <Typography variant={isSmScreen ? "h6" : "h4"} style={{paddingLeft: isSmScreen ? "20px" : "0"}}>
                    Address Updater
                </Typography>
                <Typography variant="body1" style={{ marginBottom: isSmScreen ? "150px" : "0", padding: isSmScreen ? "20px" : "0"}}>
                    {isSmScreen
                        ? "Welcome to Address Updater, your one-stop solution for efficient address management. Our platform enables users to seamlessly add, edit, and delete addresses with complete information, ensuring accuracy and completeness through built-in validation mechanisms. With real-time updates and intuitive user interface, users can easily navigate through functionalities, making data management a breeze. "
                        : "Welcome to Address Updater, your one-stop solution for efficient address management. Our platform enables users to seamlessly add, edit, and delete addresses with complete information, ensuring accuracy and completeness through built-in validation mechanisms. With real-time updates and intuitive user interface, users can easily navigate through functionalities, making data management a breeze. Whether it's updating existing addresses or handling potential conflicts, our system ensures a smooth experience, empowering users to maintain organized and up-to-date address records effortlessly. Experience the convenience of address management with Address Updater today."
                    }
                </Typography>
            </Grid>
        </Grid>
    );
}

export default MiddleSection;
