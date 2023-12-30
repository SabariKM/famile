import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { signup } from "../constant/url";

import "../css/signup.css";
import { Footer } from "../component/Footer";
import { Header } from "../component/Header";

export default function SignUp(props) {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({ name: "", phone: "" });
	const [loading, setLoading] = useState(false);
	const [errorText, setErrorText] = useState("");

	props.onLogOut(true);

	const validateInput = () => {
		if (formData.name?.length >= 30 || formData.name?.length <= 3) {
			setErrorText("Please Enter Valid Name.");
			return false;
		}

		if (
			formData.phone.trim()?.length < 10 ||
			formData.phone.trim()?.length > 10 ||
			isNaN(formData.phone)
		) {
			setErrorText("Please Enter Valid Phone.");
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
					console.log("Signup accepted, Proceeding to verification.");
					navigate("/sgpersonalinfo", {
						state: {
							authID: res_data.authId,
							phone: formData.phone,
							fname: formData.name,
							acctype: "signup",
						},
					});
				} else if (res_data.status_code === 203) {
					setErrorText(203);
				} else {
					setErrorText(res_data.status_msg);
				}
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
		setLoading(false);
	};
	const handleLoginRegister = (e) => {
		if (e === "login") {
			navigate("/login");
		}
	};

	const handleChangeFormData = (e) => {
		const { name, value } = e.target;
		if (name === "phone" && isNaN(value)) {
			setErrorText("Please Enter Valid Phone Number.");
			return false;
		} else {
			setErrorText("");
		}
		if (name === "name" && !/^[A-Za-z ]+$/.test(value) && value.length !== 0) {
			setErrorText("Please Enter Valid Name.");
			return false;
		} else {
			setErrorText("");
		}

		if (name === "name" && value.length >= 30) {
			setErrorText("Please Enter Valid Name.");
			return false;
		} else {
			setErrorText("");
		}
		setFormData({
			...formData, // copy the current properties of "json"
			[name]: value, // update the "name" property
		});
	};
	return (
		<>
			<Header acc_type="login" ret_type={(e) => handleLoginRegister(e)} />
			<div className="SIGNUP ">
				<div className="container container-width ">
					<div className="row mt-5">
						<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 position-relative d-flex justify-content-sm-center justify-content-md-start">
							<div className="first-block-left">
								<p className="title" style={{ color: "#141414" }}>
									Famile
								</p>
								<p>
									Famile is a community, a matrimonial network for people who do
									not believe in caste.
								</p>
								<p>
									With a vision to foster meaningful connections based on
									positive values and journeys, our network sincerely cares for
									the genuinely good people.
								</p>
								<div className="row mt-md-5 pt-5">
									<div className="col">
										<p className="para text-start mb-0">
											<strong className="bold-title">34</strong> avg.
										</p>
										<p className="para text-start">Registrations/Week</p>
									</div>
									<div className="col">
										<p className="para mb-0">
											<strong className="bold-title">83%</strong>
										</p>
										<p className="para">Success Rate</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 p-0">
							<div className="first-block-right">
								<img
									className="bg-dots d-none d-sm-none d-md-none d-lg-block d-xl-block"
									alt="Famile mm"
									src={require("../assets/img/group-1088.png")}
								/>
								<img
									className="vec-heart img-fluid"
									alt="Famile mm"
									src={require("../assets/img/signup/Vector.png")}
								/>
								<div className="col">
									<div className="">
										<div className="d-flex justify-content-center">
											<div className="col-5 d-flex justify-content-center ">
												<img
													className="img1 img-w-h-full img-fluid p-2 pb-3"
													alt="Famile mm"
													src={require("../assets/img/signup/img1.png")}
												/>
											</div>
											<div className="col-7 d-flex justify-content-center ">
												<img
													className="img4 img-w-h-full img-fluid p-2 pb-3"
													alt="Famile mm"
													src={require("../assets/img/signup/img2.png")}
												/>
											</div>
										</div>
									</div>
									<div className="">
										<div className="d-flex justify-content-center">
											<div className="col-7 d-flex justify-content-center">
												<img
													className="img2 img-w-h-full img-fluid p-2 pt-0"
													alt="Famile mm"
													src={require("../assets/img/signup/img3.png")}
												/>
											</div>
											<div className="col-5">
												<img
													className="img3 img-fluid img-w-h-full p-2 pt-0"
													alt="Hands indian bride"
													src={require("../assets/img/signup/img4.png")}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className=" d-flex second-block section">
						<div className="col-10 col-md-3 d-flex justify-content-center p-2">
							<div className="card">
								<div className="card-body p-3">
									<div className="d-flex justify-content-end ">
										<img
											className="box-icon "
											alt="Famile mm"
											src={require("../assets/img/signup/rate-2.png")}
										/>
									</div>
									<h2>Community</h2>
									<p className="mt-4">
										Our community is peaceful and rational. People joining our
										community are fostering life-time bonds.
									</p>
								</div>
							</div>
						</div>
						<div className="col-10 col-md-3 d-flex justify-content-center p-2">
							<div className="card">
								<div className="card-body p-3">
									<div className="d-flex justify-content-end ">
										<img
											className="box-icon"
											alt="Famile mm"
											src={require("../assets/img/signup/privacy-1.png")}
										/>
									</div>
									<h2>Privacy</h2>
									<p className="mt-4">
										Your profile will not be listed publicly. Famile is built as
										a unique network where member profiles are shared with each
										other purely based on mutual interest only.
									</p>
								</div>
							</div>
						</div>

						<div className="col-10 col-md-3 d-flex justify-content-center p-2">
							<div className="card">
								<div className="card-body p-3">
									<div className="d-flex justify-content-end ">
										<img
											className="box-icon"
											alt="Famile mm"
											src={require("../assets/img/signup/handshake-1.png")}
										/>
									</div>
									<h2>Verified</h2>
									<p className="mt-4">
										Each profile is individually verified for genuineness and
										intent to marry.
									</p>
								</div>
							</div>
						</div>
						<div className="col-10 col-md-3 d-flex justify-content-center p-2">
							<div className="card">
								<div className="card-body p-3">
									<div className="d-flex justify-content-end ">
										<img
											className="box-icon"
											alt="Famile mm"
											src={require("../assets/img/signup/checked-1.png")}
										/>
									</div>
									<h2>Trust</h2>
									<p className="mt-4">
										We do not sell your data or any information regarding you to
										third party services.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="d-flex secondReel-block section">
					<div className="col-10 col-md-3 px-1">
						<img
							className="reel-rounded img-fluid"
							src={require("../assets/img/signup/gifplace.png")}
							alt=""
						/>
					</div>
					<div className="col-10 col-md-3 px-1">
						<img
							className="reel-rounded img-fluid"
							src={require("../assets/img/signup/gifplace2.png")}
							alt=""
						/>
					</div>
					<div className="col-10 col-md-3 px-1">
						<img
							className="reel-rounded img-fluid"
							src={require("../assets/img/signup/gifplace1.png")}
							alt=""
						/>
					</div>

					<div className="col-10 col-md-3 px-1">
						<img
							className="reel-rounded img-fluid"
							src={require("../assets/img/signup/gifplace2.png")}
							alt=""
						/>
					</div>
				</div>
				<div className="section position-relative third-box ">
					<div className="position-absolute" style={{ zIndex: -1 }}>
						<img
							className="bg-image  "
							alt="Famile mm"
							src={require("../assets/img/signup/Join-Background.webp")}
						/>
					</div>

					<div className="container container-width">
						<div className="col">
							<div className="d-flex justify-content-center">
								<div className="col-12 mt-3 position-relative d-flex justify-content-center">
									<div className="inp-box">
										<div className="rectangle rectangle4" />
										<div className="rectangle rectangle3" />
										<div className="rectangle rectangle2" />
										<div className="rectangle rectangle1 pt-3">
											<div className="d-flex justify-content-center">
												<form
													method="post"
													className="signup-form mx-4"
													onSubmit={(e) => handleSignUp(e)}
												>
													<h2 className="text-center mt-3">Join Our Network</h2>
													<p className="text-center mb-0">
														Enter your details below
													</p>
													<div
														className="position-relative"
														style={{ height: "25px" }}
													>
														{errorText?.length > 5 && (
															<p className="error text-center text-capitalize m-0">
																{errorText}
															</p>
														)}
														{errorText === 203 && (
															<p className="error text-center text-capitalize m-0">
																Already Registered
																<NavLink
																	to={"/login"}
																	exact
																	className="error text-center text-capitalize ps-1"
																	style={{
																		textDecoration: "underline !impoirtant",
																	}}
																>
																	Login
																</NavLink>
															</p>
														)}
													</div>
													<input
														required
														type="text"
														value={formData.name}
														className="form-control p-2 mt-1"
														placeholder="Name"
														name="name"
														onChange={(e) => handleChangeFormData(e)}
													/>

													<div className="input-group mt-3">
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
															className="form-control p-2"
															placeholder="Phone"
															name="phone"
															onChange={(e) => handleChangeFormData(e)}
														/>
													</div>
													<div className="d-grid gap-2 col-10 mx-auto mt-4 ">
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
											<div className="d-flex justify-content-center pt-1">
												<img
													className="btm-flower"
													alt="Mask group"
													src={require("../assets/img/signup/mask-group.png")}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="section position-relative fourth-box">
					<div className="d-flex justify-content-center">
						<div className="col-12 col-md-6">
							<p className="sub-title">
								Interest-Based, Location-Centric Matchmaking
							</p>
						</div>
					</div>
					<div className="d-flex justify-content-center">
						<div className="col-11 col-md-6 ">
							<p className="para">
								Set your own preferences on your match-making process and our
								algorithms will best serve you. Our team is here to help if you
								need any assistance.
							</p>
						</div>
					</div>

					<div style={{ zIndex: -1 }} className="mt-1">
						<img
							className=" img-fluid bg-image"
							alt="preferance"
							src={require("../assets/img/signup/Preferences.webp")}
						/>
					</div>
				</div>
				<div className="section position-relative fifth-box">
					<div className="container container-width">
						<p className="sub-title">Frequently Asked Questions</p>
						<div className=" d-flex justify-content-center">
							<div className="col-12 col-md-10">
								<div className="accordion mt-1" id="accordionExample">
									<div className="accordion-item mb-3">
										<h2 className="accordion-header" id="headingOne">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapseOne"
												aria-expanded="true"
												aria-controls="collapseOne"
											>
												Is it true that my profile and photo will not be
												publicly shared?
											</button>
										</h2>
										<div
											id="collapseOne"
											className="accordion-collapse collapse "
											aria-labelledby="headingOne"
											data-bs-parent="#accordionExample"
										>
											<div className="accordion-body">
												<p>
													True. Your profile, email, phone number, photo or any
													other details about you will not be publicly shared
													with other users. Your profile is so private that
													nobody will know you joined Famile. All matches are
													conducted on a 1-to-1 basis and if both you and the
													other person are mutually interested, then your
													contact details such as phone number will be shared
													with each other.
												</p>
											</div>
										</div>
									</div>
									<div className="accordion-item mb-3">
										<h2 className="accordion-header" id="headingTwo">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapseTwo"
												aria-expanded="false"
												aria-controls="collapseTwo"
											>
												After I join Famile, how will I receive matches or
												matching-profiles?
											</button>
										</h2>
										<div
											id="collapseTwo"
											className="accordion-collapse collapse"
											aria-labelledby="headingTwo"
											data-bs-parent="#accordionExample"
										>
											<div className="accordion-body">
												<p>
													Every week, we scan all the profiles and select
													matches for you. Then we send the matches to you by
													email and we also notify you by sms informing you to
													check your email. The email you receive will have an
													Express Interest button under each profile. Clicking
													that button will notify that person of your interest.
													If they are also interested, your phone numbers will
													be shared with each other for your further
													consideration. If there are no new matches for you,
													then you will not receive the email and sms. But you
													will receive matches in subsequent weeks based on
													availability of matching-profiles.
												</p>
											</div>
										</div>
									</div>
									<div className="accordion-item mb-3">
										<h2 className="accordion-header" id="headingThree">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapseThree"
												aria-expanded="false"
												aria-controls="collapseThree"
											>
												How many profiles can I get per week?
											</button>
										</h2>
										<div
											id="collapseThree"
											className="accordion-collapse collapse"
											aria-labelledby="headingThree"
											data-bs-parent="#accordionExample"
										>
											<div className="accordion-body">
												<p>
													You will get up to 3 profiles per week. If there are
													no matches, you may not receive an email. Next week,
													you will receive emails based on availability of
													matching-profiles.
												</p>
											</div>
										</div>
									</div>
									<div className="accordion-item mb-3">
										<h2 className="accordion-header" id="headingfour">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapsefour"
												aria-expanded="false"
												aria-controls="collapsefour"
											>
												Does Famile verify the matching-profiles being sent to
												me?
											</button>
										</h2>
										<div
											id="collapsefour"
											className="accordion-collapse collapse"
											aria-labelledby="headingfour"
											data-bs-parent="#accordionExample"
										>
											<div className="accordion-body">
												<p>
													We conduct basic level verifications about the members
													who join Famile. However, we strongly recommend you to
													conduct thorough background checks on potential
													matches before proceeding.
												</p>
											</div>
										</div>
									</div>
									<div className="accordion-item mb-3">
										<h2 className="accordion-header" id="headingfive">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapsefive"
												aria-expanded="false"
												aria-controls="collapsefive"
											>
												I received an email saying someone is interested in me.
												What do I do?
											</button>
										</h2>
										<div
											id="collapsefive"
											className="accordion-collapse collapse"
											aria-labelledby="headingfive"
											data-bs-parent="#accordionExample"
										>
											<div className="accordion-body">
												<p>
													This email means that your profile was sent to someone
													and they are interested in you. So our system sends
													their profile to you. This notification is sent
													immediately when someone says they are interested in
													you. You may receive interest-notification from
													multiple people in a week.
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="section row sixth-box d-flex justify-content-between ">
					<div className="container container-width">
						<h2 className="text-center">Senior Citizen Care</h2>
						<p className="text-center">
							Famile Network takes care of Senior Citizens through our outreach
							programs.
						</p>

						<div className="row">
							<div className="col p-0">
								<img
									className="img-fluid sr1-img"
									src={require("../assets/img/signup/sr1.webp")}
									alt=""
								/>
							</div>
							<div className="col-6 col-md-3 px-2">
								<div className="col p-0">
									<img
										className="img-fluid sr2-img"
										src={require("../assets/img/signup/sr3.webp")}
										alt=""
									/>
								</div>
								<div className="col p-0 pt-2" style={{ height: "255px" }}>
									<img
										className="img-fluid sr3-img"
										src={require("../assets/img/signup/sr4.webp")}
										alt=""
									/>
								</div>
							</div>
							<div className="col p-0 d-none d-md-block">
								<div className="col p-0">
									<img
										className="img-fluid sr4-img"
										src={require("../assets/img/signup/sr5.webp")}
										alt=""
									/>
								</div>
								<div className="col p-0 pt-2">
									<img
										className="img-fluid sr5-img"
										src={require("../assets/img/signup/sr2.webp")}
										alt=""
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="ft-footer-block mt-5">
				<Footer />
			</div>
		</>
	);
}
