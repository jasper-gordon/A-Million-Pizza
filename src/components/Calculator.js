import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";

export const Calculator = () => {
  const [values, setValues] = React.useState({
    water: 70,
    salt: 2.5,
    yeast: 0.5,
    oil: 1,
    size: 350,
    pizzas: 2,
    flour: 100,
  });

  const [weights, setWeights] = React.useState({
    flour: 0,
    water: 0,
    salt: 0,
    yeast: 0,
    oil: 0,
  });

  const calculateRecipe = () => {
    console.log(
      values.flour + values.water + values.salt + values.yeast + values.oil
    );
    let totalPercent =
      (values.flour + values.water + values.salt + values.yeast + values.oil) *
      0.01;
    console.log("Percent " + totalPercent);
    let totalWeight = values.size * values.pizzas;
    console.log("Weight" + totalWeight);
    const flourW = totalWeight / totalPercent
    console.log("Flour" + flourW);
    setWeights({flour: flourW});
    setWeights({water: weights.flour * values.water});
    setWeights({salt: weights.flour * values.salt});
    setWeights({yeast: weights.flour * values.yeast});
    setWeights({oil: weights.flour * values.oil});
    console.log("flour weight: " +  weights.flour)
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const updateWeights = (prop) => (event) => {
    setWeights({ ...weights, [prop]: event.target.value });
    console.log("I was called");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FormControl sx={{ m: 1, width: "9ch" }} variant="outlined">
        <OutlinedInput
          id="outlined-adornment-water"
          value={values.water}
          onChange={handleChange("water")}
          endAdornment={<InputAdornment position="end">%</InputAdornment>}
          error={values.water !== "" && isNaN(values.water)}
          aria-describedby="outlined-water-helper-text"
          inputProps={{
            "aria-label": "water",
          }}
        />
        <FormHelperText id="outlined-water-helper-text">Water</FormHelperText>
      </FormControl>

      <FormControl sx={{ m: 1, width: "9ch" }} variant="outlined">
        <OutlinedInput
          id="outlined-adornment-salt"
          value={values.salt}
          onChange={handleChange("salt")}
          endAdornment={<InputAdornment position="end">%</InputAdornment>}
          error={values.salt !== "" && isNaN(values.salt)}
          aria-describedby="outlined-salt-helper-text"
          inputProps={{
            "aria-label": "salt",
          }}
        />
        <FormHelperText id="outlined-salt-helper-text">Salt</FormHelperText>
      </FormControl>

      <FormControl sx={{ m: 1, width: "9ch" }} variant="outlined">
        <OutlinedInput
          id="outlined-adornment-yeast"
          value={values.yeast}
          onChange={handleChange("yeast")}
          endAdornment={<InputAdornment position="end">%</InputAdornment>}
          error={values.yeast !== "" && isNaN(values.yeast)}
          aria-describedby="outlined-yeast-helper-text"
          inputProps={{
            "aria-label": "yeast",
          }}
        />
        <FormHelperText id="outlined-yeast-helper-text">Yeast</FormHelperText>
      </FormControl>

      <FormControl sx={{ m: 1, width: "9ch" }} variant="outlined">
        <OutlinedInput
          id="outlined-adornment-oil"
          value={values.oil}
          onChange={handleChange("oil")}
          endAdornment={<InputAdornment position="end">%</InputAdornment>}
          error={values.oil !== "" && isNaN(values.oil)}
          aria-describedby="outlined-oil-helper-text"
          inputProps={{
            "aria-label": "oil",
          }}
        />
        <FormHelperText id="outlined-oil-helper-text">Oil</FormHelperText>
      </FormControl>

      <FormControl sx={{ m: 1, width: "9ch" }} variant="outlined">
        <OutlinedInput
          id="outlined-adornment-pizzas"
          value={values.pizzas}
          onChange={handleChange("pizzas")}
          error={values.pizzas !== "" && isNaN(values.pizzas)}
          aria-describedby="outlined-pizzas-helper-text"
          inputProps={{
            "aria-label": "pizzas",
          }}
        />
        <FormHelperText id="outlined-oil-helper-text">
          Number of Pizzas
        </FormHelperText>
      </FormControl>

      <FormControl sx={{ m: 1, width: "9ch" }} variant="outlined">
        <OutlinedInput
          id="outlined-adornment-size"
          value={values.size}
          onChange={handleChange("size")}
          endAdornment={<InputAdornment position="end">g</InputAdornment>}
          error={values.size !== "" && isNaN(values.size)}
          aria-describedby="outlined-size-helper-text"
          inputProps={{
            "aria-label": "size",
          }}
        />
        <FormHelperText id="outlined-oil-helper-text">
          Size of Pizza
        </FormHelperText>
      </FormControl>

      <Button
        onClick={() => {
          calculateRecipe();
          console.log("This is flour weight: " + weights.flour);
        }}
        variant="contained"
      >
        Calculate
      </Button>
    </Box>
  );
};
