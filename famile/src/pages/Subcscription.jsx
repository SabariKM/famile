import React from "react";
import axios from "axios";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";

import { Footer } from "../component/Footer";
import { Header } from "../component/Header";
import { AccessContext } from "../constant/AccessContext";
import { getSubscription } from "../constant/url";

export const Subcscription = (props) => {
	const access = React.useContext(AccessContext).authID;
	const [subDetail, setSubDetail] = React.useState({
		subDate: "",
		regDate: "",
		validTill: 0,
	});
	let navigate = useNavigate();

	function daysRemaining(enddate) {
		var eventdate = moment(enddate);
		var todaysdate = moment();
		return eventdate.diff(todaysdate, "days");
	}

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
					setSubDetail({
						subDate: moment(res_data.data.sub_date).format("MMM Do YYYY"),
						regDate: moment(res_data.data.reg_date).format("MMM Do YYYY"),
						validTill: daysRemaining(res_data.data.valid_till),
					});
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
	return (
		<>
			<Header loginStatus={props.loginStatus} />
			<div className="container">
				<div className="main-div" style={{ height: "750px" }}>
					<div className="">
						<div className="row">
							<div className="col mt-5">
								<h2 className="text-center">Subscription</h2>
								<div className="col mt-5">
									<div className=" preftbl-sub d-flex justify-content-center ">
										<table className=" ">
											<tbody>
												<tr>
													<td>Subscription Date</td>
													<td>:</td>
													<td>{subDetail.subDate}</td>
												</tr>
												<tr>
													<td>Profile Registered</td>
													<td>:</td>
													<td>{subDetail.regDate}</td>
												</tr>
												<tr>
													<td>Days Left</td>
													<td>:</td>
													<td>{subDetail.validTill}</td>
												</tr>
											</tbody>
										</table>
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
