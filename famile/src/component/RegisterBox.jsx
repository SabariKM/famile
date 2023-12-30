import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../constant/url";

export const RegisterBox = (props) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({ phone: "", name: "" });
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const validateInput = () => {
		if (formData.phone.length < 10 || isNaN(formData.phone)) {
			setErrorMsg("Please enter valid Phone number");
			return false;
		} else if (formData.name.length < 4) {
			setErrorMsg("Please Provide valid name");
			return false;
		}

		return true;
	};

	const handleSignUp = async (e) => {
		e.preventDefault();
		if (!validateInput()) {
			return false;
		}

		setLoading(true);
		var bodyFormData = new FormData();
		bodyFormData.append("name", formData.name);
		bodyFormData.append("phone", formData.phone);
		await axios({
			method: "post",
			url: signup,
			data: bodyFormData,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then(function (response) {
				//handle success
				const res_data = response.data;
				if (res_data.status_code === 101) {
					console.log("Api Authentication failed. login again.");
				} else if (res_data.status_code === 200) {
					navigate("/sgpersonalinfo", {
						state: {
							authID: res_data.authId,
							phone: formData.phone,
							fname: formData.name,
							acctype: "signup",
						},
					});
				} else {
					setErrorMsg(res_data.status_msg);
				}
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
		setLoading(false);
	};

	const handleChangeFormData = (e) => {
		const { name, value } = e.target;

		if (name === "name" && /[`~!@#$%^&*()_+|}{":;,.<>/?0-9]/.test(value)) {
			setErrorMsg("Please Enter Valid Name not number.");
			return false;
		} else {
			setErrorMsg("");
		}

		if (name === "phone" && isNaN(value)) {
			setErrorMsg("Please Enter Valid Phone Number.");
			return false;
		} else {
			setErrorMsg("");
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
				onSubmit={handleSignUp}
				action="post"
			>
				<div className="rectangle rectangle4" />
				<div className="rectangle rectangle3" />
				<div className="rectangle rectangle2" />
				<div className="rectangle rectangle1 pt-5">
					<h2 className="text-center">Join</h2>
					<p className="text-center mb-3">Enter your details below</p>
					<div style={{ height: "25px" }}>
						<p className={`text-center error text-capitalize`}>{errorMsg}</p>
					</div>
					<div className="col-11">
						<div className="ms-5 mb-4">
							<input
								type="text"
								value={formData.name}
								className="form-control p-2"
								placeholder="Name"
								name="name"
								onChange={(e) => handleChangeFormData(e)}
							/>
						</div>
						<div className="input-group mx-5">
							<div className="col-2 me-2">
								<select className="form-select p-2">
									<option>IN</option>
								</select>
							</div>
							<div className="col-2 me-2">
								<input
									type="numeric"
									maxLength="10"
									minLength="10"
									value="+91"
									className="form-control p-2 me-2"
									placeholder="Phone"
									name="phone_code"
									disabled
								/>
							</div>
							<input
								type="numeric"
								maxLength="10"
								minLength="10"
								value={formData.phone}
								className="form-control p-2 me-5"
								placeholder="Phone"
								name="phone"
								onChange={(e) => handleChangeFormData(e)}
							/>
						</div>
					</div>
					<div className="col">
						<p className="text-end mx-5 mt-1">
							<a href="javascript:void(0)" style={{ color: "black" }}>
								&nbsp;
							</a>
						</p>
					</div>
					<div className="d-flex justify-content-center ">
						<div className="d-grid gap-2 col-7  mx-5">
							<button
								className="btn btn-primary bg-dark text-white"
								type="submit"
								disabled={loading}
							>
								JOIN
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};
