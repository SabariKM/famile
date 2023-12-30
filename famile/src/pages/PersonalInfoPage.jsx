import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { AccessContext } from "../constant/AccessContext";

import "../css/common.css";
import { Footer } from "../component/Footer";
import { Header } from "../component/Header";
import { PersonalInfoEdit } from "../component/PersonalInfoEdit";
import { PersonalInfoView } from "../component/PersonalInfoView";

import { getpersonalinfo } from "../constant/url";

export const PersonalInfoPage = (props) => {
	let navigate = useNavigate();
	const state = useLocation()["state"];
	const access = useContext(AccessContext).authID;
	const [loading, setLoading] = useState();

	let propData = { ...state, login: false };

	const [formData, setFormData] = useState({
		fname: "",
		email: "",
		gender: "",
		dob: "",
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
		country: "",
		photo: require("../assets/img/signup/profilesample.png"),
	});
	const [dispBox, setDispBox] = useState(
		<PersonalInfoEdit propData={propData} formData={formData} />
	);
	const [dispBtn, setDispBtn] = useState("VIEW");
	const [dispMobBtn, setDispMobBtn] = useState(
		<i className="fa fa-2x fa-eye" aria-hidden="true"></i>
	);
	if (access !== undefined && access !== null && access !== "") {
		propData = { authID: access, login: true };
	}

	const handlePersonalInfo = async () => {
		setLoading(true);
		var bodyFormData = new FormData();
		bodyFormData.append("authId", access);

		await axios({
			method: "post",
			url: getpersonalinfo,
			data: bodyFormData,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then(function (response) {
				//handle success
				const res_data = response.data;
				if (res_data.status_code === 101) {
					navigate("/login");
				} else if (res_data.status_code === 200) {
					const udata = res_data.data;
					setFormData({
						fname: udata.fname,
						email: udata.email,
						gender: udata.gender,
						dob: udata.dob,
						language: udata.language,
						religion: udata.religion,
						edu_qual: udata.edu_qual,
						profession: udata.profession,
						annual_income: udata.annual_income,
						food: udata.food,
						height: udata.height,
						weight: udata.weight,
						city: udata.city,
						state: udata.state,
						country: udata.country,
						photo: udata.photo,
					});
				}
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
		setLoading(false);
	};

	const handleEditView = (e) => {
		if (e === "EDIT") {
			setDispBtn("VIEW");
			setDispMobBtn(<i className="fa fa-3x fa-eye" aria-hidden="true"></i>);
			setDispBox(
				<PersonalInfoEdit
					propData={propData}
					pageChange={(name) => handleEditView(name)}
					formData={formData}
				/>
			);
		} else if (e === "VIEW") {
			setDispBtn("EDIT");
			setDispMobBtn(
				<i className="fa fa-3x fa-pencil-square" aria-hidden="true"></i>
			);
			setDispBox(
				<PersonalInfoView
					propData={propData}
					pageChange={(name) => handleEditView(name)}
					formData={formData}
				/>
			);
		}
	};

	useEffect(() => {
		if (propData.authID === undefined || !propData.authID) {
			navigate("/login");
			return;
		}
		if (propData.acctype === "signup") {
			navigate("/sgpersonalinfo");
			return;
		}
		handlePersonalInfo();
		if (access !== undefined && access !== null && access !== "") {
			setDispBox(
				<PersonalInfoView
					propData={propData}
					pageChange={(name) => handleEditView(name)}
					formData={formData}
				/>
			);
		}
	}, [access]);
	useEffect(() => {
		handleEditView(dispBtn);
	}, [formData]);
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
						{dispBox}
					</div>
				</div>
			</div>
			<div className="ft-footer-block">
				<Footer />
			</div>
		</>
	);
};
