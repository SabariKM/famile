import React, { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AccessContext } from "../constant/AccessContext";
import axios from "axios";
import { setpersonalinfo } from "../constant/url";
import "../css/common.css";
import { Footer } from "../component/Footer";
import { Header } from "../component/Header";
import { toast } from "react-toastify";

export const SgPersonalInfoImage = (props) => {
	let navigate = useNavigate();
	const state = useLocation()["state"];
	let propData = { ...state, login: false };
	const access = propData?.authID;
	const [formData, setFormData] = useState({
		photo: require("../assets/img/signup/imginner.png"),
	});
	const [errorDisp, setErrorDisp] = useState(true);
	const [retMsg, setRetMsg] = useState({
		type: "",
		msg: "",
		uploadText: "Upload Photo",
	});
	const [sampleImg, setSampleImg] = useState("sampleInnerImage");
	const [loading, setLoading] = useState(false);

	// const handleFiles = (files) => {
	// 	setFormData({
	// 		...formData, // copy the current properties of "json"
	// 		photo: files.base64, // update the "name" property
	// 	});
	// 	setRetMsg({ ...retMsg, uploadText: "Change Photo" });
	// 	setSampleImg("");
	// 	setErrorDisp(false);
	// };

	const handleFiles = (e) => {
		console.log(e.target.files[0]);
		setFormData({
			...formData, // copy the current properties of "json"
			photo: URL.createObjectURL(e.target.files[0]), // update the "name" property
			photo_raw: e.target.files[0],
		});
		setRetMsg({ ...retMsg, uploadText: "Change Photo" });
		setSampleImg("");
		setErrorDisp(false);
	};

	const handlePersonalInfo = async () => {
		if (errorDisp) {
			return false;
		}
		setLoading(true);
		var bodyFormData = new FormData();
		bodyFormData.append("authId", access);
		bodyFormData.append("photo", formData.photo_raw);

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
					toast.success("Photo Uploaded Successfully");
					setTimeout(() => {
						if (!propData?.login) {
							navigate("/signuptermsofuse", { state: propData });
						}
					}, 5000);
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

	useEffect(() => {
		if (propData.authID === undefined || !propData.authID) {
			navigate("/login");
		}
	}, [access]);

	return (
		<>
			<Header loginStatus={props.loginStatus} />
			<div className="container d-flex justify-content-center">
				<div className="main-div">
					<div className="pt-5">
						<div className="row">
							<div className="col px-5 p-md-0 ">
								<h2 className="text-center">Please Upload Your Best Photo</h2>
								<p className="text-center mb-0">
									Smile Please. And make sure your photo is vertical.
								</p>
								<p className="text-center ">
									(Upload JPEG, PNG only. Max 1 MB file size.)
								</p>
							</div>
						</div>
						<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-4">
							<div className="col d-flex justify-content-center">
								<div className="sampleImgBox position-relative">
									<div className="col">
										<img
											className="sampleImgHeart  img-fluid"
											alt="Famile"
											src={require("../assets/img/signup/Vector.png")}
										/>
										<div className="d-flex justify-content-center ">
											<img
												className={`img-fluid ${sampleImg}`}
												src={formData.photo}
												alt="profileimg"
											/>
										</div>
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
							<div className="col d-flex justify-content-center mt-1 position-relative">
								<div className="d-grid gap-2 col-8 col-md-6 mx-auto">
									<div style={{ height: "30px" }}>
										{errorDisp && (
											<div>
												<p className="is-invalid-text text-nowrap  error mx-auto text-capitalize mb-1">
													Please Select Image
												</p>
											</div>
										)}
										{errorDisp === true && (
											<div>
												<p
													className={`is-invalid-text text-nowrap  error mx-auto text-capitalize mb-1 ${retMsg.type}`}
												>
													{retMsg.msg}
												</p>
											</div>
										)}
									</div>
									<button
										className="btn btn-lg btn-dark text-white btn-outline-dark"
										onClick={() => handlePersonalInfo()}
									>
										SUBMIT
									</button>
								</div>
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
					</div>
				</div>
			</div>

			<div className="ft-footer-block">
				<Footer />
			</div>
		</>
	);
};
