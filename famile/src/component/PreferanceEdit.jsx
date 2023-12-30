import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import stateDist from "../constant/state-dist.json";
import religion from "../constant/religion.json";
import language from "../constant/languages.json";
import { setPreferance } from "../constant/url";

export const PreferanceEdit = (props) => {
	const access = props?.authID;
	const [formData, setFormData] = useState({
		gender: "",
		fromAge: "",
		toAge: "",
		marital_status: "",
		food: "",
		language: "",
		religion: "",
		state: "",
		country: "",
	});
	const [errorDisp, setErrorDisp] = useState({
		gender: false,
		fromAge: false,
		toAge: false,
		marital_status: false,
		food: false,
		language: false,
		religion: false,
		state: false,
		country: false,
	});
	const [retMsg, setRetMsg] = useState({ type: "", msg: "" });
	const [loading, setLoading] = useState(false);
	const handleChangeFormData = (e) => {
		const { name, value } = e.target;
		setErrorDisp({ ...errorDisp, [name]: true });
		setFormData({
			...formData, // copy the current properties of "json"
			[name]: value, // update the "name" property
		});
	};

	const validateInput = () => {
		if (formData.gender.length === 0) {
			setErrorDisp(true);
			return false;
		} else if (formData.toAge <= 18 && formData.toAge < formData.fromAge) {
			setErrorDisp(true);
			return false;
		} else if (formData.language.length === 0) {
			setErrorDisp(true);
			return false;
		} else if (formData.religion.length === 0) {
			setErrorDisp(true);
			return false;
		} else if (formData.food.length === 0) {
			setErrorDisp(true);
			return false;
		} else if (formData.state.length === 0) {
			setErrorDisp(true);
			return false;
		} else if (formData.country.length === 0) {
			setErrorDisp(true);
			return false;
		}
		return true;
	};

	const handlePreferance = async (e) => {
		e.preventDefault();

		if (!validateInput()) {
			return false;
		}
		setLoading(true);
		var bodyFormData = new FormData();
		bodyFormData.append("authId", access);
		bodyFormData.append("gender", formData.gender);
		bodyFormData.append("toAge", formData.toAge);
		bodyFormData.append("fromAge", formData.fromAge);
		bodyFormData.append("marital_status", formData.marital_status);
		bodyFormData.append("language", formData.language);
		bodyFormData.append("religion", formData.religion);
		bodyFormData.append("food", formData.food);
		bodyFormData.append("state", formData.state);
		bodyFormData.append("country", formData.country);

		await axios({
			method: "post",
			url: setPreferance,
			data: bodyFormData,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then(function (response) {
				//handle success
				const res_data = response.data;
				if (res_data.status_code === 101) {
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

	const fromAge = () => {
		let elem = [];
		for (let i = 18; i <= 80; i++) {
			elem.push(<option value={i}>{i}</option>);
		}
		return elem;
	};

	const toAge = () => {
		let elem = [];
		for (let i = 18; i <= 80; i++) {
			elem.push(<option value={i}>{i}</option>);
		}
		return elem;
	};

	useEffect(() => {
		setFormData(props.formData);
	}, []);
	return (
		<form method="post" onSubmit={handlePreferance} className="col mt-5">
			<div className="row d-flex justify-content-center">
				<div className="col-10 col-md-5">
					<div className="col-12 mb-3">
						<select
							className={`basic-multiple form-select sel-td ${
								errorDisp.gender && formData.gender?.length <= 1
									? "is-invalid"
									: ""
							}`}
							aria-label=""
							name="gender"
							onChange={(e) => handleChangeFormData(e)}
							value={formData.gender}
						>
							<option value="" selected>
								Gender
							</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</select>
					</div>
					<div className="col-12 mb-3">
						<div class="input-group ">
							<select
								className={`form-select sel-td  ${
									errorDisp.fromAge && formData.fromAge?.length <= 1
										? "is-invalid"
										: ""
								}`}
								aria-label="fromAge"
								name="fromAge"
								onChange={(e) => handleChangeFormData(e)}
								value={formData.fromAge}
							>
								<option value="" selected>
									From Age
								</option>
								{fromAge()}
							</select>
							<select
								className={`form-select sel-td  ${
									errorDisp.toAge && formData.toAge?.length <= 1
										? "is-invalid"
										: ""
								}`}
								aria-label="toage"
								name="toAge"
								onChange={(e) => handleChangeFormData(e)}
								value={formData.toAge}
							>
								<option value="" selected>
									To Age
								</option>
								{toAge()}
							</select>
						</div>
					</div>
					<div className="col-12 mb-3">
						<select
							className={`form-select sel-td  ${
								errorDisp.marital_status && formData.marital_status?.length <= 1
									? "is-invalid"
									: ""
							}`}
							aria-label=""
							name="marital_status"
							onChange={(e) => handleChangeFormData(e)}
							value={formData.marital_status}
						>
							<option value="" selected>
								Marital Status
							</option>
							<option value="Any">Any</option>
							<option value="Never Married">Never Married</option>
							<option value="Widowed">Widowed</option>
							<option value="Divorced">Divorced</option>
						</select>
					</div>
					<div className="col-12 mb-3">
						<select
							className={`form-select sel-td  ${
								errorDisp.language && formData.language?.length <= 1
									? "is-invalid"
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
					</div>
					<div className="col-12 mb-3">
						<select
							className={` multiselect form-select sel-td  ${
								errorDisp.religion && formData.religion?.length <= 1
									? "is-invalid"
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
							<option value="Any">Any</option>
							{religion.religion?.map((item) => {
								return <option value={item}>{item}</option>;
							})}
						</select>
					</div>
					<div className="col-12 mb-3">
						<select
							className={`form-select sel-td  ${
								errorDisp.food && formData.food?.length <= 1 ? "is-invalid" : ""
							}`}
							aria-label=""
							name="food"
							onChange={(e) => handleChangeFormData(e)}
							value={formData.food}
						>
							<option value="" selected>
								Food
							</option>
							<option value="Vegetarian">Vegetarian</option>
							<option value="Non-Vegetarian">Non-Vegetarian</option>
						</select>
					</div>
					<div className="col-12 mb-3">
						<select
							className={`form-select sel-td  ${
								errorDisp.state && formData.state?.length <= 1
									? "is-invalid"
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
					</div>
					<div className="col-12 mb-3">
						<select
							className={`form-select sel-td  ${
								errorDisp.country && formData.country?.length <= 1
									? "is-invalid"
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
							<option value="India">India</option>
						</select>
					</div>
					<div className="col-12 mb-3">
						<p className={`text-center ${retMsg.type}`}>{retMsg.msg}</p>
						<div className="d-grid gap-2 col-4 mx-auto mt-4 ">
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
			</div>
		</form>
	);
};
