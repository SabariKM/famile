import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { paymentInitiate } from "../constant/url";

import "../css/common.css";
import { Footer } from "../component/Footer";
import { Header } from "../component/Header";

export const PaymentFailed = (props) => {
	const propData = useLocation()["state"];
	const access = propData?.authID;
	const phone = propData?.phone;
	let navigate = useNavigate();
	console.log("pmtfailedpage", propData, access, phone);
	const [loading, setLoading] = useState(false);

	const handlePayment = async () => {
		setLoading(true);
		var bodyFormData = new FormData();
		bodyFormData.append("authId", access);
		bodyFormData.append("phoneNumber", phone);
		await axios({
			method: "post",
			url: paymentInitiate,
			data: bodyFormData,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then(function (response) {
				//handle success
				const res_data = response.data;
				if (res_data.status_code === 101) {
					console.log("Api Authentication failed. login again.");
				} else if (res_data.status_code === 200) {
					window.location.href =
						res_data.pg_response.data.instrumentResponse.redirectInfo.url;
				} else {
					console.log(res_data.status_msg);
				}
				console.log(res_data);
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
		setLoading(false);
	};

	useEffect(() => {
		if (!access && !phone) {
			navigate("/");
		}
	}, [access, phone]);
	return (
		<>
			<Header />
			<div className="container d-flex justify-content-center">
				<div className="main-div">
					<div className="content-div">
						<div className="row">
							<div className="col d-flex justify-content-center">
								<div className="col-8 ">
									<h3 className="text-center">Subscription Failed!</h3>
									<div className="col d-flex justify-content-center">
										<img
											className="img-fulid"
											src={require("../assets/img/signup/crossCircle.png")}
											alt="tick circle"
										/>
									</div>
									<h3 className="text-center mt-4">
										To attempt payment again, click below
									</h3>
									<p className="cp  text-center mt-4">
										All your other details are saved with us safely in an
										encrypted format, you don’t have to re-enter anything. Once
										your subscription payment is completed, we will start
										sending you matching profiles.
									</p>
									<p className=" cp text-center">
										If you want other payment options, give us a call at +91
										99628 48057
									</p>
									<div className="d-grid gap-2 col-7 mx-auto my-4 ">
										<button
											type="submit"
											className="btn btn-primary bg-dark p-2"
											onClick={() => handlePayment()}
										>
											SUBSCRIBE
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
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
