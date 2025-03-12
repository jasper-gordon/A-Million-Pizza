import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Slider,
  Switch,
  FormControlLabel,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Stack,
  Button,
  Menu,
  MenuItem,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

// Custom styled sliders with specific colors
const HydrationSlider = styled(Slider)({
  color: '#2196f3', // Blue for water
  '& .MuiSlider-thumb': {
    '&:hover, &.Mui-focusVisible': {
      boxShadow: '0px 0px 0px 8px rgba(33, 150, 243, 0.16)',
    },
  },
});

const SaltSlider = styled(Slider)({
  color: '#9e9e9e', // Gray for salt
  '& .MuiSlider-thumb': {
    '&:hover, &.Mui-focusVisible': {
      boxShadow: '0px 0px 0px 8px rgba(158, 158, 158, 0.16)',
    },
  },
});

const YeastSlider = styled(Slider)({
  color: '#ffd54f', // Light yellow for yeast
  '& .MuiSlider-thumb': {
    '&:hover, &.Mui-focusVisible': {
      boxShadow: '0px 0px 0px 8px rgba(255, 213, 79, 0.16)',
    },
  },
});

const SourdoughSlider = styled(Slider)({
  background: 'linear-gradient(90deg, #ff0000, #ff9900, #ffff00, #33cc33, #3399ff, #9933ff)',
  height: 8,
  '& .MuiSlider-track': {
    background: 'linear-gradient(90deg, #ff0000, #ff9900, #ffff00, #33cc33, #3399ff, #9933ff)',
    border: 'none',
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    background: 'linear-gradient(90deg, #ff0000, #ff9900, #ffff00, #33cc33, #3399ff, #9933ff)',
  },
  '& .MuiSlider-thumb': {
    backgroundColor: '#fff',
    border: '2px solid #666',
    '&:hover, &.Mui-focusVisible': {
      boxShadow: '0px 0px 0px 8px rgba(141, 110, 99, 0.16)',
    },
  },
});

const OilSlider = styled(Slider)({
  color: '#1b5e20', // Dark forest green for oil
  '& .MuiSlider-thumb': {
    '&:hover, &.Mui-focusVisible': {
      boxShadow: '0px 0px 0px 8px rgba(27, 94, 32, 0.16)',
    },
  },
});

const SugarSlider = styled(Slider)({
  color: '#d81b60', // Pink-red for sugar
  '& .MuiSlider-thumb': {
    '&:hover, &.Mui-focusVisible': {
      boxShadow: '0px 0px 0px 8px rgba(216, 27, 96, 0.16)',
    },
  },
});

const CustomSlider = styled(Slider)({
  color: '#7b1fa2', // Purple for custom ingredients
  '& .MuiSlider-thumb': {
    '&:hover, &.Mui-focusVisible': {
      boxShadow: '0px 0px 0px 8px rgba(123, 31, 162, 0.16)',
    },
  },
});

// Custom styled switch for units
const UnitSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#000000',
      transform: 'translateX(22px)',
      '& + .MuiSwitch-track': {
        backgroundColor: '#ffffff',
        opacity: 1,
        border: '1px solid #000000',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 32,
    height: 32,
    color: '#000000',
  },
  '& .MuiSwitch-track': {
    borderRadius: 20 / 2,
    backgroundColor: '#ffffff',
    opacity: 1,
    border: '1px solid #000000',
  },
}));

// Custom styled switch for sourdough
const GraySwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      color: '#666',
      '& + .MuiSwitch-track': {
        backgroundColor: '#666',
        opacity: 0.5,
      },
    },
  },
  '& .MuiSwitch-track': {
    backgroundColor: '#666',
    opacity: 0.3,
  },
}));

/**
 * DoughCalculator component for calculating pizza dough ingredient amounts
 * based on user inputs like ball weight, number of balls, and percentages.
 */
const DoughCalculator = () => {
  // State for user inputs
  const [ballWeight, setBallWeight] = useState(250);
  const [useGrams, setUseGrams] = useState(true);
  const [numBalls, setNumBalls] = useState(4);
  const [hydration, setHydration] = useState(65);
  const [salt, setSalt] = useState(2.5);
  const [yeast, setYeast] = useState(0.2);
  const [useSourdough, setUseSourdough] = useState(false);
  const [sourdoughAmount, setSourdoughAmount] = useState(20); // Default 20% starter

  // State for calculated results
  const [results, setResults] = useState({
    flourWeight: 0,
    waterWeight: 0,
    saltWeight: 0,
    yeastOrStarterWeight: 0,
    totalWeight: 0,
    oilWeight: 0,
    sugarWeight: 0,
    customWeights: {},
  });

  // New state for optional ingredients
  const [optionalIngredients, setOptionalIngredients] = useState({
    oil: { active: false, percentage: 3 },
    sugar: { active: false, percentage: 2 },
  });
  const [customIngredients, setCustomIngredients] = useState([]);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newIngredientName, setNewIngredientName] = useState('');

  // Convert between grams and ounces
  const gramsToOz = (g) => (g / 28.35).toFixed(2);
  const ozToGrams = (oz) => (oz * 28.35).toFixed(1);

  // Calculate ingredient weights
  useEffect(() => {
    const weight = useGrams ? ballWeight : ozToGrams(ballWeight);
    const totalWeight = weight * numBalls;
    
    // Calculate total percentage including optional ingredients
    let total = 100 + hydration + salt + (useSourdough ? sourdoughAmount : yeast);
    
    // Add optional ingredients to total
    if (optionalIngredients.oil.active) total += optionalIngredients.oil.percentage;
    if (optionalIngredients.sugar.active) total += optionalIngredients.sugar.percentage;
    customIngredients.forEach(ing => {
      if (ing.active) total += ing.percentage;
    });

    const flourWeight = totalWeight * (100 / total);
    const waterWeight = flourWeight * (hydration / 100);
    const saltWeight = flourWeight * (salt / 100);
    const yeastOrStarterWeight = useSourdough 
      ? flourWeight * (sourdoughAmount / 100)
      : flourWeight * (yeast / 100);

    // Calculate optional ingredients
    const oilWeight = optionalIngredients.oil.active 
      ? flourWeight * (optionalIngredients.oil.percentage / 100)
      : 0;
    const sugarWeight = optionalIngredients.sugar.active 
      ? flourWeight * (optionalIngredients.sugar.percentage / 100)
      : 0;
    
    const customWeights = {};
    customIngredients.forEach(ing => {
      if (ing.active) {
        customWeights[ing.name] = flourWeight * (ing.percentage / 100);
      }
    });

    setResults({
      flourWeight,
      waterWeight,
      saltWeight,
      yeastOrStarterWeight,
      totalWeight,
      oilWeight,
      sugarWeight,
      customWeights,
    });
  }, [ballWeight, useGrams, numBalls, hydration, salt, yeast, useSourdough, sourdoughAmount, optionalIngredients, customIngredients]);

  // Format weight display based on unit preference
  const formatWeight = (weight) => {
    if (useGrams) {
      return `${Math.round(weight)}g`;
    }
    return `${Number(gramsToOz(weight)).toFixed(1)}oz`;
  };

  // Handle unit change
  const handleUnitChange = (e) => {
    const newUseGrams = !e.target.checked;
    if (newUseGrams !== useGrams) {
      // Convert the ball weight when switching units
      const newBallWeight = newUseGrams
        ? Number(ozToGrams(ballWeight))
        : Number(gramsToOz(ballWeight));
      setBallWeight(Number(newBallWeight));
      setUseGrams(newUseGrams);
    }
  };

  const handleIngredientToggle = (ingredient) => {
    if (ingredient === 'custom') {
      setDialogOpen(true);
    } else {
      setOptionalIngredients(prev => ({
        ...prev,
        [ingredient]: {
          ...prev[ingredient],
          active: !prev[ingredient].active
        }
      }));
    }
    setMenuAnchor(null);
  };

  const handleAddCustomIngredient = () => {
    if (newIngredientName.trim()) {
      setCustomIngredients(prev => [
        ...prev,
        {
          name: newIngredientName.trim(),
          percentage: 2,
          active: true
        }
      ]);
      setNewIngredientName('');
      setDialogOpen(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#F6BC65',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      pt: 3,
      pb: 3
    }}>
      <Card sx={{ width: '100%', maxWidth: 800, mx: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Pizza Dough Calculator
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={`Weight per Ball (${useGrams ? 'g' : 'oz'})`}
                type="number"
                value={Number(ballWeight).toFixed(useGrams ? 0 : 1)}
                onChange={(e) => setBallWeight(Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <Typography>g</Typography>
                <UnitSwitch
                  checked={!useGrams}
                  onChange={handleUnitChange}
                />
                <Typography>oz</Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Number of Dough Balls"
                type="number"
                value={numBalls}
                onChange={(e) => setNumBalls(Number(e.target.value))}
                InputProps={{
                  inputProps: { min: 1 }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography gutterBottom>
                Hydration: {hydration}%
              </Typography>
              <HydrationSlider
                value={hydration}
                onChange={(e, value) => setHydration(value)}
                min={50}
                max={90}
                step={0.5}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography gutterBottom>
                Salt: {salt}%
              </Typography>
              <SaltSlider
                value={salt}
                onChange={(e, value) => setSalt(value)}
                min={1}
                max={4}
                step={0.1}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <GraySwitch
                    checked={useSourdough}
                    onChange={(e) => setUseSourdough(e.target.checked)}
                  />
                }
                label="Sourdough"
              />
            </Grid>

            <Grid item xs={12}>
              {useSourdough ? (
                <>
                  <Typography gutterBottom>
                    Sourdough: {sourdoughAmount}%
                  </Typography>
                  <SourdoughSlider
                    value={sourdoughAmount}
                    onChange={(e, value) => setSourdoughAmount(value)}
                    min={10}
                    max={40}
                    step={1}
                  />
                </>
              ) : (
                <>
                  <Typography gutterBottom>
                    Yeast: {yeast}%
                  </Typography>
                  <YeastSlider
                    value={yeast}
                    onChange={(e, value) => setYeast(value)}
                    min={0.1}
                    max={2}
                    step={0.1}
                  />
                </>
              )}
            </Grid>

            {/* Add Ingredients Button */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2, mb: 2 }}>
                <Button
                  startIcon={<AddIcon />}
                  onClick={(e) => setMenuAnchor(e.currentTarget)}
                  variant="outlined"
                  size="small"
                >
                  Add Ingredients
                </Button>
              </Box>
            </Grid>

            {/* Optional Ingredients Menu */}
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={() => setMenuAnchor(null)}
            >
              <MenuItem onClick={() => handleIngredientToggle('oil')}>
                <Checkbox checked={optionalIngredients.oil.active} />
                Oil
              </MenuItem>
              <MenuItem onClick={() => handleIngredientToggle('sugar')}>
                <Checkbox checked={optionalIngredients.sugar.active} />
                Sugar
              </MenuItem>
              <MenuItem onClick={() => handleIngredientToggle('custom')}>
                Add Custom Ingredient
              </MenuItem>
            </Menu>

            {/* Custom Ingredient Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
              <DialogTitle>Add Custom Ingredient</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Ingredient Name"
                  fullWidth
                  value={newIngredientName}
                  onChange={(e) => setNewIngredientName(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddCustomIngredient}>Add</Button>
              </DialogActions>
            </Dialog>

            {/* Optional Ingredient Sliders */}
            {optionalIngredients.oil.active && (
              <Grid item xs={12}>
                <Typography gutterBottom>
                  Oil: {optionalIngredients.oil.percentage}%
                </Typography>
                <OilSlider
                  value={optionalIngredients.oil.percentage}
                  onChange={(e, value) => setOptionalIngredients(prev => ({
                    ...prev,
                    oil: { ...prev.oil, percentage: value }
                  }))}
                  min={1}
                  max={15}
                  step={0.5}
                />
              </Grid>
            )}

            {optionalIngredients.sugar.active && (
              <Grid item xs={12}>
                <Typography gutterBottom>
                  Sugar: {optionalIngredients.sugar.percentage}%
                </Typography>
                <SugarSlider
                  value={optionalIngredients.sugar.percentage}
                  onChange={(e, value) => setOptionalIngredients(prev => ({
                    ...prev,
                    sugar: { ...prev.sugar, percentage: value }
                  }))}
                  min={1}
                  max={15}
                  step={0.5}
                />
              </Grid>
            )}

            {customIngredients.map((ing, index) => (
              <Grid item xs={12} key={ing.name}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography sx={{ flexGrow: 1 }} gutterBottom>
                    {ing.name}: {ing.percentage}%
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      const newIngredients = customIngredients.filter((_, i) => i !== index);
                      setCustomIngredients(newIngredients);
                    }}
                    sx={{ mb: 1 }}
                  >
                    Remove
                  </Button>
                </Box>
                <CustomSlider
                  value={ing.percentage}
                  onChange={(e, value) => {
                    const newIngredients = [...customIngredients];
                    newIngredients[index] = { ...ing, percentage: value };
                    setCustomIngredients(newIngredients);
                  }}
                  min={1}
                  max={15}
                  step={0.5}
                />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Recipe
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Flour</TableCell>
                    <TableCell align="right">{formatWeight(results.flourWeight)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Water</TableCell>
                    <TableCell align="right">{formatWeight(results.waterWeight)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Salt</TableCell>
                    <TableCell align="right">{formatWeight(results.saltWeight)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{useSourdough ? 'Sourdough Starter' : 'Yeast'}</TableCell>
                    <TableCell align="right">{formatWeight(results.yeastOrStarterWeight)}</TableCell>
                  </TableRow>
                  {optionalIngredients.oil.active && (
                    <TableRow>
                      <TableCell>Oil</TableCell>
                      <TableCell align="right">{formatWeight(results.oilWeight)}</TableCell>
                    </TableRow>
                  )}
                  {optionalIngredients.sugar.active && (
                    <TableRow>
                      <TableCell>Sugar</TableCell>
                      <TableCell align="right">{formatWeight(results.sugarWeight)}</TableCell>
                    </TableRow>
                  )}
                  {customIngredients.map(ing => (
                    <TableRow key={ing.name}>
                      <TableCell>{ing.name}</TableCell>
                      <TableCell align="right">
                        {formatWeight(results.customWeights[ing.name] || 0)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>Total Weight</TableCell>
                    <TableCell align="right">{formatWeight(results.totalWeight)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DoughCalculator; 