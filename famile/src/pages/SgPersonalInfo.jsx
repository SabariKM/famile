import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import { useNavigate, useLocation } from "react-router-dom";
import { AccessContext } from "../constant/AccessContext";
import DatePicker from "react-datepicker";
import moment, { max } from "moment";
import "react-datepicker/dist/react-datepicker.css";
import stateDist from "../constant/state-dist.json";
import religion from "../constant/religion.json";
import language from "../constant/languages.json";

import { toast } from "react-toastify";
import { setpersonalinfo } from "../constant/url";
import "../css/common.css";
import { Footer } from "../component/Footer";
import { Header } from "../component/Header";

export const SgPersonalInfo = (props) => {
	let navigate = useNavigate();
	const state = useLocation()["state"];
	let propData = { ...state, login: false };
	const access = propData?.authID;
	const fname = propData?.fname;
	const [formData, setFormData] = useState({
		fname: fname,
		email: "",
		gender: "",
		dob: "Date of Birth",
		language: "",
		religion: "",
		edu_qual: "",
		profession: "",
		annual_income: "",
		food: "",
		height: "",
		weight: "",
		city: "",
		state: "",
		country: "India",
	});
	const [errorDisp, setErrorDisp] = useState({
		fname: false,
		email: false,
		gender: false,
		dob: false,
		language: false,
		religion: false,
		edu_qual: false,
		profession: false,
		annual_income: false,
		food: false,
		height: false,
		weight: false,
		city: false,
		state: false,
		country: false,
		photo: false,
	});
	const [retMsg, setRetMsg] = useState({ type: "", msg: "" });

	const [loading, setLoading] = useState(false);

	function validateEmail(email) {
		// Regular expression to check for valid email address
		const regex =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		// Check if the email address is valid
		if (regex.test(email)) {
			// Check if the email address starts with a letter
			if (!/\D/.test(email[0])) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	const validateInput = () => {
		if (formData.fname.length === 0) {
			setErrorDisp({ ...errorDisp, fname: true });
			return false;
		} else if (
			!formData.email.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
		) {
			setErrorDisp({ ...errorDisp, email: true });
			return false;
		} else if (formData.gender.length === 0) {
			setErrorDisp({ ...errorDisp, gender: true });
			return false;
		} else if (!moment(formData.dob, "DD-MMM-YYYY").isValid()) {
			setErrorDisp({ ...errorDisp, dob: true });
			console.log("dob");
			return false;
		} else if (formData.language.length === 0) {
			setErrorDisp({ ...errorDisp, language: true });
			return false;
		} else if (formData.religion.length === 0) {
			setErrorDisp({ ...errorDisp, religion: true });
			return false;
		} else if (formData.edu_qual.length === 0) {
			setErrorDisp({ ...errorDisp, edu_qual: true });
			return false;
		} else if (formData.profession.length === 0) {
			setErrorDisp({ ...errorDisp, profession: true });
			return false;
		} else if (formData.annual_income.length === 0) {
			setErrorDisp({ ...errorDisp, annual_income: true });
			return false;
		} else if (formData.food.length === 0) {
			setErrorDisp({ ...errorDisp, food: true });
			return false;
		} else if (formData.height.length === 0) {
			setErrorDisp({ ...errorDisp, height: true });
			return false;
		} else if (formData.weight.length === 0) {
			setErrorDisp({ ...errorDisp, weight: true });
			return false;
		} else if (formData.city.length === 0) {
			setErrorDisp({ ...errorDisp, city: true });
			return false;
		} else if (formData.state.length === 0) {
			setErrorDisp({ ...errorDisp, length: true });
			return false;
		} else if (formData.country.length === 0) {
			setErrorDisp({ ...errorDisp, country: true });
			return false;
		}

		return true;
	};
	const handlePersonalInfo = async (e) => {
		e.preventDefault();

		// if (!validateInput()) {
		// 	return false;
		// }

		setLoading(true);
		var bodyFormData = new FormData();
		bodyFormData.append("authId", access);
		bodyFormData.append("fname", formData.fname);
		bodyFormData.append("email", formData.email);
		bodyFormData.append("gender", formData.gender);
		bodyFormData.append(
			"dob",
			moment(formData.dob, "DD-MMM-YYYY").format("YYYY-MM-DD")
		);
		bodyFormData.append("language", formData.language);
		bodyFormData.append("religion", formData.religion);
		bodyFormData.append("edu_qual", formData.edu_qual);
		bodyFormData.append("profession", formData.profession);
		bodyFormData.append("annual_income", formData.annual_income);
		bodyFormData.append("food", formData.food);
		bodyFormData.append("height", formData.height);
		bodyFormData.append("weight", formData.weight);
		bodyFormData.append("city", formData.city);
		bodyFormData.append("state", formData.state);
		bodyFormData.append("country", formData.country);
		bodyFormData.append("photo", formData.photo);

		await axios({
			method: "post",
			url: setpersonalinfo,
			data: bodyFormData,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then(function (response) {
				//handle success
				const res_data = response.data;
				if (res_data.status_code === 101) {
					navigate("/login");
				} else if (res_data.status_code === 200) {
					toast.success(res_data.status_msg);
					setTimeout(() => {
						if (!propData?.login) {
							navigate("/sgpersonalinfoimg", { state: propData });
						}
					}, 5000);

					setRetMsg({ type: "success", msg: res_data.status_msg });
				} else {
					setRetMsg({ type: "error", msg: res_data.status_msg });
					toast.error(res_data.status_msg);
				}
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
		setLoading(false);
	};

	const handleDateOfBirth = (date) => {
		setFormData({ ...formData, dob: moment(date).format("DD-MMM-YYYY") });
		setErrorDisp({ ...errorDisp, dob: true });
	};

	const handleChangeFormData = (e) => {
		const { name, value } = e.target;
		setErrorDisp({ ...errorDisp, [name]: true });
		setFormData({
			...formData, // copy the current properties of "json"
			[name]: value, // update the "name" property
		});
	};

	const handleChangeFormDataText = (e) => {
		const { name, value } = e.target;
		setErrorDisp({ ...errorDisp, [name]: true });
		if (
			!/\d/.test(value) &&
			!/[`~!@#$%^&*()_+|}{":;,.<>/?]/.test(value) &&
			value.length <= 30
		) {
			setFormData({
				...formData, // copy the current properties of "json"
				[name]: value, // update the "name" property
			});
		}
	};

	const weightComp = () => {
		let elem = [];
		for (let i = 20; i <= 200; i++) {
			elem.push(<option value={i + " Kg"}>{i + " Kg"}</option>);
		}
		return elem;
	};
	const heightComp = () => {
		let elem = [];
		for (let i = 100; i <= 210; i++) {
			elem.push(<option value={i + " Cm"}>{i + " Cm"}</option>);
		}
		return elem;
	};

	useEffect(() => {
		if (propData?.authID === undefined || !propData?.authID) {
			navigate("/login");
		}

		if (propData?.acctype !== "signup") {
			navigate("/personalinfo", { state: propData });
		}
	}, [access]);

	return (
		<>
			<Header loginStatus={props.loginStatus} />
			<div className="container d-flex justify-content-center">
				<div className="main-div">
					<div className="pt-5">
						<div className="row">
							<div className="col p-0">
								<h2 className="text-center">Personal Details</h2>
							</div>
						</div>
						<div className="row ">
							<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<p className="text-center">Enter your details below</p>
								<form onSubmit={handlePersonalInfo}>
									<div className="row d-flex justify-content-center">
										<div className="col-10 ">
											<input
												type="text"
												maxLength={30}
												minLength={3}
												className={`form-control mt-3 p-2 ${
													errorDisp.fname && formData.fname?.length <= 2
														? "is-invalid-input"
														: ""
												}`}
												placeholder="Name"
												name="fname"
												value={formData.fname}
												onChange={(e) => handleChangeFormDataText(e)}
											/>
											{errorDisp.fname && formData.fname?.length <= 2 && (
												<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
													Please fill
												</p>
											)}
										</div>
										<div className="col-10">
											<input
												type="text"
												className={`form-control mt-4 p-2 ${
													errorDisp.email && validateEmail(formData.email)
														? "is-invalid-input"
														: ""
												}`}
												placeholder="Email"
												name="email"
												value={formData.email}
												onChange={(e) => handleChangeFormData(e)}
											/>
											{errorDisp.email &&
												!formData.email.match(
													/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
												) && (
													<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
														Please fill
													</p>
												)}
										</div>
									</div>
									<div className="row d-flex justify-content-center">
										<div className="col-10 mt-4 p-2">
											<select
												key={"gender"}
												className={`form-select m t-4 p-2 ${
													errorDisp.gender && formData?.length <= 0
														? "is-invalid-input"
														: ""
												}`}
												aria-label=""
												name="gender"
												onChange={(e) => handleChangeFormData(e)}
											>
												<option value="" selected>
													Gender
												</option>
												<option value="Male">Male</option>
												<option value="Female">Female</option>
											</select>
											{errorDisp.gender && formData.gender?.length <= 2 && (
												<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
													Please Select
												</p>
											)}
										</div>
										<div className="col-10">
											<DatePicker
												showYearDropdown
												showMonthDropdown
												yearDropdownItemNumber={73}
												scrollableYearDropdown
												value={formData.dob}
												maxDate={moment().toDate()}
												className={`form-control mt-4 p-2 ${
													errorDisp.dob &&
													!moment(formData.dob, "DD-MMM-YYYY").isValid()
														? "is-invalid-input"
														: ""
												}`}
												onChange={(date) => handleDateOfBirth(date)}
											/>
											{errorDisp.dob &&
												!moment(formData.dob, "DD-MMM-YYYY").isValid() && (
													<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
														Please fill
													</p>
												)}
										</div>
									</div>
									<div className="row d-flex justify-content-center">
										<div className="col-10">
											<select
												className={`form-select mt-4 p-2 ${
													errorDisp.language && formData.language?.length <= 2
														? "is-invalid-input"
														: ""
												}`}
												aria-label="Language"
												name="language"
												onChange={(e) => handleChangeFormData(e)}
											>
												<option value="" selected>
													Language
												</option>
												{language.languages?.map((item) => {
													return <option value={item}>{item}</option>;
												})}
											</select>
											{errorDisp.language && formData.language?.length <= 2 && (
												<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
													Please Select
												</p>
											)}
										</div>
										<div className="col-10">
											<select
												className={`form-select mt-4 p-2 ${
													errorDisp.religion && formData.religion?.length <= 2
														? "is-invalid-input"
														: ""
												}`}
												aria-label=""
												name="religion"
												onChange={(e) => handleChangeFormData(e)}
											>
												<option value="" selected>
													Religion
												</option>
												{religion.religion?.map((item) => {
													return <option value={item}>{item}</option>;
												})}
											</select>
											{errorDisp.religion && formData.religion?.length <= 2 && (
												<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
													Please Select
												</p>
											)}
										</div>
									</div>
									<div className="row d-flex justify-content-center">
										<div className="col-10">
											<input
												type="text"
												className={`form-control mt-4 p-2 ${
													errorDisp.edu_qual && formData.edu_qual?.length < 2
														? "is-invalid-input"
														: ""
												}`}
												placeholder="Educational"
												name="edu_qual"
												value={formData.edu_qual}
												onChange={(e) => handleChangeFormDataText(e)}
											/>
											{errorDisp.edu_qual && formData.edu_qual?.length < 2 && (
												<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
													Please Fill
												</p>
											)}
										</div>
										<div className="col-10">
											<input
												type="text"
												maxLength={30}
												minLength={3}
												className={`form-control mt-4 p-2 ${
													errorDisp.profession &&
													formData.profession?.length <= 2
														? "is-invalid-input"
														: ""
												}`}
												placeholder="Profession"
												name="profession"
												value={formData.profession}
												onChange={(e) => handleChangeFormDataText(e)}
											/>
											{errorDisp.profession &&
												formData.profession?.length <= 2 &&
												!/\D/.test(formData.profession) && (
													<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
														Please Fill
													</p>
												)}
										</div>
									</div>
									<div className="row d-flex justify-content-center">
										<div className="col-10">
											<select
												className={`form-select mt-4 p-2 ${
													errorDisp.annual_income &&
													formData.annual_income?.length <= 2
														? "is-invalid-input"
														: ""
												}`}
												aria-label=""
												name="annual_income"
												onChange={(e) => handleChangeFormData(e)}
											>
												<option value="" selected>
													Annual Income
												</option>
												<option value="No Income">No Income</option>
												<option value="Upto 2 Lakhs">Upto Rs.2 Lakhs</option>
												<option value="2 Lakhs - 5 Lakhs">
													Rs.2 Lakhs - Rs.5 Lakhs
												</option>
												<option value="5 Lakhs - 10 Lakhs">
													Rs.5 Lakhs - Rs.10 Lakhs
												</option>
												<option value="10 Lakhs - 18 Lakhs">
													Rs.10 Lakhs - Rs.18 Lakhs
												</option>
												<option value="18 Lakhs - 30 Lakhs">
													Rs.18 Lakhs - Rs.30 Lakhs
												</option>
												<option value="30 Lakhs - 50 Lakhs">
													Rs.30 Lakhs - Rs.50 Lakhs
												</option>
												<option value="50 Lakhs - 1 Crore">
													Rs.50 Lakhs - Rs.1 Crore
												</option>
												<option value="Above 1 Crore">Above Rs.1 Crore</option>
											</select>
											{errorDisp.annual_income &&
												formData.annual_income?.length <= 2 && (
													<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
														Please Select
													</p>
												)}
										</div>
										<div className="col-10">
											<select
												className={`form-select mt-4 p-2 ${
													errorDisp.food && formData.food?.length <= 2
														? "is-invalid-input"
														: ""
												}`}
												aria-label=""
												name="food"
												onChange={(e) => handleChangeFormData(e)}
											>
												<option value="" selected>
													Food
												</option>
												<option value="Non-Vegetarian">Non-Vegetarian</option>
												<option value="Vegetarian">Vegetarian</option>
												<option value="Vegan">Vegan</option>
											</select>
											{errorDisp.food && formData.food?.length <= 2 && (
												<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
													Please Select
												</p>
											)}
										</div>
									</div>
									<div className="row d-flex justify-content-center">
										<div className="col-10">
											<select
												className={`form-select mt-4 p-2 ${
													errorDisp.height && formData.height?.length <= 2
														? "is-invalid-input"
														: ""
												}`}
												aria-label=""
												name="height"
												onChange={(e) => handleChangeFormData(e)}
											>
												<option value="" selected>
													Height
												</option>
												{heightComp()}
											</select>
											{errorDisp.height && formData.height?.length <= 2 && (
												<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
													Please Select
												</p>
											)}
										</div>
										<div className="col-10">
											<select
												className={`form-select mt-4 p-2 ${
													errorDisp.weight && formData.weight?.length <= 2
														? "is-invalid-input"
														: ""
												}`}
												aria-label=""
												name="weight"
												onChange={(e) => handleChangeFormData(e)}
											>
												<option value="" selected>
													Weight
												</option>
												{weightComp()}
											</select>

											{errorDisp.weight && formData.weight?.length <= 2 && (
												<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
													Please Select
												</p>
											)}
										</div>
									</div>
									<div className="row d-flex justify-content-center">
										<div className="col-10">
											<input
												type="text"
												className={`form-control mt-4 p-2 ${
													errorDisp.city && formData.city?.length <= 2
														? "is-invalid-input"
														: ""
												}`}
												placeholder="City"
												name="city"
												value={formData.city}
												onChange={(e) => handleChangeFormData(e)}
											/>
											{errorDisp.city && formData.city?.length <= 2 && (
												<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
													Please fill
												</p>
											)}
										</div>
										<div className="col-10">
											<select
												className={`form-select mt-4 p-2 ${
													errorDisp.state && formData.state?.length <= 2
														? "is-invalid-input"
														: ""
												}`}
												aria-label=""
												name="state"
												onChange={(e) => handleChangeFormData(e)}
											>
												<option value="" selected>
													State
												</option>
												{stateDist.states?.map((item) => {
													return (
														<option value={item.state}>{item.state}</option>
													);
												})}
											</select>
											{errorDisp.state && formData.state?.length <= 2 && (
												<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
													Please Select
												</p>
											)}
										</div>
									</div>
									<div className="row d-flex justify-content-center">
										<div className="col-10">
											<select
												className={`form-select mt-4 p-2 ${
													errorDisp.country && formData.country?.length <= 2
														? "is-invalid-input"
														: ""
												}`}
												aria-label=""
												name="country"
												onChange={(e) => handleChangeFormData(e)}
											>
												<option value="" selected>
													Country
												</option>
												<option value="India" selected>
													India
												</option>
											</select>
											{errorDisp.country && formData.country?.length <= 2 && (
												<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
													Please Select
												</p>
											)}
										</div>
									</div>

									<div className="d-grid gap-2 col-8 mx-auto mt-4 mb-5">
										<div style={{ height: "45px" }}>
											<p className={`text-center ${retMsg.type}`}>
												{retMsg.msg}
											</p>
										</div>

										<button
											type="submit"
											className="btn btn-primary bg-dark p-2"
											disabled={loading}
										>
											JOIN
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="ft-footer-block">
				<Footer />
			</div>
		</>
	);
};
