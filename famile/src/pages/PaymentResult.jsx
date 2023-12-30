import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import {
	resendVerificationNumber,
	verifyVerificationNumber,
	updateGeneric,
	getSubscription,
} from "../constant/url";

import "../css/common.css";
import { Footer } from "../component/Footer";
import { Header } from "../component/Header";
import { SubscriptionProgress } from "../component/SubscriptionProgress";

export const PaymentResult = (props) => {
	const propData = useLocation()["state"];
	const access = propData?.authID;
	const phone = propData?.phone;
	let navigate = useNavigate();
	const [vState, setvState] = useState(1);
	const [componentDisp, setComponentDisp] = useState();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [resultMessage, setResultMessage] = useState("");
	const [validTill, setValidTill] = React.useState();

	const handleGetSubDetails = async (access) => {
		var bodyFormData = new FormData();
		bodyFormData.append("authId", access);

		await axios({
			method: "post",
			url: getSubscription,
			data: bodyFormData,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then(function (response) {
				//handle success
				const res_data = response.data;
				if (res_data.status_code === 101) {
					navigate("/login");
				} else if (res_data.status_code === 200) {
					setValidTill(moment(res_data.data.valid_till).format("MMM Do YYYY"));
				}
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
	};

	React.useEffect(() => {
		handleGetSubDetails(access);
	}, [access]);

	function VerifyPhoneBox() {
		const [vCode, setvCode] = useState();
		const [vphone, setvPhone] = useState(phone);
		const [enablePhoneUpdate, setEnablePhoneUpdate] = useState(false);

		const handleChangeFormData_verify = (e) => {
			const { name, value } = e.target;
			setvPhone(value);
		};

		return (
			<>
				<h3 className="text-center mt-3 semiFont">Verify Your Phone</h3>
				<p className="cp  text-center">
					To receive Verification Code,{" "}
					<a
						href="javascript:void(0)"
						className=" pmt-a "
						onClick={() => handleResendOtp("phone")}
					>
						Click Here
					</a>
				</p>
				<div className="d-flex justify-content-center">
					<div className="col-xl-8 col-md-8  col-xs-12">
						<input
							placeholder="Verification Code"
							className="form-control mt-2 p-2"
							type="number"
							onChange={(e) => setvCode(e.target.value)}
							value={vCode}
						/>
						<div className="d-grid gap-2 mt-4">
							<button
								className="btn btn-dark btn-lg mt-3"
								onClick={() => handleVerifyOTP(2, vCode, "phone")}
							>
								PROCEED
							</button>
						</div>
						{enablePhoneUpdate && (
							<div className="d-flex justify-content-center">
								<div className="col-12 mt-5">
									<div className="input-group mb-3">
										<input
											type="numeric"
											maxLength="10"
											minLength="10"
											className="form-control"
											placeholder="Phone No."
											name="phone"
											value={vphone}
											onChange={(e) => handleChangeFormData_verify(e)}
										/>

										<div className="input-group-append">
											<button
												className="btn btn-dark"
												type="button"
												onClick={() =>
													handleUpdate({ name: "phone", value: vphone })
												}
											>
												Update
											</button>
											<button
												className="btn btn-dark ms-1"
												type="button"
												onClick={() => setEnablePhoneUpdate(false)}
											>
												X
											</button>
										</div>
									</div>
								</div>
							</div>
						)}
						<div className="d-flex justify-content-between mt-3">
							<a
								href="javascript:void(0)"
								className="pmt-a text-start text-dark"
								onClick={() => setEnablePhoneUpdate(true)}
							>
								Change Number
							</a>
							{/*<p className="text-center text-dark ">(50 sec)&nbsp;&nbsp;</p>*/}
							<a
								href="javascript:void(0)"
								className=" pmt-a text-end text-muted "
								onClick={() => handleResendOtp("phone")}
							>
								Resend
							</a>
						</div>
					</div>
				</div>
			</>
		);
	}

	const VerifyEmailBox = () => {
		const [vCode, setvCode] = useState();
		const [vemail, setvemail] = useState("");
		const [enableEmailUpdate, setEnableEmailUpdate] = useState(false);
		return (
			<>
				<h3 className="text-center mt-3 semiFont">Verify Your Email</h3>
				<p className="cp  text-center">
					To receive Verification Code,{" "}
					<a
						href="javascript:void(0)"
						className=" pmt-a "
						onClick={() => handleResendOtp("email")}
					>
						Click Here
					</a>
				</p>
				<div className="d-flex justify-content-center">
					<div className="col-xl-8 col-md-8  col-xs-12">
						<input
							placeholder="Verification Code"
							className="form-control mt-2 p-2"
							type="number"
							onChange={(e) => setvCode(e.target.value)}
							value={vCode}
						/>
						<div className="d-grid gap-2 mt-4">
							<button
								className="btn btn-dark btn-lg mt-3"
								onClick={() => handleVerifyOTP(3, vCode, "email")}
							>
								PROCEED
							</button>
						</div>
						{enableEmailUpdate && (
							<div className="d-flex justify-content-center">
								<div className="col-12 mt-5">
									<div className="input-group mb-3">
										<input
											type="numeric"
											className="form-control"
											placeholder="Email"
											name="email"
											onChange={(e) => setvemail(e.target.value)}
										/>
										<div className="input-group-append">
											<button
												className="btn btn-dark"
												type="button"
												onClick={() =>
													handleUpdate({ name: "email", value: vemail })
												}
											>
												Update
											</button>
											<button
												className="btn btn-dark ms-1"
												type="button"
												onClick={() => setEnableEmailUpdate(false)}
											>
												X
											</button>
										</div>
									</div>
								</div>
							</div>
						)}
						<div className="d-flex justify-content-between mt-3">
							<a
								href="javascript:void(0)"
								className="pmt-a text-start text-dark"
								onClick={() => setEnableEmailUpdate(true)}
							>
								Change Email
							</a>
							{/*<p className="text-center text-dark ">(50 sec)&nbsp;&nbsp;</p>*/}
							<a
								href="javascript:void(0)"
								className=" pmt-a text-end text-muted "
								onClick={() => handleResendOtp("email")}
							>
								Resend
							</a>
						</div>
					</div>
				</div>
			</>
		);
	};

	const VerifyPreferanceBox = () => {
		return (
			<>
				<div className="d-flex justify-content-center">
					<img
						src={require("../assets/img/signup/wedding_2.png")}
						alt="wedding"
					/>
				</div>
				<h2 className="text-center">Your Partner Preferences</h2>
				<p className="text-center p-2">
					Set your partner preferences by clicking the button below. Keep your
					preferences reasonably broad to attract a wide range of partner
					profiles.
				</p>
				<div className="d-flex justify-content-center">
					<div className="col-xl-4 col-md-4  col-xs-12">
						<div className="d-grid gap-2 mt-2">
							<button
								className="btn btn-dark btn-lg mt-3"
								onClick={() => {
									navigate("/preference", { state: propData });
								}}
							>
								VIEW
							</button>
						</div>
					</div>
				</div>
			</>
		);
	};

	const handleVerifyOTP = async (statusLevel, vCode, type) => {
		setLoading(true);
		var bodyFormData = new FormData();
		bodyFormData.append("access_code", access);
		bodyFormData.append("verification_code", vCode);
		bodyFormData.append("type", type);
		await axios({
			method: "post",
			url: verifyVerificationNumber,
			data: bodyFormData,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then(function (response) {
				//handle success
				const res_data = response.data;
				if (res_data.status_code === 101) {
					toast("Api Authentication failed. login again.");
				} else if (res_data.status_code === 200) {
					setvState(statusLevel);
					setSuccess(true);
					setError(false);
					setResultMessage(res_data.status_msg);
				} else {
					setError(true);
					setSuccess(false);
					setResultMessage(res_data.status_msg);
				}
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
		setLoading(false);
	};

	const handleUpdate = async (e) => {
		setLoading(true);
		const { name, value } = e;
		var bodyFormData = new FormData();
		bodyFormData.append("authId", access);
		bodyFormData.append(name, value);
		await axios({
			method: "post",
			url: updateGeneric,
			data: bodyFormData,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then(function (response) {
				//handle success
				const res_data = response.data;
				if (res_data.status_code === 200) {
					setError(false);
					setSuccess(true);
					setResultMessage(res_data.status_msg);
				} else {
					setError(true);
					setSuccess(false);
					setResultMessage(res_data.status_msg);
				}
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
		setLoading(false);
	};

	const handleResendOtp = async (type) => {
		setLoading(true);
		var bodyFormData = new FormData();
		bodyFormData.append("access_code", access);
		bodyFormData.append("type", type);
		await axios({
			method: "post",
			url: resendVerificationNumber,
			data: bodyFormData,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then(function (response) {
				//handle success
				const res_data = response.data;
				if (res_data.status_code === 200) {
					setError(false);
					setSuccess(true);
					setResultMessage(res_data.status_msg);
				} else {
					setError(true);
					setSuccess(false);
					setResultMessage(res_data.status_msg);
				}
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
		setLoading(false);
	};

	useEffect(() => {
		if (vState === 1) {
			setComponentDisp(<VerifyPhoneBox />);
		} else if (vState === 2) {
			setComponentDisp(<VerifyEmailBox />);
		} else if (vState === 3) {
			setComponentDisp(<VerifyPreferanceBox />);
		}
	}, [vState, access, phone]);

	useEffect(() => {
		if (!access && !phone) {
			navigate("/");
		}
	}, [access, phone]);
	return (
		<>
			<Header loginStatus={props.loginStatus} />
			<div className="container d-flex justify-content-center">
				<div className="main-div">
					<div className="content-div">
						<div className="row">
							<div className="col d-flex justify-content-center">
								<div className="col-12 col-md-8 ">
									<h3 className="text-center">Subscription Confirmed!</h3>
									<p className="cp text-center">
										Your subscription is valid till {validTill}
									</p>
									<div className="col d-flex justify-content-center">
										<img
											className="img-fulid"
											src={require("../assets/img/signup/tickCircle.png")}
											alt="tick circle"
										/>
									</div>
									<h3 className="text-center mt-4">Welcome To Famile!</h3>
									<p className="cp  text-center mt-4">
										Matching profiles will be emailed to you every Saturday
										based on availability of profiles.
									</p>
									<p className=" cp text-center">
										Please Verify Your Phone Number and Email Address Below
									</p>
									<div className=" d-flex justify-content-center">
										<div className="col-12">
											<div className="card">
												<div className="card-body pt-5">
													<SubscriptionProgress status={vState} />
													{componentDisp}
													{error && (
														<p className="error  mt-4 text-wrap text-center text-capitalize">
															{resultMessage}
														</p>
													)}
													{success && (
														<p className="success mt-4 text-wrap text-center text-capitalize ">
															{resultMessage}
														</p>
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="row mt-4">
							<div className="col">
								<div className="col d-flex justify-content-start">
									<img
										className="img-fluid btm-flower-left"
										src={require("../assets/img/signup/btmflower2.png")}
										alt="profileimg"
									/>
								</div>
							</div>
							<div className="col">
								<div className="col d-flex justify-content-end">
									<img
										className="img-fluid btm-flower-right"
										src={require("../assets/img/signup/btmflower2.png")}
										alt="profileimg"
									/>
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
