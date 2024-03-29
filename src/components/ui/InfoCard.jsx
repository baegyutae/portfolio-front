import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const InfoCard = ({ title, content, imageUrl }) => {
  return (
    <Card>
      {imageUrl && (
        <CardMedia component="img" image={imageUrl} alt="Card image" />
      )}
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2">{content}</Typography>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
