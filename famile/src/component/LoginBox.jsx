import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "../constant/url";

export const LoginBox = (props) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({ phone: "", password: "" });
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState({ type: "", msg: "" });

	const validateInput = () => {
		if (formData.phone.length < 10 || isNaN(formData.phone)) {
			setErrorMsg({ type: "error", msg: "Please enter valid Phone number" });
			return false;
		} else if (formData.password < 1) {
			setErrorMsg({ type: "error", msg: "Please enter password" });
			return false;
		}

		return true;
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		if (!validateInput()) {
			return false;
		}
		setLoading(true);
		var bodyFormData = new FormData();
		bodyFormData.append("phone", formData.phone);
		bodyFormData.append("password", formData.password);

		await axios({
			method: "post",
			url: login,
			data: bodyFormData,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then(function (response) {
				//handle success
				const res_data = response.data;
				if (res_data.status_code === 101) {
					navigate("/login");
				} else if (res_data.status_code === 200) {
					props.onLogin(res_data.access_code);
					navigate("/personalinfo", {
						state: {
							authID: res_data.access_code,
							phone: formData.phone,
						},
					});
				}
				setErrorMsg({ type: "error", msg: res_data.status_msg });
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
		setLoading(false);
	};

	const handleForgotPassword = () => {
		if (formData.phone.length < 10) {
			setErrorMsg({ type: "error", msg: "please enter phone numbers" });
			return;
		}
		setErrorMsg({
			type: "success",
			msg: "Email Has been sent to your Registered email id",
		});
		// API to send mail with password
	};

	const handleChangeFormData = (e) => {
		const { name, value } = e.target;
		if (name === "phone" && isNaN(value)) {
			setErrorMsg({ type: "error", msg: "please enter numbers only" });
			return;
		}
		setFormData({
			...formData, // copy the current properties of "json"
			[name]: value, // update the "name" property
		});
	};
	return (
		<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 position-relative d-flex justify-content-center pt-5 ">
			<h1 className="text-center position-absolute mt-5 pt-2">Famile</h1>

			<form
				className="login-left mt-5 pt-2"
				onSubmit={handleLogin}
				method="post"
			>
				<div className="rectangle rectangle4" />
				<div className="rectangle rectangle3" />
				<div className="rectangle rectangle2" />
				<div className="rectangle rectangle1 pt-5">
					<h2 className="text-center">Login</h2>
					<p className="text-center">Enter Credentials Below</p>
					<div style={{ height: "25px" }}>
						<p className={`text-center ${errorMsg.type} text-capitalize`}>
							{errorMsg.msg}
						</p>
					</div>
					<div className=" mx-5 mb-4">
						<input
							type="numeric"
							maxLength="10"
							minLength="10"
							value={formData.phone}
							className="form-control p-2"
							name="phone"
							onChange={(e) => handleChangeFormData(e)}
							placeholder="Phone"
						/>
					</div>
					<div className="mx-5 ">
						<input
							type="password"
							className="form-control p-2"
							id="exampleFormControlInput1"
							placeholder="Password"
							name="password"
							onChange={(e) => handleChangeFormData(e)}
						/>
					</div>
					<div className="col">
						<p className="text-end mx-5 mt-1">
							<a
								href="javascript:void(0)"
								style={{ color: "black" }}
								onClick={() => handleForgotPassword()}
							>
								Forgot Password
							</a>
						</p>
					</div>

					<div className="d-flex justify-content-center">
						<div className="d-grid gap-2 col-7  mx-5">
							<button
								className="btn btn-primary bg-dark text-white"
								type="submit"
								disabled={loading}
							>
								LOGIN
							</button>
						</div>
					</div>
					<p className="text-center mt-2">
						Don't have an account?{" "}
						<a
							href="javascript:void(0)"
							className="pmt-a"
							onClick={() => props.changeBox("register")}
						>
							Register
						</a>
					</p>
				</div>
			</form>
		</div>
	);
};
