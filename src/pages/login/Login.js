import {
	Container,
	Button,
	Grid,
	Paper,
	TextField,
	IconButton,
	InputAdornment,
	Typography
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom/dist";
import Swal from 'sweetalert2'


const Login = () => {
const navigate =useNavigate();
const [values, setValues] = useState({
	email: "",
	pass: "",
	showPass: false,
});
const [error_list,setError]=useState([]);

const handleSubmit = async (e) => {
	e.preventDefault();
const response= await	axios
		.post(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, {
			email:values.email,
			password: values.pass,
		});
		console.log(response.data)

    if(response.data.token && response.data.data.role ==='admin')
	{

	  localStorage.setItem("image", response.data.data.image);
      localStorage.setItem("id", response.data.data._id);
      localStorage.setItem("first_name", response.data.data.first_name);
      localStorage.setItem("last_name", response.data.data.last_name);
      localStorage.setItem("token", response.data.token);	
	  localStorage.setItem("role", response.data.data.role);	
    Swal.fire(
      'Success',
     "welcome",
      'success'
    )

	navigate("/gestionnaire/dashboard");

      
		}
   else{
      setError(response.data.validation_errors)
      console.log(response.data.validation_errors)
    }
};
const handlePassVisibilty = () => {
	setValues({
		...values,
		showPass: !values.showPass,
	});
};

	return (
		<div>
<Container maxWidth="sm">
<Grid
	container
	spacing={2}
	direction="column"
	justifyContent="center"
	style={{ minHeight: "100vh" }}
>
<Typography display='flex' justifyContent='center' fontSize={40} variant="body1">Connecter</Typography>

<Paper elelvation={2} sx={{ padding: 5 }}>
<form onSubmit={handleSubmit}>
<Grid container direction="column" spacing={2}>
	<Grid item>
		<TextField
      error={!!error_list.email}
      id={error_list.email??"outlined-error-helper-text"}
      helpertext={error_list.email??""}
			type="email"
			fullWidth
			label="Enter your email"
			placeholder="Email Address"
			variant="outlined"
			required
			onChange={(e) => setValues({ ...values, email: e.target.value })}
		/>
    <span className="text-danger">{error_list.email}</span>
	</Grid>

	<Grid item>
	<TextField
  error={!!error_list.mot_de_passe}
   id={error_list.mot_de_passe}
   helpertext={error_list.mot_de_passe}
		type={values.showPass ? "text" : "password"}
		fullWidth
		label="Password"
		placeholder="Password"
		variant="outlined"
		required
		onChange={(e) => setValues({ ...values, pass: e.target.value })}
		InputProps={{
			endAdornment: (
				<InputAdornment position="end">
					<IconButton
						onClick={handlePassVisibilty}
						aria-label="toggle password"
						edge="end"
					>
						{values.showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
					</IconButton>
				</InputAdornment>
			),
		}}
	/>

	</Grid>

	<Grid item>
	<Button type="submit" fullWidth variant="contained">
		Sign In
	</Button>
	</Grid>
</Grid>
</form>
</Paper>
</Grid>
</Container>
		</div>
	);
};

export default Login;