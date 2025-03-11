/**
 * Pizza Dough Calculator component that helps users calculate ingredient amounts
 * based on baker's percentages and desired pizza size/quantity.
 * 
 * @component
 */

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";

/**
 * Default recipe values using baker's percentages
 * Flour is always 100% as the base
 */
const DEFAULT_VALUES = {
  water: 70, // 70% hydration
  salt: 2.5, // 2.5% salt
  yeast: 0.5, // 0.5% yeast
  oil: 1, // 1% oil
  size: 350, // 350g per pizza
  pizzas: 2, // 2 pizzas
  flour: 100, // 100% flour (base)
};

export const Calculator = () => {
  const [values, setValues] = React.useState(DEFAULT_VALUES);
  const [weights, setWeights] = React.useState({
    flour: 0,
    water: 0,
    salt: 0,
    yeast: 0,
    oil: 0,
  });

  /**
   * Calculates the recipe based on baker's percentages and desired output
   * Uses the total percentage to calculate flour weight, then derives other ingredients
   */
  const calculateRecipe = () => {
    // Calculate total percentage (should be greater than 100%)
    const totalPercent = Object.values(values).reduce((sum, value) => 
      typeof value === 'number' ? sum + value : sum, 0) * 0.01;

    // Calculate total dough weight needed
    const totalWeight = values.size * values.pizzas;

    // Calculate flour weight (base weight)
    const flourWeight = Math.round(totalWeight / totalPercent);

    // Calculate other ingredients based on flour weight
    const newWeights = {
      flour: flourWeight,
      water: Math.round(flourWeight * (values.water * 0.01)),
      salt: Math.round(flourWeight * (values.salt * 0.01)),
      yeast: Math.round(flourWeight * (values.yeast * 0.01)),
      oil: Math.round(flourWeight * (values.oil * 0.01)),
    };

    setWeights(newWeights);
  };

  /**
   * Handles changes to input values
   * @param {string} prop - Property name to update
   * @returns {Function} Event handler function
   */
  const handleChange = (prop) => (event) => {
    const newValue = event.target.value;
    if (newValue === '' || !isNaN(newValue)) {
      setValues({ ...values, [prop]: Number(newValue) });
    }
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
        padding: 3,
        backgroundColor: "#F6BC65",
        minHeight: "calc(100vh - 60px)", // Adjust based on navbar height
      }}
    >
      <h1 className="calculator-title">Pizza Dough Calculator</h1>
      
      {/* Baker's Percentage Inputs */}
      <Box sx={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
        gap: 2,
        width: "100%",
        maxWidth: 600,
        marginBottom: 3
      }}>
        <FormControl variant="outlined">
          <OutlinedInput
            value={values.water}
            onChange={handleChange("water")}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            error={values.water === "" || isNaN(values.water)}
            inputProps={{ "aria-label": "water percentage" }}
          />
          <FormHelperText>Water</FormHelperText>
        </FormControl>

        <FormControl variant="outlined">
          <OutlinedInput
            value={values.salt}
            onChange={handleChange("salt")}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            error={values.salt === "" || isNaN(values.salt)}
            inputProps={{ "aria-label": "salt percentage" }}
          />
          <FormHelperText>Salt</FormHelperText>
        </FormControl>

        <FormControl variant="outlined">
          <OutlinedInput
            value={values.yeast}
            onChange={handleChange("yeast")}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            error={values.yeast === "" || isNaN(values.yeast)}
            inputProps={{ "aria-label": "yeast percentage" }}
          />
          <FormHelperText>Yeast</FormHelperText>
        </FormControl>

        <FormControl variant="outlined">
          <OutlinedInput
            value={values.oil}
            onChange={handleChange("oil")}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            error={values.oil === "" || isNaN(values.oil)}
            inputProps={{ "aria-label": "oil percentage" }}
          />
          <FormHelperText>Oil</FormHelperText>
        </FormControl>
      </Box>

      {/* Output Settings */}
      <Box sx={{ 
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
        gap: 2,
        width: "100%",
        maxWidth: 600,
        marginBottom: 3
      }}>
        <FormControl variant="outlined">
          <OutlinedInput
            value={values.pizzas}
            onChange={handleChange("pizzas")}
            error={values.pizzas === "" || isNaN(values.pizzas)}
            inputProps={{ "aria-label": "number of pizzas" }}
          />
          <FormHelperText>Number of Pizzas</FormHelperText>
        </FormControl>

        <FormControl variant="outlined">
          <OutlinedInput
            value={values.size}
            onChange={handleChange("size")}
            endAdornment={<InputAdornment position="end">g</InputAdornment>}
            error={values.size === "" || isNaN(values.size)}
            inputProps={{ "aria-label": "pizza size in grams" }}
          />
          <FormHelperText>Size per Pizza (g)</FormHelperText>
        </FormControl>
      </Box>

      <Button
        onClick={calculateRecipe}
        variant="contained"
        sx={{ 
          marginBottom: 3,
          backgroundColor: "#C75146",
          "&:hover": {
            backgroundColor: "#81171B"
          }
        }}
      >
        Calculate Recipe
      </Button>

      {/* Results Display */}
      {weights.flour > 0 && (
        <Box sx={{ 
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          boxShadow: 1,
          width: "100%",
          maxWidth: 600
        }}>
          <h2 style={{ marginTop: 0, color: "#C75146" }}>Recipe</h2>
          <div className="recipe-results">
            <p><strong>Flour:</strong> {weights.flour}g</p>
            <p><strong>Water:</strong> {weights.water}g</p>
            <p><strong>Salt:</strong> {weights.salt}g</p>
            <p><strong>Yeast:</strong> {weights.yeast}g</p>
            <p><strong>Oil:</strong> {weights.oil}g</p>
            <p><strong>Total Weight:</strong> {Object.values(weights).reduce((a, b) => a + b, 0)}g</p>
          </div>
        </Box>
      )}
    </Box>
  );
};
