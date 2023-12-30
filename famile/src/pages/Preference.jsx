import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { getPreferance } from "../constant/url";
import { useNavigate, useLocation } from "react-router-dom";
import { AccessContext } from "../constant/AccessContext";
import "../css/common.css";
import { Footer } from "../component/Footer";
import { Header } from "../component/Header";
import { PreferanceEdit } from "../component/PreferanceEdit";
import { PreferanceView } from "../component/PreferanceView";

export const Preference = (props) => {
	let navigate = useNavigate();
	const access = useContext(AccessContext)?.authID;

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

	const [dispBox, setDispBox] = useState(
		<PreferanceEdit authID={access} formData={formData} />
	);
	const [dispBtn, setDispBtn] = useState("EDIT");

	const handlePreferance = async () => {
		var bodyFormData = new FormData();
		bodyFormData.append("authId", access);

		await axios({
			method: "post",
			url: getPreferance,
			data: bodyFormData,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then(function (response) {
				//handle success
				const res_data = response.data;
				if (res_data.status_code === 101) {
				} else if (res_data.status_code === 200) {
					const retData = res_data.data;
					setFormData({
						gender: retData.gender,
						fromAge: retData.fromAge,
						toAge: retData.toAge,
						marital_status: retData.marital_status,
						food: retData.food,
						language: retData.language,
						religion: retData.religion,
						state: retData.state,
						country: retData.country,
					});
					// setRetMsg({ type: "success", msg: res_data.status_msg });
				} else {
					// setRetMsg({ type: "error", msg: res_data.status_msg });
				}
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
	};

	const handleEditView = (e) => {
		if (e === "EDIT") {
			setDispBtn("VIEW");
			setDispBox(<PreferanceEdit authID={access} formData={formData} />);
		} else if (e === "VIEW") {
			setDispBtn("EDIT");
			setDispBox(<PreferanceView authID={access} formData={formData} />);
		}
	};

	const handleLoginRegister = (e) => {
		if (e === "login") {
			navigate("/login");
		}
	};

	useEffect(() => {
		if (!access) {
			navigate("/login");
			return;
		} else {
			handlePreferance();
			handleEditView("EDIT");
		}
	}, [access]);

	useEffect(() => {
		handleEditView(dispBtn);
	}, [formData]);

	return (
		<>
			<Header
				acc_type="login"
				ret_type={(e) => handleLoginRegister(e)}
				loginStatus={props.loginStatus}
			/>
			<div className="container ">
				<div className="main-div" style={{ height: "950px" }}>
					<div className="col">
						<div className="row">
							<div className="col pt-5">
								<h2 className="text-center">Preferences</h2>
								{dispBox}
								<div className="col-12">
									<div className="d-flex justify-content-center mt-3">
										<div className="d-grid gap-2 col-3 col-md-1 bg-light">
											<button
												className="btn shadow-sm btn-dark font14 "
												name={dispBtn}
												onClick={(e) => handleEditView(e.target.name)}
											>
												{dispBtn}
											</button>
										</div>
									</div>
								</div>
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
