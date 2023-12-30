import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useLocation, Form } from "react-router-dom";
import stateDist from "../constant/state-dist.json";
import religion from "../constant/religion.json";
import language from "../constant/languages.json";
import ReactFileReader from "react-file-reader";
import { setpersonalinfo } from "../constant/url";

export const PersonalInfoEdit = (props) => {
	const propData = props.propData;
	let navigate = useNavigate();
	const access = propData?.authID;
	const [formData, setFormData] = useState({
		fname: "",
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
		photo: require("../assets/img/signup/profilesample.png"),
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
	const [retMsg, setRetMsg] = useState({
		type: "",
		msg: "",
		uploadText: "Upload Photo",
	});

	const [loading, setLoading] = useState(false);

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
		} else if (formData.dob.length === 0) {
			setErrorDisp({ ...errorDisp, dob: true });
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

	const handleFiles = (files) => {
		setFormData({
			...formData, // copy the current properties of "json"
			photo: files.base64, // update the "name" property
		});
		setRetMsg({ ...retMsg, uploadText: "Change Photo" });
	};

	const handlePersonalInfo = async (e) => {
		e.preventDefault();

		if (!validateInput()) {
			return false;
		}
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
					setRetMsg({ type: "success", msg: res_data.status_msg });
				} else {
					setRetMsg({ type: "error", msg: res_data.status_msg });
				}
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
		setLoading(false);
	};

	const handleDateOfBirth = (date) => {
		setFormData({ ...formData, dob: moment(date).format("DD-MM-YYYY") });
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
			!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				value
			) &&
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
			elem.push(<option value={i + "Kg"}>{i + "Kg"}</option>);
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

	const handleEditView = (name) => {
		props.pageChange(name);
	};
	useEffect(() => {
		setFormData(props.formData);
	}, []);
	return (
		<>
			<div className="row d-flex justify-content-center">
				<div className="col-12 col-md-8 mt-3">
					<p className="text-center">Enter your details below</p>
					<form onSubmit={handlePersonalInfo}>
						<div className="row">
							<div className="col-12">
								<div className="col d-flex justify-content-center">
									<div className="sampleImgBox position-relative">
										<div className="d-flex justify-content-center ">
											<img
												className={`img-fluid`}
												src={formData.photo}
												alt="profileimg"
											/>
										</div>
									</div>
								</div>
								<div className="d-grid gap-2 col-8 col-md-6 mx-auto mt-4 ">
									<label class="btn btn-lg btn-outline-dark p-0 py-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="currentColor"
											className="bi bi-cloud-upload"
											viewBox="0 0 16 16"
											style={{ marginRight: "10px" }}
										>
											<path
												fillRule="evenodd"
												d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"
											/>
											<path
												fillRule="evenodd"
												d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"
											/>
										</svg>
										<input
											type="file"
											style={{ display: "none" }}
											onChange={handleFiles}
										/>
										{retMsg.uploadText}
									</label>
								</div>
								<div className="col d-flex justify-content-center pt-5">
									<img
										className="img-fluid"
										src={require("../assets/img/signup/signuptop.png")}
										alt="heart"
										width="129px"
										height="71px"
									/>
								</div>
							</div>
							<div className="d-flex justify-content-center">
								<div className="col-12">
									<div className="col-12 ">
										<input
											type="text"
											maxLength={30}
											minLength={3}
											className={`form-control mt-2 p-2 ${
												errorDisp.fname && formData.fname?.length <= 3
													? "is-invalid-input"
													: ""
											}`}
											placeholder="Name"
											name="fname"
											value={formData.fname}
											onChange={(e) => handleChangeFormDataText(e)}
										/>
										{errorDisp.fname && formData.fname?.length <= 3 && (
											<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
												Please fill
											</p>
										)}
									</div>
									<div className="col-12">
										<input
											type="text"
											className={`form-control mt-4 p-2 ${
												errorDisp.email &&
												!formData.email.match(
													/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
												)
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

									<div className="col-12">
										<select
											key={"gender"}
											className={`form-select mt-4 p-2 ${
												errorDisp.gender && formData.gender?.length <= 0
													? "is-invalid-input"
													: ""
											}`}
											aria-label=""
											name="gender"
											onChange={(e) => handleChangeFormData(e)}
											value={formData.gender}
										>
											<option value="">Gender</option>
											<option value="Male">Male</option>
											<option value="Female">Female</option>
										</select>
										{errorDisp.gender && formData.gender?.length <= 3 && (
											<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
												Please Select
											</p>
										)}
									</div>
									<div className="col-12">
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
									<div className="col-12">
										<select
											className={`form-select mt-4 p-2 ${
												errorDisp.language && formData.language?.length <= 3
													? "is-invalid-input"
													: ""
											}`}
											aria-label="Language"
											name="language"
											onChange={(e) => handleChangeFormData(e)}
											value={formData.language}
										>
											<option value="" selected>
												Language
											</option>
											{language.languages?.map((item) => {
												return <option value={item}>{item}</option>;
											})}
										</select>
										{errorDisp.language && formData.language?.length <= 3 && (
											<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
												Please Select
											</p>
										)}
									</div>
									<div className="col-12">
										<select
											className={`form-select mt-4 p-2 ${
												errorDisp.religion && formData.religion?.length <= 3
													? "is-invalid-input"
													: ""
											}`}
											aria-label=""
											name="religion"
											onChange={(e) => handleChangeFormData(e)}
											value={formData.religion}
										>
											<option value="" selected>
												Religion
											</option>
											{religion.religion?.map((item) => {
												return <option value={item}>{item}</option>;
											})}
										</select>
										{errorDisp.religion && formData.religion?.length <= 3 && (
											<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
												Please Select
											</p>
										)}
									</div>
									<div className="col-12">
										<input
											type="text"
											className={`form-control mt-4 p-2 ${
												errorDisp.edu_qual && formData.edu_qual?.length <= 3
													? "is-invalid-input"
													: ""
											}`}
											placeholder="Educational"
											name="edu_qual"
											value={formData.edu_qual}
											onChange={(e) => handleChangeFormDataText(e)}
										/>
										{errorDisp.edu_qual && formData.edu_qual?.length <= 3 && (
											<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
												Please Fill
											</p>
										)}
									</div>
									<div className="col-12">
										<input
											type="text"
											maxLength={30}
											minLength={3}
											className={`form-control mt-4 p-2 ${
												errorDisp.profession && formData.profession?.length <= 3
													? "is-invalid-input"
													: ""
											}`}
											placeholder="Profession"
											name="profession"
											value={formData.profession}
											onChange={(e) => handleChangeFormData(e)}
										/>
										{errorDisp.profession &&
											formData.profession?.length <= 3 && (
												<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
													Please Fill
												</p>
											)}
									</div>
									<div className="col-12">
										<select
											className={`form-select mt-4 p-2 ${
												errorDisp.annual_income &&
												formData.annual_income?.length <= 3
													? "is-invalid-input"
													: ""
											}`}
											aria-label=""
											name="annual_income"
											onChange={(e) => handleChangeFormData(e)}
											value={formData.annual_income}
										>
											<option value="" selected>
												Annual Income
											</option>
											<option value="No Income">No Income</option>
											<option value="Upto 2 Lakhs">Upto 2 Lakhs</option>
											<option value="2 Lakhs - 5 Lakhs">
												2 Lakhs - 5 Lakhs
											</option>
											<option value="5 Lakhs - 10 Lakhs">
												5 Lakhs - 10 Lakhs
											</option>
											<option value="10 Lakhs - 18 Lakhs">
												10 Lakhs - 18 Lakhs
											</option>
											<option value="18 Lakhs - 30 Lakhs">
												18 Lakhs - 30 Lakhs
											</option>
											<option value="30 Lakhs - 50 Lakhs">
												30 Lakhs - 50 Lakhs
											</option>
											<option value="50 Lakhs - 1 Crore">
												50 Lakhs - 1 Crore
											</option>
											<option value="Above 1 Crore">Above 1 Crore</option>
										</select>
										{errorDisp.annual_income &&
											formData.annual_income?.length <= 3 && (
												<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
													Please Select
												</p>
											)}
									</div>
									<div className="col-12">
										<select
											className={`form-select mt-4 p-2 ${
												errorDisp.food && formData.food?.length <= 3
													? "is-invalid-input"
													: ""
											}`}
											aria-label=""
											name="food"
											onChange={(e) => handleChangeFormData(e)}
											value={formData.food}
										>
											<option value="" selected>
												Food
											</option>
											<option value="Non-Vegetarian">Non-Vegetarian</option>
											<option value="Vegetarian">Vegetarian</option>
											<option value="Vegan">Vegan</option>
										</select>
										{errorDisp.food && formData.food?.length <= 3 && (
											<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
												Please Select
											</p>
										)}
									</div>
									<div className="col-12">
										<select
											className={`form-select mt-4 p-2 ${
												errorDisp.height && formData.height?.length <= 3
													? "is-invalid-input"
													: ""
											}`}
											aria-label=""
											name="height"
											onChange={(e) => handleChangeFormData(e)}
											value={formData.height}
										>
											<option value="" selected>
												Height
											</option>
											{heightComp()}
										</select>
										{errorDisp.height && formData.height?.length <= 3 && (
											<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
												Please Select
											</p>
										)}
									</div>
									<div className="col-12">
										<select
											className={`form-select mt-4 p-2 ${
												errorDisp.height && formData.weight?.length <= 3
													? "is-invalid-input"
													: ""
											}`}
											aria-label=""
											name="weight"
											onChange={(e) => handleChangeFormData(e)}
											value={formData.weight}
										>
											<option value="" selected>
												Weight
											</option>
											{weightComp()}
										</select>

										{errorDisp.weight && formData.weight?.length <= 3 && (
											<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
												Please Select
											</p>
										)}
									</div>
									<div className="col-12">
										<input
											type="text"
											className={`form-control mt-4 p-2 ${
												errorDisp.city && formData.city?.length <= 3
													? "is-invalid-input"
													: ""
											}`}
											placeholder="City"
											name="city"
											value={formData.city}
											onChange={(e) => handleChangeFormData(e)}
										/>
										{errorDisp.city && formData.city?.length <= 3 && (
											<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
												Please fill
											</p>
										)}
									</div>
									<div className="col-12">
										<select
											className={`form-select mt-4 p-2 ${
												errorDisp.state && formData.state?.length <= 3
													? "is-invalid-input"
													: ""
											}`}
											aria-label=""
											name="state"
											onChange={(e) => handleChangeFormData(e)}
											value={formData.state}
										>
											<option value="" selected>
												State
											</option>
											{stateDist.states?.map((item) => {
												return <option value={item.state}>{item.state}</option>;
											})}
										</select>
										{errorDisp.state && formData.state?.length <= 3 && (
											<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
												Please Select
											</p>
										)}
									</div>
									<div className="col-12">
										<select
											className={`form-select mt-4 p-2 ${
												errorDisp.country && formData.country?.length <= 3
													? "is-invalid-input"
													: ""
											}`}
											aria-label=""
											name="country"
											onChange={(e) => handleChangeFormData(e)}
											value={formData.country}
										>
											<option value="" selected>
												Country
											</option>
											<option value="India" selected>
												India
											</option>
										</select>
										{errorDisp.country && formData.country?.length <= 3 && (
											<p className="is-invalid-text text-nowrap text-nowrap error text-capitalize mb-0 position-absolute">
												Please Select
											</p>
										)}
									</div>
								</div>
							</div>
						</div>
						<div className="d-flex justify-content-center">
							<div className="d-grid gap-2  mx-auto mt-4 mb-5">
								<p className={`text-center ${retMsg.type}`}>{retMsg.msg}</p>
								<div className="input-group">
									<button
										type="submit"
										className="btn btn-primary bg-dark p-2 me-1"
										onClick={() => handleEditView("VIEW")}
									>
										View
									</button>
									<button
										type="submit"
										className="btn btn-primary bg-dark p-2"
										disabled={loading}
									>
										Update
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};
